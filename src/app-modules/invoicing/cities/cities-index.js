(function () {
	angular.module("App").controller("citiesCtrl", controller);
	controller.$inject = ['$scope', "axDataAdapter", "$timeout", "axDataStore", "$element"];

	function controller($scope, $adapter, $timeout, axDataStore, $element) {
		$scope.dataStore = axDataStore;
		$scope.country = $scope.$parent.launcher ? $scope.$parent.launcher.dataItem : null;
		$scope.editingMode = $scope.$parent.launcher ? "popup" : ($scope.$parent.$ctrl && $scope.$parent.$ctrl.attributes && $scope.$parent.$ctrl.attributes.config.includes("$$editor.form") ? "editor" : "page");
		if (!$scope.$parent.launcher) $scope.$parent.launcher = {openFinish: false};
		let dataTable1 = citiesClass.dataTable($adapter, $scope);
		angular.extend($scope.$parent.launcher,
			{
				showButtons: $scope.$parent.launcher.openFinish,
				dataTable1: dataTable1,
			});

		$scope.countriesEdit = countriesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.countries;
				},
				set: function (datasource) {
					$scope.countries = datasource;
				}
			},
			dataTable1,
			{
				id: "countryId",
				name: "country",
				invariant: "countryInvariant"
			},
			"dataTable1",
			$timeout);

		if ($scope.editingMode === "editor") {
			$scope.$parent.$ctrl.config.refreshFormCallback = function (dataItem) {
				$scope.country = dataItem;
				if (!dataTable1.$ctrl || !dataTable1.$ctrl.controllerLoaded) return; //because of ax-editor ng-if $scope.dataTable1.$ctrl is not existing yet and must wait until controlelr is fully loaded (2 digest cycles)
				//console.log("dataItem", dataItem);
				if (!dataItem) dataTable1.$ctrl.datasourceSet([]);
				else dataTable1.$ctrl.loadData();
			};
			// in this moment refreshForm it's already executed on initialization
			$scope.$parent.$ctrl.config.refreshFormCallback($scope.$parent.$ctrl.config.dataItem);
		}
	}
}());