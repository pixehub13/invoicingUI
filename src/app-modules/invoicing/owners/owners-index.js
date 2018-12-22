(function () {
	angular.module("App").controller("ownersCtrl", controller);
	controller.$inject = ['$scope', "axDataAdapter", "$timeout", "axDataStore", "$element", "Upload", "guidGenerator", "axDataSet", "$element"];

	function controller($scope, $adapter, $timeout, axDataStore, $element, Upload, guidGenerator, dataSet) {
		$scope.loader = axDataStore.loader("#right-pane");
		$scope.$element = $element;

		$scope.dataStore = axDataStore;
		$scope.dataSet = dataSet;
		$scope.editingMode = $scope.$parent.launcher ? "popup" : ($scope.$parent.$ctrl && $scope.$parent.$ctrl.attributes && $scope.$parent.$ctrl.attributes.config.includes("$$editor.form") ? "editor" : "page");
		if (!$scope.$parent.launcher) $scope.$parent.launcher = {openFinish: false};
		var dataTable1 = ownersClass.dataTable($adapter, $scope, Upload, guidGenerator);
		angular.extend($scope.$parent.launcher,
			{
				showButtons: $scope.$parent.launcher.openFinish,
				dataTable1: dataTable1,
			});

		$scope.companiesEdit = companiesClass.popup(
			$adapter,
			{
				get: function () {
					return $scope.companies;
				},
				set: function (datasource) {
					$scope.companies = datasource;
				}
			},
			dataTable1,
			{
				id: "companyId",
				name: "company",
				invariant: "companyInvariant"
			},
			"dataTable1",
			$timeout);

		if ($scope.editingMode === "editor") {
			$scope.$parent.$ctrl.config.refreshFormCallback = function (dataItem) {
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