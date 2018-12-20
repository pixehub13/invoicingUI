<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Company.php";

class CompanyEmailItem extends ModelItem
{
   public $id;
   public $name;
   public $email;
   public $companyId;
}

class CompanyEmail extends BaseModel
{
   public $tableName = "companies-emails";
   public $modelItem = "CompanyEmailItem";

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
			$cmd .= ' Order By a.companyId, a.name ';
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
      $itemName = "Company Email";
      if (!isset($this->item->companyId)) {
         $exception = new Exception("Company is required");
         $exception->field = "companyId";
         throw $exception;

      }
      if (!isset($this->item->name)) {
         $exception = new Exception("$itemName name/alias is required");
         $exception->field = "name";
         throw $exception;
      }
      if (!isset($this->item->email)) {
         $exception = new Exception("$itemName email is required");
         $exception->field = "email";
         throw $exception;
      }
      return true;
   }

}
