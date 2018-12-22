var applicationInfo = {
	"name": "Invoicing",
	"version": "1.0.0.0008",
	"copyright": "2018 Bogdan-Mihai Ionescu",
	"language": "en",
	"theme": {},

};
if (typeof window === 'undefined') {
	module.exports = applicationInfo;
} else {
	let el = document.querySelector('#environment');
	let type = "";
	let origin = window.origin;
	if (origin === "http://192.168.1.10:4001") type = "LIVE";
	else if (origin === "http://bogdanim36.asuscomm.com:5019") type = "Demo";
	else if (origin === "http://invoicing.demo.spark36.net") type = "Demo";
	else if (origin === "https://invoicing.demo.spark36.net") type = "Demo";
	else type = el.getAttribute('content');
	applicationInfo.type = type;
	applicationInfo.themes = themes;
	let versionArr = applicationInfo.version.split('.');
	if (versionArr.length > 3) versionArr.splice(versionArr.length - 1, 3);
	let version = versionArr.join('.');
	document.title = applicationInfo.name + " " + version + " " + type;
}
