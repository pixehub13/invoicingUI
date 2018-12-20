(function () {
	'use strict';

	angular.module('App').controller('resetPasswordController', controller);

	controller.$inject = ['$scope', 'authService', "axDataStore", "$timeout", "$location"];

	function controller($scope, authService, dataStore, $timeout, location) {
		var vm = $scope;
		vm.loginInfo = {id: location.$$search.id};

		vm.savePassword = function () {
			if (vm.loginInfo.parola !== vm.loginInfo.confirmare) angular.element("[name=parola]").focus();
			else{
				vm.loginWorking = true;
				authService.savePassword(vm.loginInfo, function (response) {
					vm.loginWorking = false;
					if (!response.status)
						authService.goLogin();
				});
			}
		};
	}
})();