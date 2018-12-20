class emailTemplates {
	constructor(createCtrl, $scope) {
		Object.assign(this, createCtrl($scope));
		this.variables = {
			items: [
				{
					name: "Supplier Name",
					id: "SupplierName",
					html: " {{SupplierName}} "
				},
				{
					name: "Invoice Number",
					id: "InvoiceNumber",
					html: " {{InvoiceNumber}} "
				}, {
					name: "Invoice Date",
					id: "InvoiceDate",
					html: " {{InvoiceDate}} "
				}, {
					name: "Previous Month Name",
					id: "PreviousMonthName",
					html: " {{PreviousMonthName}} "
				}],
			allowDrop: function (event) {
				event.preventDefault();
				// console.log("allow", event);
			},
			drag: function (event) {
				let item = angular.element(event.target).scope().item;
				event.dataTransfer.setData("text", item.html);
				event.dataTransfer.effectAllowed = "copy";
				event.dataTransfer.dropEffect = "copy";
				return true;
			},
			insertAtCursor: function (input, value) {
				//IE support
				if (document.selection) {
					input.focus();
					let sel = document.selection.createRange();
					sel.text = value;
				}
				//MOZILLA/NETSCAPE support
				else if (input.selectionStart || input.selectionStart == '0') {
					let startPos = input.selectionStart;
					let endPos = input.selectionEnd;
					input.value = input.value.substring(0, startPos)
						+ value
						+ input.value.substring(endPos, input.value.length);
				} else {
					input.value += value;
				}
				return input.value;
			},
			dropToSubject: function (event) {
				event.preventDefault();
				let data = event.dataTransfer.getData("text");
				let $input = angular.element(event.target);
				let value = $scope.emailTemplates.variables.insertAtCursor($input[0], data);
				$scope.emailTemplates.$ctrl.$$grid.$$editor.form.$ctrl.datasource.subject = value;
				$scope.$apply();
			},
			dragEnter: function (event) {
				event.preventDefault();
				event.target.style["background-color"] = "orange";
			},
			dragLeave: function (event) {
				event.preventDefault();
				event.target.style["background-color"] = "transparent";
			}
		};

		this.ckEditorConfig = {
			language: 'en',
			allowedContent: true,
			width: "100%",
			height: "150px",
			entities: false,
			ready: false,
			simpleuploads_allowDropOutside: true,
			onReady: function (ckEditor) {
				$scope.emailTemplates.ckEditorConfig.ready = true;
			},
			toolbarGroups: [
				{name: 'basicstyles', groups: ['basicstyles']},
				{name: 'paragraph', groups: ['list', 'indent', 'align']},
				{name: 'font'},
				{name: 'styles'},
				{name: 'colors'},
				{name: 'document', groups: ['mode', 'document', 'doctools']},
			]
		};
	}
}