<?php

class BaseController
{
   public $modelClass;
   public $db;
   public $postData;

   public function __construct($dbConnection, $postData = "[]")
   {
      $this->db = $dbConnection;
      $this->postData = json_decode($postData, false);
   }

   public function getServerRoot()
   {
      return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != "off" ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/';
   }

   public function action($action)
   {
      $action .= "Action";
      return $this->$action();
   }
   public function catchError(Exception $error)
	{
		$response = array();
		$field = isset($error->field) ? $error->field : "";
		$response["errors"] = [$field => [$error->getMessage()]];
		$response["status"] = false;
		return $response;
	}
	public function setOkResponse($data)
	{
		$response = array();
		$response["data"] = $data;
		$response["status"] = true;
		return $response;
	}
}
