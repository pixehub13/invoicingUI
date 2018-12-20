class invoiceSupplier {
	constructor($scope, $timeout, $adapter) {
		this.addressesEdit = {
			dataSet: $scope.dataSet,
			dataTable1: {
				loadDataApiArgs: function () {
					return {companyId: this.$ctrl.$parent.launcher.supplier.id};
				},
				createCallback: function (dataItem) {
					dataItem.companyId = this.$ctrl.$parent.launcher.supplier.id;
				}
			},
			getCitiesForCountry: function (datasource, countryId) {
				if (!datasource) return [];
				if (!countryId) return datasource;
				let filtered = datasource.filter(function (item) {
					return item.countryId === countryId;
				}, this);
				//console.log("cities for country ", dataItem, filtered);
				return filtered;
			},
			getDataItemCountry: function (dataItem) {
				if (!dataItem.countryId) return undefined;
				return {
					id: dataItem.countryId,
					name: dataItem.country,
					nameInvariant: dataItem.countryInvariant
				};
			},
			onOpen: function (params) {
				this.supplier = params[1];
				this.invoice = params[2];
				let dataTableParent = $scope.invoices;
				if (dataTableParent.$ctrl.attrs.editRow === "editor") {
					this.currentItem = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.datasource;
					this.readOnly = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.readOnly;
				} else //this is for edit-row=inline or inline-cell
				{
					this.currentItem = dataTableParent.$ctrl.currentItem;
					this.readOnly = false;
				}
				this.initialSelection = this.invoice.supplierDeliveryAddressId;
				this.currentSelection = this.invoice.supplierDeliveryAddressId;
				this.openFinish = true;
			},
			saveChanged: function (selected) {
				this.invoice.supplierDeliveryAddressId = selected.id;
				this.invoice.supplierDeliveryCountryId = selected.countryId;
				this.invoice.supplierDeliveryCountry = selected.country;
				this.invoice.supplierDeliveryCityId = selected.cityId;
				this.invoice.supplierDeliveryCity = selected.city;
				this.invoice.supplierDeliveryCounty = selected.county;
				this.invoice.supplierDeliveryAddress = selected.address;
			},
			confirm: function () {
				$scope.dataSet.addresses = $scope.dataSet.addresses.filter(account => {
					return account.companyId !== this.supplier.id;
				});
				$scope.dataSet.addresses = $scope.dataSet.addresses.concat(this.dataTable1.$ctrl.datasource);
				let selected = this.dataTable1.$ctrl.currentItem;
				let self = this;
				if (selected.id === this.invoice.supplierDeliveryAddressId) {
					this.invoice.supplierDeliveryAddressId = -1;
					// for autocomplete refresh needed if changes are made inside the invoice delivery address
					$timeout(function () {
						self.saveChanged(selected);
					});
				} else this.saveChanged(selected);
				this.close();
			},
		};
		this.accountsEdit = {
			dataSet: $scope.dataSet,
			dataTable1: {
				loadDataApiArgs: function () {
					return {companyId: this.$ctrl.$parent.launcher.supplier.id};
				},
				createCallback: function (dataItem) {
					dataItem.companyId = this.$ctrl.$parent.launcher.supplier.id;
				}
			},
			onOpen: function (params) {
				this.supplier = params[1];
				this.invoice = params[2];
				let dataTableParent = $scope.invoices;
				if (dataTableParent.$ctrl.attrs.editRow === "editor") {
					this.currentItem = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.datasource;
					this.readOnly = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.readOnly;
				} else //this is for edit-row=inline or inline-cell
				{
					this.currentItem = dataTableParent.$ctrl.currentItem;
					this.readOnly = false;
				}
				this.initialSelection = this.invoice.supplierBankAccountId;
				this.currentSelection = this.invoice.supplierBankAccountId;
				this.openFinish = true;
			},
			saveChanged: function (selected) {
				this.invoice.supplierBankAccountId = selected.id;
				this.invoice.supplierBank = selected.bank;
				this.invoice.supplierBankAccount = selected.account;
			},
			confirm: function () {
				$scope.dataSet.accounts = $scope.dataSet.accounts.filter(account => {
					return account.companyId !== this.supplier.id;
				});
				$scope.dataSet.accounts = $scope.dataSet.accounts.concat(this.dataTable1.$ctrl.datasource);
				let selected = this.dataTable1.$ctrl.currentItem;
				let self = this;
				if (selected.id === this.invoice.supplierBankAccountId) {
					this.invoice.supplierBankAccountId = -1;
					// for autocomplete refresh needed if changes are made inside the invoice delivery address
					$timeout(function () {
						self.saveChanged(selected);
					});
				} else this.saveChanged(selected);
				this.close();
			}
		};
		this.addressesEdit.countriesEdit = countriesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.dataSet.countries;
				},
				set: function (datasource) {
					$scope.dataSet.countries = datasource;
				}
			},
			this.addressesEdit.dataTable1,
			{
				id: "countryId",
				name: "country",
				invariant: "countryInvariant"
			},
			"dataTable1",
			$timeout);
		this.addressesEdit.citiesEdit = citiesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.dataSet.cities;
				},
				set: function (datasource) {
					$scope.dataSet.cities = datasource;
				}
			},
			this.addressesEdit.dataTable1,
			{
				id: "cityId",
				name: "city",
				invariant: "cityInvariant"
			},
			"dataTable1",
			$timeout);
	}

	getDataItemSupplier(invoice) {
		return {
			id: invoice.supplierId,
			name: invoice.supplierName,
			nameInvariant: invoice.supplierInvariant
		};
	}

	supplierChanged(supplier, dataItem) {
		if (supplier) {
			this.getSelectedAddress({}, dataItem);
			this.getSelectedAccount({}, dataItem);
		}
	}

	getSelectedAddress(address, dataItem) {
		// console.log("Address", address, arguments);
		if (address) {
			dataItem.supplierDeliveryAddressId = address.id;
			dataItem.supplierDeliveryCountryId = address.countryId;
			dataItem.supplierDeliveryCountry = address.country;
			dataItem.supplierDeliveryCityId = address.cityId;
			dataItem.supplierDeliveryCity = address.city;
			dataItem.supplierDeliveryCounty = address.county;
			dataItem.supplierDeliveryAddress = address.address;
		} else {
			dataItem.supplierDeliveryCountryId = null;
			dataItem.supplierDeliveryCountry = "";
			dataItem.supplierDeliveryCityId = null;
			dataItem.supplierDeliveryCity = "";
			dataItem.supplierDeliveryCounty = "";
			dataItem.supplierDeliveryAddress = "";
		}
	}

	getSelectedAccount(account, dataItem) {
		if (account) {
			dataItem.supplierBankAccountId = account.id;
			dataItem.supplierBank = account.bank;
			dataItem.supplierBankAccount = account.account;
		} else {
			dataItem.supplierBank = "";
		}
	}

}