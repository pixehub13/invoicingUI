(function () {
	angular.module("App").controller("companiesCtrl", controller);
	controller.$inject = ['$scope', "axDataAdapter", "$timeout", "axDataSet", "axDataStore"];

	function controller($scope, $adapter, $timeout, dataSet, axDataStore) {
		$scope.dataStore = axDataStore;
		if (!$scope.$parent.launcher) $scope.$parent.launcher = {openFinish: false};
		$scope.dataSet = dataSet;
		angular.extend($scope.$parent.launcher,
			{
				showButtons: $scope.$parent.launcher.openFinish,
				dataTable1: companiesClass.dataTable($adapter, $scope),
			});
		$scope.editingMode = $scope.$parent.launcher ? "popup" : ($scope.$parent.$ctrl && $scope.$parent.$ctrl.attributes && $scope.$parent.$ctrl.attributes.config.includes("$$editor.form") ? "editor" : "page");
		$scope.countriesEdit = countriesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.dataSet.countries;
				},
				set: function (datasource) {
					$scope.dataSet.countries = datasource;
				}
			},
			$scope.$parent.launcher.dataTable1,
			{
				id: "countryId",
				name: "country",
				invariant: "countryInvariant"
			},
			"dataTable1",
			$timeout);
		$scope.getDataItemCountry = function (dataItem) {
			if (!dataItem.countryId) return undefined;
			return {
				id: dataItem.countryId,
				name: dataItem.country,
				nameInvariant: dataItem.countryInvariant
			};
		};
		$scope.getCitiesForCountry = function (datasource, countryId) {
			if (!datasource) return [];
			if (!countryId) return datasource;
			let filtered = datasource.filter(function (item) {
				return item.countryId === countryId;
			}, this);
			return filtered;
		};
		$scope.citiesEdit = citiesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.dataSet.cities;
				},
				set: function (datasource) {
					$scope.dataSet.cities = datasource;
				}
			},
			$scope.$parent.launcher.dataTable1,
			{
				id: "cityId",
				name: "city",
				invariant: "cityInvariant"
			},
			"dataTable1",
			$timeout);

	}

}());