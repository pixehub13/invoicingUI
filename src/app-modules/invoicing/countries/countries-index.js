(function () {
	angular.module("App").controller("countriesCtrl", controller);
	controller.$inject = ['$scope', "axDataAdapter", "axDataStore", "$element"];

	function controller($scope, $adapter, axDataStore,$element) {
		$scope.loader = axDataStore.loader("#right-pane");
		$scope.$element = $element;
		$scope.dataStore = axDataStore;
		if (!$scope.$parent.launcher) $scope.$parent.launcher = {openFinish: false};
		$scope.editingMode = $scope.$parent.launcher ? "popup" : ($scope.$parent.$ctrl && $scope.$parent.$ctrl.attributes && $scope.$parent.$ctrl.attributes.config.includes("$$editor.form") ? "editor" : "page");

		angular.extend($scope.$parent.launcher,
			{
				showButtons: $scope.$parent.launcher.openFinish,
				dataTable1: countriesClass.dataTable($adapter),
			});
		$scope.citiesPopup = {
			onOpen: function (params) {
				this.dataItem = params[1];
				this.openFinish = true;
			},
			confirm: function () {
				this.close();
			}
		};
	}
}());