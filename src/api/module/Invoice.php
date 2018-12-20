<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Owner.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Company.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/CompanyAddress.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/CompanyAccount.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/InvoiceDetail.php";

class InvoiceItem extends ModelItem
{
	public $id;
	public $ownerId;
	public $supplierDeliveryAddressId;
	public $supplierDeliveryAddress;
	public $supplierDeliveryCounty;
	public $supplierDeliveryCityId;
	public $supplierDeliveryCountryId;
	public $supplierBankAccountId;
	public $vatRegistred;
	public $date;
	public $serial;
	public $number;
	public $customerId;
	public $customerName;
	public $customerDeliveryCountryId;
	public $customerDeliveryCounty;
	public $customerDeliveryCityId;
	public $customerDeliveryAddress;
	public $customerDeliveryAddressId;
	public $customerBankAccountId;
	public $customerBank;
	public $total;
	public $currency;
	public $vatValue;
	public $userId;
	public $createdAt;
}

class Invoice extends BaseModel
{
	public $tableName = "invoices";
	public $modelItem = "InvoiceItem";
	public $childrenItems = [];
	public $children = array("InvoiceDetail" => array(
		"postData" => 'invoices.details',
		"foreignKey" => "invoiceId"));

	public function validate(&$data = null)
	{
		$itemName = "Invoice";
		if (!isset($this->item->ownerId)) {
			$exception = new Exception("$itemName owner is required");
			$exception->field = "ownerId";
			throw $exception;
		}
		if (!isset($this->item->supplierDeliveryAddressId)) {
			$exception = new Exception("Supplier Delivery address is required");
			$exception->field = "supplierDeliveryAddressId";
			throw $exception;
		}
		if (!isset($this->item->supplierBankAccountId)) {
			$exception = new Exception("Supplier Bank account is required");
			$exception->field = "supplierBankAccountId";
			throw $exception;
		}

		if (!isset($this->item->date)) {
			$exception = new Exception("$itemName date is required");
			$exception->field = "date";
			throw $exception;
		}
		if (!isset($this->item->serial)) {
			$exception = new Exception("$itemName series is required");
			$exception->field = "serial";
			throw $exception;
		}
		if (!isset($this->item->number)) {
			$exception = new Exception("$itemName number is required");
			$exception->field = "number";
			throw $exception;
		}

		if (!isset($this->item->customerId)) {
			$exception = new Exception("$itemName customer is required");
			$exception->field = "customerId";
			throw $exception;
		}
		if (!isset($this->item->customerDeliveryAddressId)) {
			$exception = new Exception("$itemName delivery address is required");
			$exception->field = "customerDeliveryAddressId";
			throw $exception;
		}
		if (!isset($this->item->customerBankAccountId)) {
			$exception = new Exception("$itemName bank account is required");
			$exception->field = "customerBankAccountId";
			throw $exception;
		}
		If (isset($this->item->vatRegistred) && ($this->item->vatRegistred == 'true' || $this->item->vatRegistred == '1')) $this->item->vatRegistred = 1;

		$cmd = 'SELECT * from `' . $this->tableName . '` Where ownerId = ' . $this->item->ownerId . ' AND serial = "' . $this->item->serial . '" AND number = ' . $this->item->number . (isset($this->item->id) ? ' AND id !=' . $this->item->id : '');
		$queryResult1 = $this->db->query($cmd);
		if ($queryResult1->num_rows > 0) {
			$exception = new Exception('The ' . $itemName . ' with number: "' . $this->item->number . '" already exists!');
			$exception->field = "number";
			throw $exception;
		}
		$childrenClass = "InvoiceDetail";
		$postDataName = $this->children[$childrenClass]["postData"];
		if (!isset($this->postData->extraArgs->children->$postDataName)) {
			$exception = new Exception("$itemName details are required");
			throw $exception;
		}
		$details = $this->postData->extraArgs->children->$postDataName;
		if (count($details) === 0) {
			$exception = new Exception("$itemName details are required");
			throw $exception;
		}
		$this->childrenItems = array("InvoiceDetail" => $details);
		$validateChildren = $this->childrenValidate();
		if (!$validateChildren) return false;
		$totals = array("total" => 0, "vat" => 0);
		foreach ($this->childrenItems["InvoiceDetail"] as $detail) {
			$totals["vat"] += $detail->vatValue;
			$totals["total"] += $detail->vatValue + $detail->value;
		}
		$this->item->total = $totals["total"];
		$this->item->vatValue = $totals["vat"];
		return true;
	}

	public function sqlBuildGetAllItems($where = null, $order = null, $limit = null)
	{
		$cmd = 'SELECT a.*,
                b.name as customerName, b.nameInvariant as customerInvariant, b.county as customerCounty, b.code as customerCode, b.tradeRegister as customerTradeRegister,
                e.name as customerCountry, f.name as customerCity, b.address as customerAddress, 
                h.name as supplierDeliveryCountry,  
                i.name as supplierDeliveryCity, 
                g.account as customerBankAccount,
                c.name as customerDeliveryCountry,  
                d.name as customerDeliveryCity, 
                g.account as customerBankAccount,
                j.account as supplierBankAccount,
                j.bank as supplierBank,
                total,
                k.numeComplet as userName,
                k.CNP as userCNP,
                k.CiSeries as userCiSeries,
                k.CiNumber as userCiNumber,
                k.CiIssuedBy as userCiIssuedBy,
                k.CiDate as userCiDate
              FROM `' . $this->tableName . '` a
              LEFT JOIN `companies` b ON b.id = a.customerId
              LEFT JOIN `countries` c ON c.id = a.customerDeliveryCountryId
              LEFT JOIN `cities` d ON d.id = a.customerDeliveryCityId
              LEFT JOIN `countries` e ON e.id = b.countryId
              LEFT JOIN `cities` f ON f.id = b.cityId
				  LEFT JOIN `companies-accounts` g ON g.id = a.customerBankAccountId
				  LEFT JOIN `countries` h ON h.id = a.supplierDeliveryCountryId
              LEFT JOIN `cities` i ON i.id = a.supplierDeliveryCityId
				  LEFT JOIN `companies-accounts` j ON j.id = a.supplierBankAccountId
				  LEFT JOIN `users` k ON k.id = a.userId
';

		if (isset($where)) $cmd .= $this->sqlBuildWhere($where);
		if (isset($order)) $cmd .= $this->sqlBuildOrder($order);
		if (isset($limit)) $cmd .= " limit " . $limit;


		return $cmd;
	}

	public function getListAction($where = null, $order = null, $limit = NULL)
	{
		$where = array();
		if (isset($_REQUEST["ownerId"])) $where[] = array("field" => "ownerId", "operator" => "=", "value" => $_REQUEST["ownerId"]);
		if (isset($_REQUEST["from"])) $where[] = array("field" => "date", "operator" => ">=", "value" => $_REQUEST["from"]);
		if (isset($_REQUEST["to"])) $where[] = array("field" => "date", "operator" => "<=", "value" => $_REQUEST["to"]);
		$limit = isset($_REQUEST["limit"]) ? $_REQUEST["limit"] : null;
		$response = parent::getListAction($where, $order, $limit);
		if (!$response["status"]) return $response;
		$customers = (new Company($this->db, json_encode($this->postData)))->getListAction();
		if (!$customers["status"]) return $customers;
		$response["companies"] = $customers["data"];
		$addresses = (new CompanyAddress($this->db, json_encode($this->postData)))->getListAction();
		if (!$addresses["status"]) return $addresses;
		$response["addresses"] = $addresses["data"];
		$accounts = (new CompanyAccount($this->db, json_encode($this->postData)))->getListAction();
		if (!$accounts["status"]) return $accounts;
		$response["accounts"] = $accounts["data"];
		return $response;
	}

	public function copyFieldValue(array $fields, array $source, array &$destination)
	{
		foreach ($fields as $field) {
			$destination[$field] = isset($source[$field]) ? $source[$field] : null;
		}
	}

	public function newAction()
	{
		try {
			$response = parent::newAction();
			$ownerId = $_GET["ownerId"];
			$lastId = $this->getLastId(array("a.ownerId" => $ownerId));
			$lastItem = $this->getItemAction(array("a.id" => $lastId, "a.ownerId" => $ownerId));
			if (!$lastItem["status"]) return $lastItem;
			$fields = array("supplierDeliveryAddressId", "supplierBankAccountId", "serial");
			$this->copyFieldValue($fields, $lastItem["data"], $response["data"]);
			$ownerSrv = new Owner($this->db);
			$owner = $ownerSrv->getItemQuery($ownerId);
			$response["data"]["ownerId"] = $ownerId;
			$response["data"]["vatRegistred"] = $owner["vatRegistred"];
			$response["data"]["id"] = 0;
			$response["data"]["number"] = count($lastItem["data"]) ? (int)$lastItem["data"]["number"] + 1 : 1;
			$response["data"]["date"] = date('Y-m-d');
			$response["data"]["total"] = 0;
			$response["data"]["vatValue"] = 0;
			return $response;
		} catch (\Exception $ex) {
			return $this->catchError($ex);
		}
	}

	public function getInvoiceNumberAction()
	{
		try {
			$response = array("status" => false, "data"=>array());
			if (!isset($_GET["serial"])) throw new Exception("No serial parameter was send");
			if (!isset($_GET["ownerId"])) throw new Exception("No ownerId parameter was send");
			$lastId = $this->getLastId(array("a.ownerId" => $_GET["ownerId"], "serial" => $_GET["serial"]));
			if (is_null($lastId))  {
				$response["data"]["number"] =  1;
			} else {
				$lastItem = $this->getItemAction(array("a.id" => $lastId));
				if (!$lastItem["status"]) return $lastItem;
				$response["data"]["number"] = (int)$lastItem["data"]["number"] + 1;
			}
			$response["status"]= true;
			return $response;
		} catch (\Exception $ex) {
			return $this->catchError($ex);
		}


	}
}
