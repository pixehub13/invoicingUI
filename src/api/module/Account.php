<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.controller.php";

class Account extends BaseController
{
	public function getUserInfoAction()
	{
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/menu-roles.php";
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/Owner.php";
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/User.php";
		$response = array();
		$response["status"] = false;
		try {
			if (!isset($_COOKIE["user-id"]) && !isset($this->postData->email)) throw new Exception("Login user");
			$email = isset($_COOKIE["user-id"]) ? $_COOKIE["user-id"] : $this->postData->email;
			$userClass = new User($this->db);
			$users = $userClass->getListAction(array("email" => $email));
			if (!$users["status"]) return $users;
			if (count($users["data"]) == 0) throw new Exception("No user found for email: " . $email);
			if ($users["data"][0]["esteActiv"] == 0) throw new Exception("Access is disabled for email: " . $email);

			$data = $users["data"][0];

			$response["data"] = $data;
			$expired = 365 * 86400 + time();
			setcookie("user-id", $email, $expired, "/");
			if ($data["esteAdmin"] === "1") $roles = array(array("id" => "admin", "name" => "admin"));
			else $roles = array(array("id" => "user", "name" => "user"));
			$menus = MenuRoles::getMenuList($roles);
			$owners = (new Owner($this->db))->getListAction();
			if (!$owners["status"]) return $owners;
//			$response["extra"] = array("menus" => $menus, "roles" => array("admin", "user"), "owners" => $owners["data"]);
			$response["menus"] = $menus;
			$response["owners"] = $owners["data"];
			$response["status"] = true;
		} catch (Exception  $error) {
			$response["errors"] = $error->getMessage();
			$response["status"] = false;
		}
		$response["extra"]["version"] = APP_VERSION;
		return $response;
	}

	public function loginAction()
	{
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/User.php";
		$response = array();
		try {
			if (!$this->postData->email) throw new Exception("No email provided");
			if (!$this->postData->parola) throw new Exception("Nu e parolaaaaa");
			$userObj = new User($this->db, null);
			$users = $userObj->getUserByEmailAndPassword($this->postData->email, $this->postData->parola);
			if (!$users["status"] || count($users["data"]) != 1) throw new Exception("No user found for email and password provided!");
			$expired = 365 * 86400 + time();
			setcookie("user-id", $this->postData->email, $expired, "/");
			return $this->getUserInfoAction();
		} catch (Exception  $error) {
			$response["errors"] = $error->getMessage();
			$response["status"] = false;
		}
		$response["extra"]["version"] = APP_VERSION;
		return $response;
	}

	public function logoffAction()
	{
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/User.php";
		$response = array();
		try {
			setcookie("user-id", null, 1 + time(), "/");
			unset($_COOKIE["user-id"]);
			return array("status" => true);
		} catch (Exception  $error) {
			$response["errors"] = $error->getMessage();
			$response["status"] = false;
		}
		$response["extra"]["version"] = APP_VERSION;
		return $response;
	}

	private function sendResetPassEmail($userEmail, $userName, $guid)
	{
		global $email;
		$email["Subject"] = "Resetare parola Invoicng app pt. " . $userName;
		$email["To"] = array("email" => $userEmail, "name" => $userName);
		$email["MsgHTML"] = "";
		$email["MsgHTML"] .= "<br>Utilizeaza acest link (numai cu Chrome browser pt. desktop) ptr. resetare parola:<br> ";
		$email["MsgHTML"] .= "{$_SERVER['HTTP_REFERER']}#!/resetare-parola?id=$guid";
		$email["MsgHTML"] .= "<br>Atentie: linkul este valabil o singura data!";
		$email["MsgHTML"] .= "<br>Daca ai probleme cu logarea (sau aplicatia), contacteaza-ma la adresa de email bogdanim36@gmail.com, sau prin telefon la 0730740392.";

		return sendMail();

	}

	public function resetPasswordAction()
	{
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/User.php";
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/send-email.php";
		$response = array();
		try {
			if (!isset($this->postData->{"email"})) throw new Exception("No email provided");
			$userEmail = $this->postData->email;
			$guid = guidv4();
			$userObj = new User($this->db);
			$user = $userObj->getItemAction(array("email" => $userEmail));
			if ($user["status"] && count($user["data"])) {
				$user["data"]["resetLink"] = $guid;
				$updateResponse = $userObj->updateAction(false, $user["data"]);
				if (!$updateResponse["status"]) return $updateResponse;
				$userName = $updateResponse["data"]["numeComplet"];
				$response = $this->sendResetPassEmail($userEmail, $userName, $guid);
				if (!$response["status"]) return $response;
				$response = array("status" => true);
			} else {
				throw new Exception("No user found for " . $userEmail);
			}
		} catch (Exception  $error) {
			$response["errors"] = $error->getMessage();
			$response["status"] = false;
		}
		return $response;
	}

	public function savePasswordAction()
	{
		require_once $_SERVER["DOCUMENT_ROOT"] . "/api/module/User.php";
		try {
			if (!isset($this->postData->id)) throw new Exception("No id provided");
			if (!isset($this->postData->parola)) throw new Exception("No password provided");
			$userObj = new User($this->db);
			$response = $userObj->savePassword($this->postData->id, $this->postData->parola);
			if (!$response["status"]) {
				return array("status" => false, "errors" => "Link isn't valid one. Reset again your password");
			}
			$this->postData->email = $response["data"]["email"];
			$this->postData->parola = $response["data"]["parola"];
			return $this->loginAction();
		} catch (Exception  $error) {
			$response = array();
			$response["errors"] = $error->getMessage();
			$response["status"] = false;
		}
		return $response;
	}
}