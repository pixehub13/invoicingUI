(function () {
	angular.module("App").controller("invoicesCodeCtrl", controller);
	controller.$inject = ['$scope', "axDataAdapter", "$timeout", "axDataSet", "axDataStore", "axApiAction"];

	function controller($scope, $adapter, $timeout, dataSet, axDataStore,apiAction) {
		$scope.dataStore = axDataStore;
		$scope.dataSet = dataSet;
		$scope.invoices = invoicesClass.dataTable($adapter, $scope);
		$scope.invoices.dateTo = Date.now();
		$scope.invoices.loadDataApiArgs = function () {
			let args = {ownerId: dataSet.currentOwner.id};
			if ($scope.invoices.dateFrom) args.from = moment($scope.invoices.dateFrom).format("YYYY-MM-DD");
			if ($scope.invoices.dateTo) args.to = moment($scope.invoices.dateTo).format("YYYY-MM-DD");
			return args;
		};
		$scope.getDatasourceForCompany = function (datasource, companyId) {
			if (!datasource) return [];
			if (!companyId) return datasource;
			let filtered = datasource.filter(function (item) {
				return item.companyId === companyId;
			}, this);
			// console.log("datasource for company ", companyId, filtered);
			return filtered;
		};

		$scope.supplier = new invoiceSupplier($scope, $timeout, $adapter);
		$scope.customer = new invoiceCustomer($scope, $timeout, $adapter, apiAction);
	}

}());