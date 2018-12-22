<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.model.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Company.php";

class OwnerItem extends ModelItem
{
	public $id;
	public $companyId;
	public $socialCapital;
	public $vatPercentsList;
	public $stampPath;
	public $logoPath;
	public $vatRegistred;
	public $contactPhone;
	public $contactEmail;
	public $currencies;
}

class Owner extends BaseModel
{
	public $tableName = "owners";
	public $modelItem = "OwnerItem";

	public function sqlBuildGetAllItems($where = null, $order = null, $limit = NULL)
	{
		$cmd = 'SELECT a.*,
                b.name, b.nameInvariant, b.address,
                b.administratorName, code, tradeRegister,
                d.name as city, d.nameInvariant as cityInvariant,
                b.county,   
                c.name as country, c.nameInvariant as countryInvariant 
              FROM `' . $this->tableName . '` a
              LEFT JOIN `companies` b ON b.id = a.companyId
              LEFT JOIN countries c on c.id = b.countryId
				  LEFT JOIN cities d on d.id = b.cityId';

		if (isset($where)) $cmd .= $this->sqlBuildWhere($where);
		return $cmd;
	}

	public function getListAction($where = null, $order = null, $limit = NULL)
	{
		$response = parent::getListAction($where, $order);
		if (!$response["status"]) return $response;
		$companies = (new Company($this->db, json_encode($this->postData)))->getListAction();
		if (!$companies["status"]) return $companies;
		$response["companies"] = $companies["data"];
		return $response;
	}

	public function validate(&$data = null)
	{
		$itemName = "Owner";
		if (!isset($this->item->companyId)) {
			$exception = new Exception("Company is required");
			$exception->field = "companyId";
			throw $exception;
		}
		if (!isset($this->item->currencies)) {
			$exception = new Exception("Currencies is required");
			$exception->field = "currencies";
			throw $exception;
		}
		If (isset($this->item->stampPath)) $this->item->stampPath = explode("?", $this->item->stampPath)[0];
		If (isset($this->item->logoPath)) $this->item->logoPath = explode("?", $this->item->logoPath)[0];
		If (isset($this->item->vatRegistred) && ($this->item->vatRegistred == 'true' || $this->item->vatRegistred == '1')) $this->item->vatRegistred = 1;
		return $this->uploadFiles();
	}

	public function uploadFiles()
	{
		if (!realpath(UPLOAD_DIR)) return array("status" => false, "message" => "No upload directory exist: " . UPLOAD_DIR);
		if ($_FILES) {
			$files = isset($_FILES["files"]) ? $_FILES["files"] : (isset($_FILES["file"]) ? $_FILES["file"] : []);
			$error = false;
			foreach ($files["name"] as $key => $name) {
				if ($files["error"][$key] == 0) continue;
				$error = true;
			}
			if ($error) {
				$response["status"] = false;
				$response["message"] = "Error uploading files. Check upload directory rights acces and upload max limit size!";
				return $response;
			}
			foreach ($files["name"] as $key => $name) {
				$file = array("name" => $name,
					"tmpPath" => $files["tmp_name"][$key],
					"type" => $files["type"][$key],
					"size" => $files["size"][$key],
					"category" => $this->postData->filesMap[$key]);
				$result = $this->moveFile($file);
				if ($result["status"]) {
					$this->item->{$file["category"] . 'Path'} = "/upload/" . $result["name"];
				} else return $result;
			}
		}
		return true;
	}

	public function moveFile($file)
	{
		$fileNameParts = explode(".", $file["name"]);
		$ext = '.' . $fileNameParts[count($fileNameParts) - 1];
		$file["storedName"] = $file["category"] . "-" . $this->item->companyId . $ext;
		$file["storedPath"] = realpath(UPLOAD_DIR) . '/' . $file["category"] . "-" . $this->item->companyId . $ext;
		normalizePath($file["storedPath"]);
		$response = rename($file["tmpPath"], $file["storedPath"]);
		if (!$response) return array("status" => false, "message" => "File " . $file["name"] . "couldn't be uploaded!");
		else return array("status" => true, "path" => $file["storedPath"], 'name' => $file["storedName"]);
	}

}
