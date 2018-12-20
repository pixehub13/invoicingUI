<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/base.controller.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/api/SendEmailMessage.php";

class Export extends BaseController
{

	private function createFile($output, $file)
	{
		$file_to_save = $_SERVER["DOCUMENT_ROOT"] . $file;
		file_put_contents($file_to_save, $output);
		header('Content-type: application/pdf');
		header('Content-Disposition: inline; filename="' . basename($file) . '"');
		header('Content-Transfer-Encoding: binary');
		header('Content-Length: ' . filesize($file_to_save));
		header('Accept-Ranges: bytes');
		readfile($file_to_save);
	}

	private function pdfGetHtml()
	{
		return $this->postData->html;
		return "
	<table class=\"details\" style=\"font: 20px/4 Arial, sans-serif;border-bottom:1px solid black \">
	
	<tbody>
	<tr role=\"titles\" row-index=\"1\" style=\"height: 30px;\">
		<td style=\"width:30px;text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\"></td>
		<td style=\"width:220px;text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\">Descriere</td>
		<td style=\"width: 40px; text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\">U.M.</td>
		<td style=\"width: 45px; text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\">TVA%</td>
		<td style=\"width: 80px;text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\">Cantitatea</td>
		<td style=\"width: 80px; text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\">Pret Unitar</td>
		<td style=\"width: 80px; text-align: center; font-weight: bold; vertical-align: middle; border-top: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black;\">Valoarea</td>
		<td style=\"width: 80px; text-align: center; font-weight: bold; vertical-align: middle; border: 1px solid black; border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black;\">Valoarea TVA</td>
	</tr>
	<tr style=\"mso-outline-level:2\">
		<td  style=\"width: 30px; border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; text-align: right; vertical-align: top;\">1</td>
		<td  style=\"width:220px;border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; vertical-align: top;\">Servicii cf. contract 152/2018, 17-30 sept. 2018</td>
		<td style=\"width: 40px; border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; vertical-align: top;\">EUR</td>
		<td style=\" width: 45px; border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; text-align: right;vertical-align: top;\">0</td>
		<td style=\"width: 80px;border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; text-align: right;  vertical-align: top;\">1.500</td>
		<td style=\"width: 80px; border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; text-align: right; vertical-align: top;\">4,6555</td>
		<td style=\"width: 80px; border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; text-align: right; vertical-align: top;\">6.983,25</td>
		<td style=\"width: 80px; border-left: 1px solid lightgray; padding: 1px 2px 1px 6px; text-align: right; vertical-align: top;\">0,00</td>
	</tr>
	<tr class=\"group-footer\" style=\"height: 26px; line-height: 20px; font-size: 16px;\">
		<td class=\"last-column\" column-for=\"Grouping\" colspan=\"1\" style=\"border-left: 1px solid lightgray; padding: 1px; vertical-align: top;\"></td>
		<td class=\"group-footer\" column-for=\"Descriere\" colspan=\"5\" style=\"border-left: 1px solid lightgray; padding: 1px 10px 1px 1px; vertical-align: top; font-weight: bold; text-align: right;\"></td>
		<td class=\"footer-calculation\" column-for=\"Valoarea\" colspan=\"1\" style=\"border-left: 1px solid lightgray; padding: 1px; vertical-align: top; text-align: right; font-weight: bold;\">6.983,25</td>
		<td class=\"footer-calculation\" column-for=\"Valoarea TVA\" colspan=\"1\" style=\"border-left: 1px solid lightgray; padding: 1px; vertical-align: top; text-align: right; font-weight: bold;\">0,00</td>
	</tr>
	<tr class=\"group-footer\" style=\"height: 26px; line-height: 20px; font-size: 16px;\">
		<td class=\"last-column\" column-for=\"Grouping\" colspan=\"1\" style=\"border-left: 1px solid lightgray; padding: 1px; vertical-align: top;\"></td>
		<td class=\"group-footer\" column-for=\"Descriere\" colspan=\"6\" style=\"border-left: 1px solid lightgray; padding: 1px 10px 1px 1px; vertical-align: top; font-weight: bold; text-align: right;\">TOTAL DE PLATA</td>
		<td class=\"footer-calculation\" column-for=\"Valoarea TVA\" colspan=\"1\" style=\"border-left: 1px solid lightgray; padding: 1px; vertical-align: top; text-align: right; font-weight: bold;\">6.983,25</td>
	</tr>
	</tbody>
</table>";

	}

	public function pdfAction()
	{
		$title = isset($this->postData->title) ? $this->postData->title : "Export";
		$fileName = isset($this->postData->fileName) ? $this->postData->fileName : "export";
		require_once $_SERVER["DOCUMENT_ROOT"] . '/api/vendor/tcpdf/tcpdf.php';
		require_once $_SERVER["DOCUMENT_ROOT"] . '/api/vendor/tcpdf/config/tcpdf_config.php';
		$pdf = new TCPDF('P', PDF_UNIT, 'A4', true, 'UTF-8', false, true);

// set document information
		$pdf->SetCreator(PDF_CREATOR);
		$pdf->SetAuthor('invoicing@spark36.net');
		$pdf->SetTitle($title);

// set default header data
//		$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE . ' 006', PDF_HEADER_STRING);

// set header and footer fonts
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
//		$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//		$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
		$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
		$pdf->SetMargins(19, 10, 5, 00);
		$pdf->SetHeaderMargin(0);
		$pdf->SetFooterMargin(0);

// set auto page breaks
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
		$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//		if (@file_exists(dirname(__FILE__) . '/lang/eng.php')) {
//			require_once(dirname(__FILE__) . '/lang/eng.php');
//			$pdf->setLanguageArray($l);
//		}
		$pdf->SetFont('arial', '', 10);
// add a page
		$pdf->AddPage();

		$html = $this->pdfGetHtml();
		$pdf->writeHTML($html, true, false, false, false, 'L');

// reset pointer to the last page
		$pdf->lastPage();
//Close and output PDF document
		$preferences = array(
			'HideToolbar' => true,
			'HideMenubar' => false,
			'HideWindowUI' => true,
			'FitWindow' => true,
			'CenterWindow' => true,
			'DisplayDocTitle' => true,
			'NonFullScreenPageMode' => 'UseNone', // UseNone, UseOutlines, UseThumbs, UseOC
			'ViewArea' => 'TrimBox', // CropBox, BleedBox, TrimBox, ArtBox
			'ViewClip' => 'TrimBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintArea' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintClip' => 'CropBox', // CropBox, BleedBox, TrimBox, ArtBox
			'PrintScaling' => 'AppDefault', // None, AppDefault
			'Duplex' => 'DuplexFlipLongEdge', // Simplex, DuplexFlipShortEdge, DuplexFlipLongEdge
			'PickTrayByPDFSize' => true,
			'PrintPageRange' => array(1, 1, 2, 3),
			'NumCopies' => 1
		);

// Check the example n. 60 for advanced page settings

// set pdf viewer preferences
		$pdf->setViewerPreferences($preferences);

		$filePath = 'export/' . $fileName . '-' . uniqid() . '.pdf';
		if (isset($this->postData->noDownload) && $this->postData->noDownload) {
			$filePath = normalizePath($_SERVER["DOCUMENT_ROOT"] . $filePath);
			$file = $pdf->Output($filePath, 'F');
			return array("status" => true, "tmpPath" => $filePath);
		} else {
			$response = $pdf->Output($filePath, 'I');
			exit();
		}

	}

	public function emailAction()
	{
		global $email;
		$data = $_POST;
		$mail = new SendEmailMessage();
		$mail->AddToList($data["to"]);
//		$mail->setFrom($email['From']["email"], $email['From']["name"]);
		$mail->setFrom($data["from"]);
		$mail->setSender($data["from"]);
		$mail->Subject = $data["subject"];
		$mail->HtmlBody = $data["message"];

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
					"size" => $files["size"][$key]);
				$mail->addAttachment($file["tmpPath"], $file["name"]);
			}
		}
		if (isset($data["remoteAttachments"])) {
			foreach ($data["remoteAttachments"] as $file) {
				$mail->addAttachment($file["tmpPath"], $file["name"]);
			}
		}
		try {
			$response = $mail->send();
			if ($response == "OK") return array("status" => true);
			else return array("status" => false, "message" => $response);
		} catch (Exception $error){
			return $this->catchError($error);
		}

	}
}