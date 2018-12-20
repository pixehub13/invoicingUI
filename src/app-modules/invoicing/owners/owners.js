window.ownersClass = {
	dataTable: function ($adapter, $scope, Upload, guid) {
		let ownerAdapterCfg = new axAdapterConfig();
		ownerAdapterCfg.addInvariantField("name");
		ownerAdapterCfg.addBooleanConversion('vatRegistred');
		/**
		 *
		 * @type {axTableCustomCtrl}
		 */
		let config = {};
		config.dataAdapter = $adapter(ownerAdapterCfg);
		config.isNewRecord = function (dataItem) {
			return !dataItem.id;
		};
		config.createCallback = function (dataItem) {
			let takeFrom = $scope.country ? $scope.country : this.currentItem ? this.currentItem : null;
			if (takeFrom) {
				dataItem.countryId = $scope.country ? takeFrom.id : takeFrom.countryId;
				dataItem.country = $scope.country ? takeFrom.name : takeFrom.country;
				dataItem.countryInvariant = $scope.country ? takeFrom.nameInvariant : takeFrom.countryInvariant;
			}
		};
		config.canAdd = function () {
			return $scope.editingMode === "page" ? true : $scope.country && $scope.country.id;
		};
		config.validateField = function (fieldName, dataItem) {
			let value = dataItem[fieldName];
			switch (fieldName) {
				case "companyId":
					if (value === undefined || value === null || value === "") {
						//method to add error to column
						this.$ctrl.addFieldError(fieldName, "Field is required", dataItem);
						return false;
					}
					break;
				case "name":
					if (value === undefined || value === null || value === "") {
						//method to add error to column
						this.$ctrl.addFieldError(fieldName, "Field is required", dataItem);
						return false;
					}
					//cleaning is a string prototype method for trim() and replace " => '. " character is not allowed to be contained in strings
					dataItem[fieldName] = value.cleaning();
					break;
			}
			return true;
		};
		config.save = function (dataItem, apiArgs, saveThen) {
			let item = {};
			Object.keys(dataItem).forEach(key => {
				if (dataItem[key] instanceof File) return;
				item[key] = dataItem[key];
			});
			let data = {item: item};
			data.filesMap = [];
			let files = [];
			if (dataItem.logoFile instanceof File) {
				data.filesMap.push("logo");
				files.push(dataItem.logoFile);
			}
			if (dataItem.stampFile instanceof File) {
				data.filesMap.push("stamp");
				files.push(dataItem.stampFile);
			}
			data.file = files;
			let url = "/owners/" + (dataItem.id ? "update?id=" + dataItem.id : "create");
			let uploadConfig = {
				url: url,
				data: data
			};
			// console.log("send", data);
			return Upload.upload(uploadConfig).then(function (response) {
				console.log("response", response);
				let dataItem = response.data.data;
				dataItem.stampPath += "?v=" + guid.create();
				dataItem.logoPath += "?v=" + guid.create();
				if (dataItem.id === $scope.dataSet.currentOwner.id) angular.extend($scope.dataSet.currentOwner, dataItem);
				saveThen.call(config.$ctrl.$$grid.$$editor.form.$ctrl, response ? response.data : null);
			}, console.error, function (evt) {
				console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total), "size", evt.loaded, "total", evt.total);
			}).catch(console.error);
		};

		return config;

	},
	popup: function ($adapter, datasource, dataTableParent, destination, dataTableConfigName, $timeout) {
		return {
			showButtons: true,
			onOpen: function (params) {
				this.dataItem = params[1];
				// you can use link-popup, not only in editRow===editor, but also with inline and inline-cell edit-row]
				if (dataTableParent.$ctrl.attrs.editRow === "editor") {
					this.currentItem = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.datasource;
					this.readOnly = dataTableParent.$ctrl.$$grid.$$editor.form.$ctrl.readOnly;
				} else //this is for edit-row=inline or inline-cell
				{
					this.currentItem = dataTableParent.$ctrl.currentItem;
					this.readOnly = false;
				}
				this.currentSelection = this.currentItem[destination.id];
				let popup = this;
				this.initialSelection = this.currentSelection;
				this.openFinish = true;
			},
			onClose: function () {
				//update countries dropdown datasource with changes, this can be done even when current record in parent table is not in editing mode.
				datasource.set(this[dataTableConfigName].$ctrl.datasource);
			},
			//this is enabled only in editing mode for parent table
			confirm: function () {
				// depend on what you need you can take from catalog more than id property (name, invariant column, etc)
				// $timeout it's needed for wait to execute autocomplete wacth datasource;
				let currentItem = this[dataTableConfigName].$ctrl.currentItem;
				let self = this;
				$timeout(function () {
					self.currentItem[destination.id] = currentItem.id;
					if (destination.name) self.currentItem[destination.name] = currentItem.name;
					if (destination.invariant) self.currentItem[destination.invariant] = currentItem.nameInvariant;
				});
				this.close();
			}
		};
	}
};
