class invoiceCustomer {
	constructor($scope, $timeout, $adapter, apiAction) {
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.$adapter = $adapter;
		this.apiAction = apiAction;
		this.addressesEdit = {
			dataSet: $scope.dataSet,
			dataTable1: {
				loadDataApiArgs: function () {
					return {companyId: this.$ctrl.$parent.launcher.customer.id};
				},
				createCallback: function (dataItem) {
					dataItem.companyId = this.$ctrl.$parent.launcher.customer.id;
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
				this.customer = params[1];
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
				this.initialSelection = this.invoice.customerDeliveryAddressId;
				this.currentSelection = this.invoice.customerDeliveryAddressId;
				this.openFinish = true;
			},
			saveChanged: function (selected) {
				this.invoice.customerDeliveryAddressId = selected.id;
				this.invoice.customerDeliveryCountryId = selected.countryId;
				this.invoice.customerDeliveryCountry = selected.country;
				this.invoice.customerDeliveryCityId = selected.cityId;
				this.invoice.customerDeliveryCity = selected.city;
				this.invoice.customerDeliveryCounty = selected.county;
				this.invoice.customerDeliveryAddress = selected.address;
			},
			confirm: function () {
				$scope.dataSet.addresses = $scope.dataSet.addresses.filter(account => {
					return account.companyId !== this.customer.id;
				});
				$scope.dataSet.addresses = $scope.dataSet.addresses.concat(this.dataTable1.$ctrl.datasource);

				let selected = this.dataTable1.$ctrl.currentItem;
				let self = this;
				if (selected.id === this.invoice.customerDeliveryAddressId) {
					this.invoice.customerDeliveryAddressId = -1;
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
					return {companyId: this.$ctrl.$parent.launcher.customer.id};
				},
				createCallback: function (dataItem) {
					dataItem.companyId = this.$ctrl.$parent.launcher.customer.id;
				}
			},
			onOpen: function (params) {
				this.customer = params[1];
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
				this.initialSelection = this.invoice.customerBankAccountId;
				this.currentSelection = this.invoice.customerBankAccountId;
				this.openFinish = true;
			},
			saveChanged: function (selected) {
				this.invoice.customerBankAccountId = selected.id;
				this.invoice.customerBank = selected.bank;
				this.invoice.customerBankAccount = selected.account;
			},
			confirm: function () {
				// $scope.dataSet.accounts = this.dataTable1.$ctrl.datasource;
				$scope.dataSet.accounts = $scope.dataSet.accounts.filter(account => {
					return account.companyId !== this.customer.id;
				});
				$scope.dataSet.accounts = $scope.dataSet.accounts.concat(this.dataTable1.$ctrl.datasource);
				console.log("new accounts:", $scope.dataSet.accounts);
				let selected = this.dataTable1.$ctrl.currentItem;
				let self = this;
				if (selected.id === this.invoice.customerBankAccountId) {
					this.invoice.customerBankAccountId = -1;
					// for autocomplete refresh needed if changes are made inside the invoice delivery address
					$timeout(function () {
						self.saveChanged(selected);
					});
				} else this.saveChanged(selected);
				this.close();
			}
		};
		this.edit = companiesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.dataSet.companies;
				},
				set: function (datasource) {
					$scope.dataSet.companies = datasource;
				}
			},
			$scope.invoices,
			{
				id: "customerId",
				name: "customer",
				invariant: "customerInvariant"
			},
			"dataTable1",
			$timeout);
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

	getDataItemCustomer(invoice) {
		return {
			id: invoice.customerId,
			name: invoice.customerName,
			nameInvariant: invoice.customerInvariant
		};
	}

	getDescriptionsDetails(customer) {
		if (customer) {
			let invoiceId = this.$scope.invoices.$ctrl.$$grid.$$editor.form.dataItem.id;
			this.apiAction("invoices-details", "getDescriptions", "get", {customerId: customer.id, invoiceId: invoiceId}, "no").then(response => {
				if (response.status) this.$scope.dataSet.descriptions = response.data;
			})
		} else this.$scope.dataSet.descriptions = [];
	}

	customerChanged(customer, dataItem) {
		if (customer) {
			let addresses = this.$scope.getDatasourceForCompany(this.$scope.dataSet.addresses, customer.id);
			if (addresses.length) this.getSelectedAddress(addresses[0], dataItem);
			let bankAccounts = this.$scope.getDatasourceForCompany(this.$scope.dataSet.accounts, customer.id);
			if (bankAccounts.length) this.getSelectedAccount(bankAccounts[0], dataItem);
		} else {
			this.getSelectedAddress({}, dataItem);
			this.getSelectedAccount({}, dataItem);

		}
		this.getDescriptionsDetails(customer);
	}

	getSelectedAddress(address, dataItem) {
		// console.log("Address", address, arguments);
		if (address) {
			dataItem.customerDeliveryAddressId = address.id;
			dataItem.customerDeliveryCountryId = address.countryId;
			dataItem.customerDeliveryCountry = address.country;
			dataItem.customerDeliveryCityId = address.cityId;
			dataItem.customerDeliveryCity = address.city;
			dataItem.customerDeliveryCounty = address.county;
			dataItem.customerDeliveryAddress = address.address;
		} else {
			dataItem.customerDeliveryCountryId = null;
			dataItem.customerDeliveryCountry = "";
			dataItem.customerDeliveryCityId = null;
			dataItem.customerDeliveryCity = "";
			dataItem.customerDeliveryCounty = "";
			dataItem.customerDeliveryAddress = "";
		}
	}

	getSelectedAccount(account, dataItem) {
		// console.log("Account", account, arguments);
		if (account) {
			dataItem.customerBankAccountId = account.id;
			dataItem.customerBank = account.bank;
			dataItem.customerBankAccount = account.account;
		} else {
			dataItem.customerBank = "";
		}
	}

}