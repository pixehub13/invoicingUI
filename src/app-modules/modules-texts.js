/**
 *
 * @param id
 * @param check if check = true, id is translated only if has prefix 'trans:', otherwise id is returned
 * @param debug
 * @returns {string}
 */
var trans = function (id, check, debug) {
	if (check) {
		if (!id.startsWith("trans:")) return id;
		id = id.substring(6);
	}
	let language = applicationInfo.language;
	if (debug) console.debug("translation for", id, "language", applicationInfo.language);
	let texts = moduleTexts();
	if (!texts[id]) return console.error("Doesn't exist module text for ", id);
	if (!texts[id][language]) return console.error("Doesn't exist module text for ", id, 'language', language);
	if (debug) console.debug("return", texts[id][language]);
	return texts[id][language];
};

var moduleTexts = function () {
	var texts = {
		Description: {en: "Description", ro: "Descriere"},
		Invoices: {en: "Invoices", ro: "Facturi"},
		Invoice: {en: "Invoice", ro: "Factura"},
		InvoiceDetails: {en: "Current Invoice Details", ro: "Detalii Factura Curenta"},
		Unit: {en: "Unit", ro: "U.M."},
		VatPercent: {en: "VAT%", ro: "TVA%"},
		VatValue: {en: "VAT Value", ro: "Valoare TVA"},
		Quantity: {en: "Quantity", ro: "Cantitate"},
		Price: {en: "Price", ro: "Pret"},
		Value: {en: "Value", ro: "Valoare"},
		SupplierDeliveryAddress: {en: "Supplier Delivery Address", ro: "Adresa Livrare Furnizor"},
		SupplierBankAccount: {en: "Supplier Bank Account", ro: "Cont Bancar Furnizor"},
		Supplier: {en: "Supplier", ro: "Furnizor"},
		DeliveryAddress: {en: "Delivery Address", ro: "Adresa Livrare"},
		BankAccount: {en: "Bank Account", ro: "Cont Bancar"},
		BankAccounts: {en: "Bank Accounts", ro: "Conturi Bancare"},
		CustomerDeliveryAddress: {en: "Customer Delivery Address", ro: "Adresa Livrare Client"},
		Customer: {en: "Customer", ro: "Client"},
		Total: {en: "Total", ro: "Total"},
		Date: {en: "Date", ro: "Data"},
		Serial: {en: "Serial", ro: "Serie"},
		Number: {en: "Number", ro: "Numar"},
		Preferences: {en: "Preferences", ro: "Preferinte"},
		CurrentTheme: {en: "Current Theme", ro: "Tema curenta"},
		CurrentLanguage: {en: "Current Language", ro: "Limba curenta"},
		Profile: {en: "Profile", ro: "Profil"},
		Save: {en: "Save", ro: "Salveaza"},
		Reset: {en: "Reset", ro: "Reseteaza"},
		Email: {en: "Email", ro: "Email"},
		FirstName: {en: "FirstName", ro: "Prenumele"},
		LastName: {en: "Last Name", ro: "Numele"},
		FullName: {en: "Complete Name", ro: "Numele Complet"},
		Name: {en: "Name", ro: "Denumire"},
		IssuedBy: {en: "Issued By", ro: "Eliberat de"},
		ReleaseDay: {en: "Release Day", ro: "Data Eliberarii"},
		Users: {en: "Users", ro: "Utilizatori"},
		User: {en: "User", ro: "Utilizator"},
		Active: {en: "Active", ro: "Activ"},
		Admin: {en: "Admin", ro: "Admin"},
		OwnedCompany: {en: "Company", ro: "Societate"},
		Company: {en: "Company", ro: "Societate"},
		Companies: {en: "Companies", ro: "Societati"},
		SocialCapital: {en: "Social Capital", ro: "Capital Social"},
		ContactPhone: {en: "Contact Phone", ro: "Telefon de Contact"},
		Phone: {en: "Phone", ro: "Telefon"},
		ContactEmail: {en: "Contact Email", ro: "Email de Contact"},
		VatRegistration: {en: "Vat Registration", ro: "C.I.F."},
		VatPercentsList: {en: "Vat Percents List", ro: "Lista Procente TVA"},
		Stamp: {en: "Stamp", ro: "Stampila"},
		OwnedCompanies: {en: "OwnedCompanies", ro: "Societati Detinute"},
		Countries: {en: "Countries", ro: "Tari"},
		Country: {en: "Country", ro: "Tara"},
		Cities: {en: "Cities", ro: "Orase"},
		City: {en: "City", ro: "Oras"},
		CountryName: {en: "Country Name", ro: "Numele Tarii"},
		CityInvariant: {en: "CityInvariant", ro: "Oras Fara Diacritice"},
		Details: {en: "Details", ro: "Detalii"},
		CompanyName: {en: "Company Name", ro: "Numele Societatii"},
		TradeRegister: {en: "Trade Register", ro: "Nr. Reg. Com."},
		Administrator: {en: "Administrator", ro: "Administrator"},
		SeatCountry: {en: "Seat Country", ro: "Tara Sediu"},
		SeatCounty: {en: "Seat County", ro: "Judetul Sediu"},
		SeatCity: {en: "Seat City", ro: "Oras Sediu "},
		SeatAddress: {en: "Seat Address", ro: "Adresa Sediu"},
		Phones: {en: "Phones", ro: "Telefoane"},
		Emails: {en: "Emails", ro: "Adrese Email"},
		Accounts: {en: "Accounts", ro: "Conturi"},
		EmailTemplates: {en: "Email Templates", ro: "Sabloane Email"},
		Addresses: {en: "Addresses", ro: "Adrese"},
		Actions: {en: "Actions", ro: "Actiuni"},
		Bank: {en: "Bank", ro: "Banca"},
		Account: {en: "Account", ro: "Cont"},
		Address: {en: "Address", ro: "Adresa"},
		TemplateName: {en: "Template Name", ro: "Nume Sablon"},
		Subject: {en: "Subject", ro: "Subiect"},
		Message: {en: "Message", ro: "Mesaj"},
		County: {en: "County", ro: "Judet"},
		SenderEmail: {en: "From", ro: "De La"},
		From: {en: "From", ro: "De La"},
		ToEmailsList: {en: "To", ro: "Catre"},
		To: {en: "To", ro: "Catre"},
		CiSeries: {en: "CI Series", ro: "Serie CI"},
		CiNumber: {en: "CI Number", ro: "Numar CI"},
		CiIssuedBy: {en: "CI Issued By", ro: "Emitent CI"},
		CiDate: {en: "CI Date", ro: "Data Emiterii"},
		SecurityNumber: {en: "SecurityNumber", ro: "C.N.P."},
		Variables: {en: "Variables", ro: "Variabile"},
		Clear: {en: "Clear", ro: "Sterge"},
		Close: {en: "Close", ro: "Inchide"},
		SendEmail: {en: "Send Email", ro: "Trimite Email"},
		"Administration": {en: "Administration", ro: "Administrare"},
		"Common Items": {en: "Common Items", ro: "Optiuni Comune"},
		"Owned Companies": {en: "Owned Companies", ro: "Societati Detinute"},
		SelectTemplate: {en: "With Template", ro: "Cu Sablon"},
		Currencies: {en: "Currencies", ro: "Valute"},
		Currency: {en: "Currency", ro: "Valuta"},
		text: {en: "", ro: ""},
	};
	return texts;
};
