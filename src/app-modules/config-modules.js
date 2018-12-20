var axDateTimeFormat = "dd.MM.yyyy HH:mm:ss";
var axDateFormat = "dd.MM.yyyy";
var axDtLimits = -1;
var axLocale = "ro-RO";
var axNumberFormat = {
	style: "decimal",
	locale: axLocale,
	grouping: "true",
	decimals: 0
};
// you can define here the routes and templates, if you don't prefer to load routes from backend, with user menus
var pagesTemplates = {
	loadExtraRoutes: function ($stateProvider) {
		$stateProvider.stateAsMainContent("profile", "profile", "app-modules/invoicing/users/profile.html");
	}
};
var maxMobileWidth = 900;

var themes = [
	{
		default: false,
		name: "Bootstrap Normal",
		dimensions: {
			url: "components/themes/ax-theme.dimensions.normal.css",
			class: "dimensions-normal",
			rowDataHeight: 28,
			iconButtonWidth: 32,
			leftPanelWidth: 250,
			maxMobileWidth: maxMobileWidth
		},
		appearance: {
			url: "components/themes/ax-theme.appearance.bootstrap-1.css",
			class: "bootstrap1-theme"
		},
		baseOn: "bootstrap4",
	},
	{
		default: false,
		name: "Bootstrap Large",
		dimensions: {
			url: "components/themes/ax-theme.dimensions.large.css",
			class: "dimensions-large",
			rowDataHeight: 32,
			iconButtonWidth: 40,
			leftPanelWidth: 350,
			maxMobileWidth: maxMobileWidth
		},
		appearance: {
			url: "components/themes/ax-theme.appearance.bootstrap-1.css",
			class: "bootstrap1-theme"
		},
		baseOn: "bootstrap4",
	},
	{
		default: true,
		name: "Flat Normal",
		dimensions: {
			url: "components/themes/ax-theme.dimensions.normal.css",
			class: "dimensions-normal",
			rowDataHeight: 28,
			iconButtonWidth: 32,
			leftPanelWidth: 250,
			maxMobileWidth: maxMobileWidth
		},
		appearance: {
			url: "components/themes/ax-theme.appearance.bootstrap-flat.css",
			class: "bootstrap1-theme"
		},
		baseOn: "bootstrap4",
	},
	{
		default: false,
		name: "Flat large",
		dimensions: {
			url: "components/themes/ax-theme.dimensions.large.css",
			class: "dimensions-large",
			rowDataHeight: 32,
			iconButtonWidth: 40,
			leftPanelWidth: 350,
			maxMobileWidth: maxMobileWidth
		},
		appearance: {
			url: "components/themes/ax-theme.appearance.bootstrap-flat.css",
			class: "bootstrap1-theme"
		},
		baseOn: "bootstrap4",
	},
];

var changeAppStyle = function (dataStore) {
	dataStore.isMobileDevice = angular.element(window.document).width() <= maxMobileWidth;
	if (dataStore.isMobileDevice) dataStore.leftPaneCollapsed = true;
	angular.element(window.document).find("body").removeClass("is-mobile");
	if (dataStore.isMobileDevice) angular.element(window.document).find("body").addClass("is-mobile");
};
var mainCtrlExtend = function ($scope, $injector) {
	let dataStore = $injector.get("axDataStore");
	let dataSet = $injector.get("axDataSet");
	$scope.owner = {
		onChange(item) {
			// console.log("owner changed", dataSet.currentOwner);
		}
	};
	let $storage = $injector.get("$localStorage");
	let $timeout = $injector.get("$timeout");
	dataStore.maxMobileWidth = maxMobileWidth;
	dataStore.isMobileDevice = false;
	$scope.leftPaneToggle = function leftPaneToggle(value) {
		let right = angular.element("#right-pane").length ? angular.element("#right-pane") : null;
		if (value === undefined) value = dataStore.leftPaneCollapsed;
		if (value) {
			dataStore.leftPaneCollapsed = false;
			$timeout(function () {
				let left = angular.element("#left-pane, #copyright");
				changeAppStyle(dataStore);
				if (left.length) {
					left.width(dataStore.isMobileDevice ? 0 : applicationInfo.theme.dimensions.leftPanelWidth);
					left.show();
					if ($storage.user) $storage.user.leftPaneCollapsed = dataStore.leftPaneCollapsed;
					dataStore.rightPanelCssLeft = dataStore.isMobileDevice ? 0 : applicationInfo.theme.dimensions.leftPanelWidth;
					$timeout(function () {
						axUtils.triggerWindowResize();
					});

				}
			}, 0);
		} else {
			let left = angular.element("#left-pane,#copyright");
			if (left.length)
				left.hide();
			changeAppStyle(dataStore);
			if (dataStore.isMobileDevice) dataStore.leftPaneCollapsed = true;
			left.width(0);
			dataStore.rightPanelCssLeft = 0;
			dataStore.leftPaneCollapsed = true;
			if ($storage.user) $storage.user.leftPaneCollapsed = dataStore.leftPaneCollapsed;
			$timeout(function () {
				axUtils.triggerWindowResize();
			});
		}

	};

	changeAppStyle(dataStore);
	axUtils.addEventListener(window, 'resize', function () {
		changeAppStyle(dataStore);
	});
	mediaStyles(maxMobileWidth);
	if (!dataStore.leftPaneCollapsed) $timeout(function () {
		$scope.leftPaneToggle(dataStore.leftPaneCollapsed !== true);
	});
};
var changeTheme = function (theme, $rootScope, $injector) {
	// console.log("change theme", theme);
	switch (theme.name) {
		case "Bootstrap":
			break;
		default:
	}
};

var appConfigExtended = function appConfigExtended($compileProvider, $locationProvider, $injector) {

};
var appRunExtend = function appRunExtend($rootScope, $injector) {
	const $timeout = $injector.get("$timeout");
	let width = (window.innerWidth < 1120) ? 1120 : window.innerWidth;
	let height = (window.innerHeight < 820) ? 820 : window.innerHeight;
	window.resizeTo(width, height);
};