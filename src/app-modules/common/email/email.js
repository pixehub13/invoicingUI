(function () {
	'use strict';

	class controller {
		/**
		 *
		 * @param $scope
		 * @param $element
		 * @param $attrs
		 * @param dataStore {axDataStore}
		 */
		constructor($scope, $element, $attrs, dataStore) {
			this.data = new EmailModel();
			this.dataStore = dataStore;
			this.user = this.dataStore.user.info;
			/**
			 * @type {axFormCustomCtrl}
			 */
			this.formConfig = {
				/**
				 *
				 * @param fieldName
				 * @param datasource {EmailModel}
				 */
				validateField: function (fieldName, datasource) {
					let value = datasource[fieldName];
					switch (fieldName) {
						case "to":
							if (value === undefined || value === null || value === "") {
								this.$ctrl.addFieldError(fieldName, "Field is required", datasource);
								return false;
							}
							break;
						case "subject":
							if (value === undefined || value === null || value === "") {
								this.$ctrl.addFieldError(fieldName, "Field is required", datasource);
								return false;
							}
							break;
						case "message":
							if (value === undefined || value === null || value === "") {
								this.$ctrl.addFieldError(fieldName, "Field is required", datasource);
								return false;
							}
							break;
					}
					return true;
				}
			};
			this.templateChanged = function (template) {
				this.data.to = template.to;
				this.data.from = template.from;
				this.data.subject = template.subjectParsed;
				this.data.message = template.messageParsed;
			};
			this.dataClear = function(){
				this.data.to = "";
				this.data.from = "";
				this.data.subject = "";
				this.data.message = "";
				this.data.attachments = [];
				this.uploadFilesConfig.$ctrl.$files=[];
				this.data.selectedTemplate = null;
			};
			this.popupClose = $scope.popupClose;
			this.ckEditorConfig = {
				language: 'en',
				allowedContent: true,
				width: "100%",
				height: "150px",
				entities: false,
				toolbarGroups: [
					{name: 'basicstyles', groups: ['basicstyles']},
					{name: 'paragraph', groups: ['list', 'indent', 'align']},
					{name: 'font'},
					{name: 'styles'},
					{name: 'colors'},
					{name: 'document', groups: ['mode', 'document', 'doctools']},
				]
			};
			this.uploadFilesConfig = {};
			if ($scope.$parent.ngDialogId && $scope.$parent.params) {
				angular.extend(this.data, $scope.$parent.params.data);
				if (this.data.templates.length > 0) {
					this.data.selectedTemplate = this.data.templates[0];
					this.templateChanged(this.data.selectedTemplate);
				}
			}
		}

		send(removeLoader) {
			let ctrl = this.formConfig.$ctrl;
			ctrl.clearAllErrors(this.data);
			if (!ctrl.validateForm()) return;
			let data = {
				to: this.data.to,
				from: this.user.numeComplet + "<" + this.user.email + ">",
				subject: this.data.subject,
				message: this.data.message
			};
			if (this.data.remoteAttachment) {
				data.remoteAttachments = [];
				data.remoteAttachments.push(this.data.remoteAttachment);
			}
			this.messageWasSend = false;
			this.messageSending = true;
			this.messageError = false;
			let popupClose = this.popupClose;
			this.uploadFilesConfig.$ctrl.uploadAll('export/email', data).then(response => {
				this.messageSending = false;
				if (response && response.data.status) {
					this.messageWasSend = true;
					setTimeout(function () {
						popupClose();
					}, 500);
				} else {
					this.messageError = true;
					if (response.data.errors) {
						for (let error in response.data.errors) {
							ctrl.addGlobalError(error, response.data.errors [error]);

						}
					} else ctrl.addGlobalError("", response.data);
					console.error(response.data);
				}
				if (removeLoader) removeLoader();
			}, error => {
				console.error("eroare", error);
			});
		}
	}

	angular.module('App').controller('emailController', controller);
	controller.$inject = ['$scope', "$element", "$attrs", "axDataStore"];

})();