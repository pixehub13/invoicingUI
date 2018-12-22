<?php

$roles = array("admin", "user");

function addMenu($roleId)
{
	$items = array();
	if ($roleId == "admin")
		$items[] = new MenuItem("Users", "users", "app-modules/invoicing/users/users-index.html", [], "fa fa-users");
	$items[] = new MenuItem("Owned Companies", "owned-companies", "app-modules/invoicing/owners/owners-index.html", [], "fa fa-building");
	$items[] = new MenuItem("Countries", "countries", "app-modules/invoicing/countries/countries-index.html", [], "fa fa-globe");
	$items[] = new MenuItem("Cities", "cities", "app-modules/invoicing/cities/cities-index.html", [], "fa fa-globe");
	$items[] = new MenuItem("Companies", "companies", "app-modules/invoicing/companies/companies-index.html", [], "fa fa-building-o");
	$items[] = new MenuItem("Invoices", "invoices", "app-modules/invoicing/invoices/invoices-index.html", [], "fa fa-money");

	return $items;
}
