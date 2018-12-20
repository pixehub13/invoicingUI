window.countriesClass = {
	dataTable: function ($adapter) {
		return {
			dataAdapter: $adapter({
				invariant: ["name"]
			}),
			isNewRecord(dataItem) {
				return !dataItem.id;
			},
			canAdd1: function () {
				return $scope.editingMode === "page" ? true : $scope.country && $scope.country.id;
			},
			validateField(fieldName, dataItem) {
				let value = dataItem[fieldName];
				// console.log("validate field", fieldName, value);
				switch (fieldName) {
					case "name":
						if (value === undefined || value === null || value === "") {
							//method to add error to column
							this.$ctrl.addFieldError(fieldName, "Field is required", dataItem);
							return false;
						} else dataItem[fieldName] = value.trim().toTitleCase();
						break;
				}
				return true;
			}
		};
	},
	popup: function ($adapter, datasource, dataTableParent, destination, dataTableConfigName, $timeout) {
		return {
			showButtons: true,
			onOpen: function () {
				// you can use link-popup, not only in editRow===editor, but also with inline and inline-cell edit-row]
				if (dataTableParent.$ctrl.attrs.editRow === "editor") {
					this.currentItem = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.datasource;
					this.readOnly = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.readOnly;
				} else //this is for edit-row=inline or inline-cell
				{
					this.currentItem = dataTableParent.$ctrl.currentItem;
					this.readOnly = false;
				}
				let popup = this;
				this.initialSelection = this.currentItem[destination.id];
				this.currentSelection = this.initialSelection;
				this.openFinish = true;
			},
			onClose: function () {
				//update countries dropdown datasource with changes
				datasource.set(this[dataTableConfigName].$ctrl.datasource);
			},
			confirm: function () {
				datasource.set(this[dataTableConfigName].$ctrl.datasource);
				// depend on what you need you can take from catalog more than id property (name, invariant column, etc)
				// $timeout it's needed for wait to execute autocomplete wacth datasource;
				let currentItem = this[dataTableConfigName].$ctrl.currentItem;
				let self = this;
				$timeout(function () {
					//console.log("popup select", currentItem);
					self.currentItem[destination.id] = currentItem.id;
					if (destination.name) self.currentItem[destination.name] = currentItem.name;
					if (destination.invariant) self.currentItem[destination.invariant] = currentItem.nameInvariant;
				});
				this.close();
			}
		};
	}
};
