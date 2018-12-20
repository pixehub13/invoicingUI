<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Country.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/City.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Company.php";

class CompanyAddressItem extends ModelItem
{
	public $id;
	public $companyId;
	public $name;
	public $countryId;
	public $cityId;
	public $county;
	public $address;
}

class CompanyAddress extends BaseModel
{
	public $tableName = "companies-addresses";
	public $modelItem = "CompanyAddressItem";

	public function sqlBuildGetAllItems($where = null, $order = null, $limit = NULL)
	{
		$cmd = 'SELECT a.*, 
                     b.name as company, b.nameInvariant as companyInvariant,
                     c.name as country, c.nameInvariant as countryInvariant, 
                     d.name as city, d.nameInvariant as cityInvariant 
                 FROM `' . $this->tableName . '` a 
                 LEFT JOIN companies b on b.id = a.companyId
                 LEFT JOIN countries c on c.id = a.countryId
                 LEFT JOIN cities d on d.id = a.cityId';
		if (isset($where)) $cmd .= $this->sqlBuildWhere($where);
		return $cmd;
	}

	public function getListAction($where = null, $order = null, $limit = NULL)
	{
		try {
			$cmd = $this->sqlBuildGetAllItems();
			if (isset($_REQUEST["companyId"])) {
				$cmd .= $this->sqlBuildWhere(["a.companyId" => $_REQUEST["companyId"]]);
			}
			$cmd .= ' Order By a.companyId ';
			$queryResult = $this->db->query($cmd);
			$response = array();
			$response["data"] = $queryResult->rows;

			$countries = (new Country($this->db, json_encode($this->postData)))->getListAction();
			if (!$countries["status"]) return $countries;
			$response["countries"] = $countries["data"];

			$cities = (new City($this->db, json_encode($this->postData)))->getListAction();
			if (!$cities["status"]) return $cities;
			$response["cities"] = $cities["data"];
			$response["status"] = true;
			return $response;
		} catch (Exception  $error) {
			return $this->catchError($error);
		}
	}

	public function validate(&$data = null)
	{
		$itemName = "Address";

		if (is_null($data)) $item = $this->item;
		else $item = json_decode(json_encode($data), FALSE);
		if (!isset($item->name)) {
			$exception = new Exception("$itemName name is required");
			$exception->field = "name";
			throw $exception;
		}
		if (!isset($item->countryId)) {
			$exception = new Exception("$itemName country is required");
			$exception->field = "countryId";
			throw $exception;
		}
		if (!isset($item->cityId)) {
			$exception = new Exception("$itemName city is required");
			$exception->field = "cityId";
			throw $exception;
		}

		return true;
	}

}
