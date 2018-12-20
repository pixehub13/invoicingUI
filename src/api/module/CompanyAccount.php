<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Company.php";

class CompanyAccountItem extends ModelItem
{
   public $id;
   public $name;
   public $bank;
   public $account;
   public $companyId;
}

class CompanyAccount extends BaseModel
{
   public $tableName = "companies-accounts";
   public $modelItem = "CompanyAccountItem";

   public function sqlBuildGetAllItems($where=null, $order = null, $limit = NULL)
   {
      $cmd = 'SELECT a.*,
                b.name as company, b.nameInvariant as companyInvariant 
              FROM `' . $this->tableName . '` a
              LEFT JOIN `companies` b ON b.id = a.companyId';
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
			$response["status"] = true;
			return $response;
		} catch (Exception  $error) {
			return $this->catchError($error);
		}

	}

   public function validate(&$data=null)
   {
      $itemName = "Company Account";
      if (is_null($data)) $item=$this->item;
      else $item = json_decode(json_encode($data), FALSE);
      if (!isset($item->companyId)) {
         $exception = new Exception("Company is required");
         $exception->field = "companyId";
         throw $exception;

      }
      if (!isset($item->name)) {
         $exception = new Exception("$itemName name/alias is required");
         $exception->field = "name";
         throw $exception;
      }
      if (!isset($item->bank)) {
         $exception = new Exception("$itemName bank is required");
         $exception->field = "bank";
         throw $exception;
      }
      if (!isset($item->account)) {
         $exception = new Exception("$itemName account is required");
         $exception->field = "account";
         throw $exception;
      }

      return true;
   }

}
