(function () {
	angular.module("App").controller("usersCtrl", controller);
	controller.$inject = ['$scope', "axDataAdapter", "$element", "axDataStore"];

	function controller($scope, $adapter, $element, axDataStore) {
		$scope.loader = axDataStore.loader("#right-pane");
		$scope.$element = $element;

		$scope.table1 = {
			dataAdapter: new $adapter({
				invariant: ["nume", "prenume"],
				extend: function () {
					this.numeComplet = (this.prenume ? this.prenume : "") + (this.nume ? " " + this.nume : "");
					this.numeCompletInvariant = (this.prenumeInvariant ? this.prenumeInvariant : "") + this.numeInvariant ? (" " + this.numeInvariant) : "";
					return this;
				},
				conversions: {
					esteActiv: {type: "boolean"},
					esteAdmin: {type: "boolean"},
					CiDate: {type: "date"}
				}
			})
		};
	}
}());