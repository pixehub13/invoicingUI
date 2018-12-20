	window.invoicesClass = {
		/**
		 *
		 * @param $adapter
		 * @param $scope
		 * @returns {axTableCustomCtrl}
		 */
		dataTable: function ($adapter, $scope) {
			let adapterCfg = new axAdapterConfig();
			adapterCfg.addDateConversion('date', 'YYYY-MM-DD');
			adapterCfg.addDatetimeConversion('createdAd', 'YYYY-MM-DD HH:mm:ss');
			adapterCfg.addIntegerConversion('number');
			adapterCfg.addFloatConversion('total');
			adapterCfg.addBooleanConversion('vatRegistred');
			adapterCfg.addExtend(function () {
				let owner = $scope.dataSet.currentOwner;
				this.supplierId = owner.companyId;
				this.supplierPhone = owner.contactPhone;
				this.supplierEmail = owner.contactEmail;
				this.supplierName = owner.name;
				this.supplierCountry = owner.country;
				this.supplierCity = owner.city;
				this.supplierCounty = owner.county;
				this.supplierAddress = owner.address;
				this.supplierCode = owner.code;
				this.supplierTradeRegister = owner.tradeRegister;
				this.supplierSocialCapital = owner.socialCapital;
			});
			/**
			 *
			 * @type {axTableCustomCtrl}
			 */
			const dataTableCfg = {
				dateFrom:null,
				dateTo:null,
				dataAdapter: $adapter(adapterCfg),
				isNewRecord(dataItem) {
					return !dataItem.id;
				},
				editor: {
					enabledExportEmail: () => {
						return true
					},
					enabledExportPdf: () => {
						return true
					}
				},
				createApiArgs: function () {
					return {ownerId: $scope.dataSet.currentOwner.id};
				},
				createCallback: function (dataItem) {
					let addresses = $scope.getDatasourceForCompany($scope.dataSet.addresses, dataItem.ownerId);
					if (addresses.length) {
						let address = addresses.findObject(dataItem.supplierDeliveryAddressId, 'id');
						$scope.supplier.getSelectedAddress(address || addresses[0], dataItem);
					}
					let bankAccounts = $scope.getDatasourceForCompany($scope.dataSet.accounts, dataItem.ownerId);
					if (bankAccounts.length) {
						let account = bankAccounts.findObject(dataItem.supplierBankAccountId, 'id');
						$scope.supplier.getSelectedAccount(account || bankAccounts[0], dataItem);
					}
					dataItem.userId = $scope.dataStore.user.info.id;
					return dataItem;
				},
				exportCfg: {
					item: {
						getPreviousMonthName(source) {
							let date = angular.copy(source);
							const currentMonth = date.getMonth();
							date.setMonth(currentMonth - 1);
							date.setDate(1);
							const previousMonth = date.toLocaleString(axLocale, {month: "long"});
							return previousMonth.toTitleCase();
						},
						sendEmail: function (controller, exportType, exportResponse) {
							let templates = $scope.dataSet.emailTemplates;
							let invoice = controller.$$grid.$$editor.form.dataItem;
							let values = {
								InvoiceNumber: invoice.serial + "-" + invoice.number,
								InvoiceDate: invoice.date.toLocaleDateString(),
								SupplierName: invoice.supplierName,
								PreviousMonthName: this.getPreviousMonthName(invoice.date)
							};
							let scope = controller.scope().$new();
							Object.assign(scope, values);
							templates.forEach(template => {
								template.subjectParsed = controller.$interpolate(template.subject)(scope);
								template.messageParsed = controller.$interpolate(template.message)(scope);
							});
							let data = {
								remoteAttachment: exportResponse,
								templates: templates
							};
							return data;
						},
						footerData: function (dataItem) {
							let url = window.origin + $scope.dataSet.currentOwner ? $scope.dataSet.currentOwner.stampPath : "";
							return {
								imageUrl: url
							};
						},
						headerData: function (dataItem) {
							let url = window.origin + $scope.dataSet.currentOwner ? $scope.dataSet.currentOwner.logoPath : "";
							return {
								imageUrl: url
							};
						},
						formOutput: function (exportType, popup, dataItem) {
							//build your own: popup.html(myHtml) or change current output;
							if (exportType === "xls") {
								popup.find("ax-form>table>tbody>tr>td[column-index='0']").each(function (i, td) {
									if (td.getAttribute("role") === "label") return;
									if (td.getAttribute("colspan") === "2") td.setAttribute("colspan", 3);
									if (td.getAttribute("role") === "input") td.setAttribute("colspan", 2);
								});
								popup.find("ax-form td[column-index='0'] ax-form-section>table>tbody>tr>td[column-index='0']").each(function (i, td) {
									if (td.getAttribute("role") === "label") return;
									if (td.getAttribute("role") === "input") td.setAttribute("colspan", 2);
								});
							}
							//remove form total field from export output
							popup.find("ax-form td[control-for='value']").html("");
						},
						detailsOutput: function (exportType, table, detailName) {
						}
					}
				},
				validateField(fieldName, dataItem) {
					let value = dataItem[fieldName];
					//console.log("field validation", fieldName, dataItem);
					switch (fieldName) {
						case "number":
						case "serial":
							if (value === undefined || value === null || value === "") {
								//method to add error to column
								this.$ctrl.addFieldError(fieldName, "Field is required", dataItem);
							}
							if (fieldName === 'serial' && value) value = dataItem[fieldName] = value.toUpperCase();
							if (dataItem.serial && !dataItem.number) {
								let apiArgs = {serial: dataItem.serial, ownerId: dataItem.ownerId};
								this.$ctrl.$api.action('getInvoiceNumber', 'get', apiArgs)
									.then(response => {
										if (response && response.loader) response.loader.remove();
										if (response && response.status) dataItem.number = response.data.number;
									});
							}
					}
					return true;
				},
				details: {
					dataAdapter: $adapter({
						conversions: {
							position: {type: "integer"},
							productPrice: {type: "float"},
							quantity: {type: "float"},
							price: {type: "float"},
							value: {type: "float"},
							vat: {type: "float"},
							vatValue: {type: "float"},
							discount: {type: "float"},
							discountValue: {type: "float"}
						},
						extend: function (dataItem) {
							this.value = (this.quantity * this.price).round(2);
							this.vatValue = (this.vat * this.value).round(2);
						}
					}),
					createCallback: function (dataItem) {
						dataItem.quantity = 0;
						dataItem.price = 0;
						if (this.$ctrl.currentItem) {
							dataItem.discount = this.$ctrl.currentItem.discount;
							dataItem.vat = this.$ctrl.currentItem.vat;

						} else {
							let vatArray = $scope.dataSet.currentOwner.vatPercentsList.split(";");
							dataItem.vat = vatArray.length ? vatArray[0] : 0;
							dataItem.discount = 0;
						}
						this.dataAdapter.parseItem(dataItem);
						let data = this.$ctrl.datasourceGet();
						var maxOrder = 0;
						data.each(function (item) {
							maxOrder = Math.max(maxOrder, item.position);
						}, this);
						dataItem.position = maxOrder + 1;
					},
					loadDataApiArgs: function () {
						return {invoiceId: this.$ctrl.parentItem && !this.$ctrl.parentItem.isGroupItem ? this.$ctrl.parentItem.id : 0};
					},
					updateInvoiceTotal: function () {

					},
					validateField(fieldName, dataItem) {
						let value = dataItem[fieldName];
						// console.log("fieldName", fieldName, value);
						switch (fieldName) {
							case "unit":
								if (value) value = dataItem.unit = value.toUpperCase();
								if (value && !dataItem.price) {
									let apiArgs = {currency: value};
									let api = this.$ctrl.parentConfig.$ctrl.$api;
									api.get('cursValutar/getCurs', apiArgs, 'no')
										.then(response => {
											if (response && response.loader) response.loader.remove();
											if (response && response.status) dataItem.price = parseFloat(response.data);
										});
								}
								break;
							case "quantity":
							case "price":
								//on loading total is getting from database, when editing needed to update value in form
								this.$ctrl.parentEditPopupCalculationUpdate([{calculation: "value", field: "value"}]);
								dataItem.vatValue = dataItem.vat * dataItem.value;
								break;
						}
						return true;
					},
					deleteCallback: function () {
						this.$ctrl.parentEditPopupCalculationUpdate([{calculation: "value", field: "value"}]);
					}
				}
			};
			return dataTableCfg;
		}
	};
