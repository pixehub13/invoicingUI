<?php

require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.controller.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/vendor/bnrCurs.php";

class CursValutar extends BaseController
{
	public function getCursAction()
	{
		$response = array();
		$response["status"] = false;
		try {

			if (!isset($_GET["currency"])) throw new \Exception("No currency parameter sended!");
//			if (!isset($_GET["date"])) throw new \Exception("No date parameter sended!");
			$curs = new cursBnrXML("http://www.bnro.ro/nbrfxrates.xml");


			$cursVal = $curs->getExchangeRate($_GET['currency']);
			if ($cursVal) {
				$data = json_decode(json_encode($cursVal));
				$response["data"] = $data->{0};
				$response["status"] = true;
			}
		} catch (Exception  $error) {
			$response["errors"] = $error->getMessage();
			$response["status"] = false;
		}
		return $response;
	}
}