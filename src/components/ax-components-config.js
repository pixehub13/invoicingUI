angular.module('ax.components', ["ngDialog", "ui.bootstrap", "ui.router", "as.sortable", "ngFileUpload", 'hmTouchEvents']);
/**
 * @returns {$axTableConfig}
 */
var $axTableConfig = function () {
	var separateLanguageFiles = false;
	var texts = {
		common: {
			cancel: {en: 'Cancel', ro: "Renunta"},
			ok: {en: "Ok", ro: "De acord"},
			clear: {en: "Clear", ro: "Sterge"},
			save: {en: "Save", ro: "Salveaza"},
			delete: {en: "Delete", ro: "Sterge"},
			change: {en: "Change", ro: "Schimba"},
			new: {en: "New", ro: "Nou"},
			view: {en: "View", ro: "Vezi"},
			edit: {en: "Edit", ro: "Modifica"},
			"deleteDone!": {en: "Delete done!", ro: "Stergere efectuata!"},
			confirmAction: {en: "Confirm action", ro: "Confirma actiunea"},
			deleteCurrentItem: {en: "Delete current item?", ro: "Stergi elementul curent?"},
			saveOperationNotFinished: {en: "Save operation not finished! Data is not valid! Please check marked fields!", ro: "Oepratia de salvare nu este finalizata!. Datele nu sunt corecte! Verifica campurile marcate!"},
			dataNotMeetingValidationCriteria: {en: "Data is not meeting the validation criteria. Save not finished. Please check the fields!", ro: "Datele nu indeplinesc conditiile necesare. Salvarea nu este efectuata. Verifica campurile marcate!"},
			saveSuccessful: {en: "Save successful!", ro: "Salvarea este efectuata!"},
			dataIsNotSaved: {en: "Data is not saved!", ro: "Datele nu s-au salvat!"}
		},
		pagination: {
			totalRecords: {en: "Total records", ro: "Total inregistrari"},
			fromPage: {en: "From", ro: "De la"},
			goToPage: {en: "Go to page", ro: "Du-te la pagina"},
			toPage: {en: "to", ro: "la"},
			currentPage: {en: "Current page", ro: "Pagina curenta"},
			of: {en: "of", ro: "de"},
			previous: {en: "Previous page", ro: "Pagina precedenta"},
			next: {en: "Next page", ro: "Pagina urmatoare"},
			firstPage: {en: "First page", ro: "Prima pagina"},
			lastPage: {en: "Last page", ro: "Ultima pagina"},
			noRecords: {en: "No records to show!", ro: "Nu sunt inregistrari!"},
			pageSizeSetting: {en: "Change records number on page", ro: "Modifica numarul de inregistrari pe pagina"}
		},
		columnHeader: {
			openMenu: {en: "Click to open column menu!", ro: "Click pt. a deschide meniul coloanei!"}
		},
		toolbar: {
			apply: {en: 'Apply orders and filters to changed records', ro: "Executa ordonarea si filtrarea ptr. inregistrarile modificate."},
			showEditor: {en: "Show editor for add/change/delete records", ro: "Arata editorul pt. adaugare/stergere/modificare inregistrare"},
			btnLoad: {en: "Load", ro: "Incarca"},
			btnLoading: {en: "Loading", ro: "Se incarca"},
			btnSave: {en: "Save", ro: "Salveaza"},
			btnSaving: {en: "Saving", ro: "Se salveaza"},
			btnApply: {en: "Apply", ro: "Aplica"},
			btnApplying: {en: "Applying", ro: "Se aplica"},
			btnApplySelected: {en: "Apply Selected", ro: "Executa selectia"},
			btnClearAll: {en: "Clear All", ro: "Sterge tot"},
			btnSaveProfile: {en: "Save profile", ro: "Salveaza profil"},
			btnRun: {en: "Run", ro: "Executa"},
			btnRunning: {en: "Running", ro: "Se executa"},
			config: {en: "Data table configuration", ro: "Configurare Data Table"},
			globalSearchTitle: {en: "Global search options", ro: "Optiuni de cautare globala"},
			toggleEditMode: {en: "Toggle edit/readonly mode for data table", ro: "Comuta modul readonly cu editare"},
			checkAll: {en: "Check All", ro: "Selecteaza tot"},
			uncheckAll: {en: "Uncheck All", ro: "Deselecteaza tot"},
			closePopup: {en: "Close popup", ro: "Inchide popup"},
			isReadonly: {en: "Edit Data", ro: "Editeaza datele"},
			isEditable: {en: "Lock editing", ro: "Blocheaza editare"},
			settings: {en: "Settings", ro: "Setari"},
			groupsFilter: {en: "Filter records by groups expressions", ro: "Filtrarea inregistrarilor dupa expresiile de grupare"},
			profiles: {en: "Profiles", ro: "Profile"},
			profileSave: {en: "Save current profile", ro: "Salveaza profilul curent"},
			profileLoad: {en: "Load a profile", ro: "Incarca un profil"},
			profileDelete: {en: "Delete a profile", ro: "Sterge un profil"},
			arrangeRowOrders: {en: 'Set rows order by columns', ro: "Stabileste ordinea inregistrarilor dupa coloane"},
			columnsToggleShow: {en: "Show/hide columns", ro: "Afiseaza/ascunde coloane"},
			columnsFreezing: {en: "Set columns layout", ro: "Stabileste modul de afisare a coloanelor"},
			dataGrouping: {en: "Grouping data records", ro: "Grupeaza inregistrarile"},
			dataGroupingEdit: {en: "Edit group properties", ro: "Modifica propritatile gruparii"},
			dataGroupingAddCalculation: {en: "Add calculation", ro: "Adauga calcul"},
			allRecordsMustHaveFirstLevel: {en: "Group by 'All records' must be first on grouping list", ro: "Grupeaza dupa 'Toate inregistrarile' trebuie sa fie prima in lista de grupari"},
			pivotTable: {en: "Pivot Table Design", ro: "Construire Pivot Table"},
			clearFilters: {en: "Clear all filters", ro: "Sterge toate filtrele"},
			clearAll: {en: "Clear all", ro: "Sterge tot"},
			allColumnsAutoFit: {en: "Auto fit all columns width to their visible content", ro: "Stabileste latimile pt. toate coloanele la continutul acestora"},
			loadDataTooltip: {en: "Load/refresh data from server", ro: "Incarca datele din server"},
			loadData: {en: "Load data", ro: "Incarca datele"},
			initialSelect: {en: 'Initial Select', ro: "Selectare initala"},
			initialSelectTooltip: {en: "Load initial parameters for report", ro: "Incarca parameterii initiali ai raportului"},
			addRecord: {en: "Add", ro: "Adauga"},
			addRecordTooltip: {en: "Add record (Ctrl+I)", ro: "Adauga inregistrare (Ctrl+I)"},
			dataExport: {en: "Export", ro: "Export"},
			toggleFilters: {en: "Show/hide filters row", ro: "Afiseaza/ascunde randul de fitrari"},
			dataExportTooltip: {en: "Select data export type.", ro: "Alege tipul de export al datelor"},
			xlsExport: {en: "Export data as Excel file", ro: "Exporta datele intr-un fisier Excel"},
			viewForPrint: {en: "View data for print", ro: "Vizualizare date pt. tiparire"},
			maximize: {en: "Toggle maximize data-table", ro: "Comuta afisarea maximizata"},
			confirmDeletion: {en: "Confirm delete item", ro: "Confirma stergere elementului"},
			editField: {en: "Edit Field", ro: "Modifica in camp"},
			columnNotGroupable: {en: "Selected column is not groupable", ro: "Coloana selectata nu este disponibila pt. grupari"},
			noSortableColumns: {en: "No sortable columns found!", ro: "Nu exista coloane dupa care se poate face ordonarea"},
			groupsToggle: {en: "Groups", ro: "Grupari"},
			groupLevelToggle: {en: "Toggle groups levels", ro: "Comuta ascundearea/afisarea pe toate nivele de grupare"}
		}
	};
	var config = {
		sortableClasses: {
			sortASC: 'fa fa-long-arrow-up',
			sortDESC: 'fa fa-long-arrow-down',
			sortABLE: 'glyphicon glyphicon-sort'
		},
		language: "en",
		default: "en",
		languages: {en: "English", ro: "Romana"},
		texts: texts,
		defaultAttrs: {
			customizableDataGrouping: "true",
			customizablePivotTable: "false",
			customizableConfig: "true",
			freezeColumnsEnabled: "true",
			hideFiltersRowEnabled: "true",
			columnsAutofitEnabled: "true",
			customizableFreezedColumns: "true",
			rowDataHeight: "24",
			rowHeaderHeight: "28"
		},
		filters: {
			menu: function (element) {
				var type = element.getAttribute("data-type");
				var defaultMenu = this.menus[type];
				if (!defaultMenu) return element;
				else return defaultMenu(element);
			},
			multiselectDistinctValues(menu) {
				createElement("ax-column-filter", {
					type: "dropdown-list-distinctvalues",
					"selectable-rows": "multiple",
					"label": "Multiselect from distinct values"
				}, "", menu);
			},
			inputValue(menu, type, showInPopup, popupWidth) {
				createElement("ax-column-filter", {
					type: type,
					"show-config": "true",
					showInPopup: showInPopup ? "true" : "false",
					popupWidth: popupWidth ? popupWidth + "px" : "",
					"label": "Filter by input value"
				}, "", menu);
			},
			menus: {
				string: function (menu) {
					if (menu.innerHTML.trim() !== "") return menu;
					config.filters.multiselectDistinctValues(menu);
					config.filters.inputValue(menu, "text");
					return menu;
				},
				text: function (menu) {
					return config.filters.menus.string(menu);
				},
				boolean: function (menu) {
					if (menu.innerHTML.trim() !== "") return menu;
					if (!menu.hasAttribute("convert-type")) menu.setAttribute("convert-type", "boolean");
					config.filters.multiselectDistinctValues(menu);
					return menu;
				},
				number: function (menu) {
					if (menu.innerHTML.trim() !== "") return menu;
					config.filters.multiselectDistinctValues(menu);
					config.filters.inputValue(menu, "number", true, 280);
					return menu;
				},
				date: function (menu) {
					if (menu.innerHTML.trim() !== "") return menu;
					if (!menu.hasAttribute("convert-type")) menu.setAttribute("convert-type", "date");
					if (!menu.hasAttribute("convert-input-format")) menu.setAttribute("convert-input-format", "yyyy-MM-ddThh:mm:ss");
					if (!menu.hasAttribute("convert-display-format")) menu.setAttribute("convert-display-format", axDateFormat);
					config.filters.multiselectDistinctValues(menu);
					config.filters.inputValue(menu, "date", true);
					return menu;
				},
				datetime: function (menu) {
					if (menu.innerHTML.trim() !== "") return menu;
					if (!menu.hasAttribute("convert-type")) menu.setAttribute("convert-type", "datetime");
					if (!menu.hasAttribute("convert-input-format")) menu.setAttribute("convert-input-format", "yyyy-MM-ddThh:mm:ss");
					if (!menu.hasAttribute("convert-display-format")) menu.setAttribute("convert-display-format", axDateTimeFormat);
					config.filters.multiselectDistinctValues(menu);
					config.filters.inputValue(menu, "datetime", true);
					return menu;
				}
			}
		}
	};
	var privateConfig = new axTableConfig();
	axUtils.objectOverwrite(config, privateConfig, false, false, true);
	return config;
};

var focusableElements = '[has-input]:not([disabled]):not([readonly]):not(ax-dropdown-list):not(ax-dropdown-popup):not(ax-table),' +
	'button:not([disabled]):not([readonly]):not([tabindex="-1"])';
//var focusableElements = '[has-input]:not([disabled]):not([readonly]):not(ax-dropdown-list):not(ax-dropdown-popup):not(ax-table),' +
//	'.form-control:not([has-input]):not([disabled]):not([readonly]):not(ax-dropdown-list):not(ax-dropdown-popup):not(ax-table) [has-input],' +
//	'button:not([disabled]):not([readonly]):not([tabindex="-1"])';

var convertDataTypes = {
	date: function (itemValue) {
		var value;
		if (itemValue === null || itemValue === undefined) return undefined;
		else if (typeof itemValue === "string") {
			value = this.inputFormat ? moment(itemValue, this.inputFormat, true) : moment(itemValue);
			if (value && value.isValid && value.isValid()) value = value.toDate();
			else console.error("date convert error for", itemValue, this.inputFormat, value._f);
		} else if (typeof itemValue === "object" && itemValue.getTimezoneOffset) value = itemValue;
		else console.error("Date value must be string or date object");
		value.setMinutes(0);
		value.setSeconds(0);
		value.setMilliseconds(0);
		value.setHours(-value.getTimezoneOffset() / 60);
		// console.log(value.toLocaleDateString());
		return value;
	},
	boolean: function (itemValue) {
		if (itemValue === "true" || itemValue === "True" || itemValue === true || parseInt(itemValue) > 0) return true;
		else if (itemValue === "" || itemValue === null || itemValue === undefined) return null;
		else return false;
	},
	integer: function (itemValue) {
		if (itemValue === "" || itemValue === null || itemValue === undefined) return null;
		else return parseInt(itemValue);
	},
	float: function (itemValue) {
		let result;
		if (itemValue === "" || itemValue === null || itemValue === undefined) result = null;
		else result = parseFloat(itemValue);
		// console.log("convert ", itemValue, "to", result);
		return result;
	}
};
convertDataTypes["date-range"] = convertDataTypes.date;
convertDataTypes.datetime = convertDataTypes.date;
convertDataTypes["datetime-range"] = convertDataTypes.date;
