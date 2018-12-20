(function () {
	angular.module("App").controller("profileCtrl", controller);
	controller.$inject = ['$scope', "axDataStore", "axDataAdapter"];

	function controller($scope, dataStore, $adapter) {
		let adapterCfg = new axAdapterConfig();
		adapterCfg.addDateConversion("CiDate", "YYYY-MM-DD");
		let adapter = new $adapter(adapterCfg);
		$scope.form1 = {
			dataAdapter: adapter,
			data: adapter.parseItem(dataStore.user.info)
		};
	}

}());