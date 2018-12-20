var axAuthConfig = {
	allowAnonymous: false,
	urls: {
		login: "account/login",
		logoff: "account/logoff",
		getUserInfo: "account/getUserInfo",
		resetPassword: "account/resetPassword"
	},
	loadRoutesFromMenu: true,
	restorePreviousValues: function (dataStore, $storage, response, dataSet) {
		// console.log("response", $storage, dataStore, response);
		if ($storage.user && $storage.user.language) applicationInfo.language = $storage.user.language;
		this.dataSet = dataSet;
		if (!response.owners) console.error("NU exista owners in raspuns server getUserInfo");
		dataSet.owners = response.owners;
	},
	saveStorageUser: function (user, dataStore) {
		if (!dataStore.currentOwner && this.dataSet.owners && this.dataSet.owners.length) this.dataSet.currentOwner = this.dataSet.owners[0];
		// console.log("saveStorage", user, dataStore)
	}
};
