var axTableConfig = function () {
	var separateLanguageFiles = false;
	var texts = {
		common: {
			cancel: {en: 'Cancel', ro: "Renunta"},
			ok: {en: "Ok"}
		},
		pagination: {
			fromPage: {en: "From"},
			goToPage: {en: "Go to page"},
			toPage: {en: "to"},
			currentPage: {en: "Current page"},
			of: {en: "of"},
			previous: {en: "Previous page"},
			next: {en: "Next page"},
			firstPage: {en: "First page"},
			lastPage: {en: "Last page"},
			noRecords: {en: "No records to show!"},
			pageSizeSetting: {en: "Change records number on page"}
		},
		columnHeader: {
			openMenu: {en: "Click to open column menu!"}
		},
		toolbar: {
			apply: {en: 'Apply orders and filters to changed records'},
			toggleEditMode: {en: "Toogle edit/readonly mode for data table"},
			isReadonly: {en: "Edit Data"},
			isEditable: {en: "Lock editing"},
			settings: {en: "Settings"},
			arrangeRowOrders: {en: 'Set rows order'},
			columnsToggleShow: {en: "Show/hide columns"},
			clearFilters: {en: "Clear all filters"},
			allColumnsAutoFit: {en: "Auto fit all columns width to their visible content"},
			loadDataTooltip: {en: "Load/refresh data from server"},
			loadData: {en: "Load data"},
			initialSelect: {en: 'Initial Select'},
			initialSelectTooltip: {en: "Load initial parameters for report"},
			addRecord: {en: "Add"},
			addRecordTooltip: {en: "Add record"},
			dataExport: {en: "Export"},
			toggleFilters: {en: "Show/hide filters row"},
			dataExportTooltip: {en: "Select data export type."},
			xlsExport: {en: "Export data as Excel file"},
			viewForPrint: {en: "View data for print"},
			maximize: {en: "Toggle maximize data-table"}
		}
	};
	var config = {
		sortableClasses: {
			sortASC: 'fa fa-long-arrow-up',
			sortDESC: 'fa fa-long-arrow-down',
			sortABLE: 'glyphicon glyphicon-sort'
		},
		language: applicationInfo.language,
		default: "en",
		texts: texts,
		defaultAttrs: {
			customizableDataGrouping: true,
			freezeColumnsEnabled: true,
			customizableFreezedColumns: true,
			hideFiltersRowEnabled: true,
			columnsAutofitEnabled: true,
			showCommandsTooltips: true,
			showPaginationTooltips: false,
			showDataCellsTooltip: false,
			rowDataHeight: applicationInfo.theme.dimensions.rowDataHeight
		}

	};
	return config;
};
