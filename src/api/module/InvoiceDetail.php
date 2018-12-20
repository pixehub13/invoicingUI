<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Invoice.php";

class InvoiceDetailItem extends ModelItem
{
	public $id;
	public $invoiceId;
	public $position;
	public $description;
	public $quantity;
	public $unit;
	public $price;
	public $value;
	public $vat;
	public $vatValue;
	public $discount;
	public $discountValue;
}

class InvoiceDetail extends BaseModel
{
	public $tableName = "invoices-details";
	public $modelItem = "InvoiceDetailItem";
	public $foreignKey = "invoiceId";
	public $validateOnWrite = false;

	public function sqlBuildGetAllItems($where = null, $order = null, $limit = NULL)
	{
		$cmd = "SELECT a.* 
                 FROM `{$this->tableName}` a";
		if (isset($where)) $cmd .= $this->sqlBuildWhere($where);
		return $cmd;
	}

	public function getListAction($where = null, $order = null, $limit = NULL)
	{
		try {
			if (isset($_REQUEST["invoiceId"]) && !isset($where["invoiceId"])) {
				$where["invoiceId"] = $_REQUEST["invoiceId"];
			}
			$cmd = $this->sqlBuildGetAllItems($where, $order);
			if (!isset($where["invoiceId"])) {
				throw  new Exception("invoiceId query parameter needed");
			}
			$invoiceId = $where["invoiceId"];
			$queryResult = $this->db->query($cmd);
			$response = array();
			$response["data"] = $queryResult->rows;
			$invoice = (new Invoice($this->db))->getItemAction(array("a.id" => $invoiceId));
			if (!$invoice["status"]) return $invoice;
			if (count($invoice["data"])) {
				$customerId = $invoice["data"]["customerId"];
				$response["descriptions"] = $this->getDetailsDescriptions($customerId);
				$response["emailTemplates"] = $this->getEmailTemplates($customerId);
			} else $response["descriptions"] = array();

			$response["status"] = true;

			return $response;
		} catch (Exception  $error) {
			return $this->catchError($error);
		}
	}

	private function getEmailTemplates($companyId)
	{
		$cmd = "SELECT a.* 
				From `companies-email-templates` as a 
				WHERE a.companyId = $companyId
				ORDER BY a.name ";
		$queryResult = $this->db->query($cmd );
		return $queryResult->rows;
	}
	private function getDetailsDescriptions($customerId)
	{
		$cmd = "SELECT a.description, i.date, i.number 
				From `invoices-details` as a 
				JOIN invoices i on a.invoiceId = i.id
				WHERE i.customerId = $customerId 
					AND description != ''
				ORDER BY i.number DESC, a.description";
		$queryResult = $this->db->query($cmd);
		return $queryResult->rows;
	}

	public function getDescriptionsAction()
	{
		try {
			if (!isset($_REQUEST["invoiceId"])) throw new \Exception("No invoice id provided");
			if (!isset($_REQUEST["customerId"])) throw new \Exception("No invoice id provided");
			$invoiceId = $_REQUEST["invoiceId"];
			$customerId = $_REQUEST["customerId"];
			$data = $this->getDetailsDescriptions($customerId, $invoiceId);
			$response["data"] = $data;
			$response["status"] = true;
			return $response;
		} catch (Exception  $error) {
			return $this->catchError($error);
		}
	}

	private function addError($field = null, $message)
	{
		if (isset($field)) {
			if (!isset($this->errors->$field)) $this->errors->$field = array();
			$error = $this->errors->$field;
			$error[] = $message;
			$this->errors->$field = $error;
		} else {
			if (!isset($this->errors->{''})) $this->errors->{''} = array();
			$this->errors->{''}[] = $message;
		}
		$this->hasErrors = true;
	}

	public function validate(&$data = null)
	{
		$this->errors = new stdClass();
		$this->hasErrors = false;
		$item = isset($data) ? $data : $this->item;
		if (!isset($item->position)) {
			$this->addError("position", "Field is required");
		}
		$item->value = round($item->price * $item->quantity, 2);
		return !$this->hasErrors;
	}

}
