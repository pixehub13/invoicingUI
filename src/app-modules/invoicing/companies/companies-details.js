(function () {
	angular.module("App").controller("companiesDetailsCtrl", companiesDetailsCtrl);
	companiesDetailsCtrl.$inject = ['$scope', "axDataAdapter", "apiAction", "axDataSet", "$timeout", "$document"];

	function companiesDetailsCtrl($scope, $adapter, apiAction, dataSet, $timeout, $document) {

		let createCtrl = function () {
			return {
				loadDataApiArgs: function () {
					if ($scope.company.id === 0) return {};
					else return {companyId: $scope.company.id};
				},
				createCallback: function (dataItem) {
					let takeFrom = $scope.company ? $scope.company : this.currentItem ? this.currentItem : null;
					if (takeFrom) {
						dataItem.companyId = $scope.company ? takeFrom.id : takeFrom.companyId;
						dataItem.company = $scope.company ? takeFrom.name : takeFrom.company;
						dataItem.companyInvariant = $scope.company ? takeFrom.nameInvariant : takeFrom.companyInvariant;
					}
				},
				canAdd: function () {
					return this.$ctrl.$parent.$parent.company && this.$ctrl.$parent.$parent.company.id > 0;
				}
			};
		};
		$scope.dataSet = dataSet;
		$scope.phones = createCtrl();
		$scope.emails = createCtrl();
		$scope.accounts = createCtrl();
		$scope.addresses = createCtrl();
		$scope.emailTemplates = new emailTemplates(createCtrl, $scope);
		//details are shown in editor
		if ($scope.$parent.$ctrl.validateForm) {
			$scope.$watch("$parent.$ctrl.datasource", function (company) {
				$scope.company = company;
				if (company && company.id)
					apiAction('companies', 'getItemDetails', 'post', {item: company}, "no").then(function (response) {
						if (!response || !$scope.phones.$ctrl) return;
						$scope.phones.$ctrl.datasourceSet(response.data.phones);
						$scope.emails.$ctrl.datasourceSet(response.data.emails);
						$scope.accounts.$ctrl.datasourceSet(response.data.accounts);
						$scope.addresses.$ctrl.datasourceSet(response.data.addresses);
						$scope.emailTemplates.$ctrl.datasourceSet(response.data.emailTemplates);
					});
				else {
					if ($scope.phones.$ctrl && $scope.phones.$ctrl.controllerLoaded) $scope.phones.$ctrl.datasourceSet([]);
					if ($scope.phones.$ctrl && $scope.emails.$ctrl.controllerLoaded) $scope.emails.$ctrl.datasourceSet([]);
					if ($scope.phones.$ctrl && $scope.accounts.$ctrl.controllerLoaded) $scope.accounts.$ctrl.datasourceSet([]);
					if ($scope.phones.$ctrl && $scope.addresses.$ctrl.controllerLoaded) $scope.addresses.$ctrl.datasourceSet([]);
					if ($scope.emailTemplates.$ctrl && $scope.emailTemplates.$ctrl.controllerLoaded) $scope.emailTemplates.$ctrl.datasourceSet([]);
				}
			});
			var parent = $scope.$parent.$ctrl.dataTable ? $scope.$parent.$ctrl : $scope.$parent.$ctrl.$parent.$parent.$parent;
			let editor = $scope.$parent.$parent.$parent.grid.$$editor;
			editor.form.refreshFormCallback = function () {
				if (!$scope.getCitiesForCountry) {
					$scope.getCitiesForCountry = parent.$parent.getCitiesForCountry;
					$scope.getDataItemCountry = parent.$parent.getDataItemCountry;
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
						$scope.addresses,
						{
							id: "countryId",
							name: "country",
							invariant: "countryInvariant"
						},
						"dataTable1",
						$timeout);

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
						$scope.addresses,
						{
							id: "cityId",
							name: "city",
							invariant: "cityInvariant"
						},
						"dataTable1",
						$timeout);
				}
				if ($scope.phones.$ctrl) $scope.phones.$ctrl.inlineEditing = false;
				if ($scope.emails.$ctrl) $scope.emails.$ctrl.inlineEditing = false;
				if ($scope.accounts.$ctrl) $scope.accounts.$ctrl.inlineEditing = false;
				if ($scope.addresses.$ctrl) $scope.addresses.$ctrl.inlineEditing = false;
				if ($scope.emailTemplates.$ctrl) $scope.emailTemplates.$ctrl.inlineEditing = false;
			};
			editor.form.refreshFormCallback();
		} else if ($scope.$parent.launcher) { //details are shown in popup
			$scope.company = $scope.$parent.popup.openParams[1];
			$scope.serverResponse = null;
			apiAction('companies', 'getItemDetails', 'post', {item: $scope.company}, "no").then(function (response) {
				if (!response) return;
				$scope.serverResponse = response.data;
			});
			$scope.$watch(function () {
				return $scope.serverResponse
					&& $scope.phones.$ctrl //jshint ignore:line
					&& $scope.emails.$ctrl //jshint ignore:line
					&& $scope.accounts.$ctrl //jshint ignore:line
					&& $scope.addresses.$ctrl //jshint ignore:line
					&& $scope.emailTemplates.$ctrl //jshint ignore:line
			}, function (value) {
				if (!value) return;
				$scope.phones.$ctrl.datasourceSet($scope.serverResponse.phones);
				$scope.emails.$ctrl.datasourceSet($scope.serverResponse.emails);
				$scope.accounts.$ctrl.datasourceSet($scope.serverResponse.accounts);
				$scope.addresses.$ctrl.datasourceSet($scope.serverResponse.addresses);
				$scope.emailTemplates.$ctrl.datasourceSet($scope.serverResponse.emailTemplates);
			});
			let parent = $scope.launcher.$parent.$ctrl;
			$scope.getCitiesForCountry = parent.$parent.getCitiesForCountry;
			$scope.getDataItemCountry = parent.$parent.getDataItemCountry;
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
				$scope.addresses,
				{
					id: "countryId",
					name: "country",
					invariant: "countryInvariant"
				},
				"dataTable1",
				$timeout);

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
				$scope.addresses,
				{
					id: "cityId",
					name: "city",
					invariant: "cityInvariant"
				},
				"dataTable1",
				$timeout);
		}
	}
}());
