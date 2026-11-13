<?php


if(isset($_POST["name"]) && isset($_POST["surname"])) {
  $token = getenv('TELEGRAM_BOT_TOKEN');
   
  //$chat_id = "468406344"; //личный
  // $chat_id = "-447087970"; //основная группа
   $chat_id = "-695447439"; //группа с ДЗ

	$txt = "<u>" . $_POST['name'] . " " . $_POST['surname'] . "</u>%0A";

	$txt .= "<b>" . $_POST['title'] . "</b>%0A";
	$txt .= "<b>" . $_POST['test'] . "</b>%0A";

	if($_POST['result']){
		$txt .= $_POST['result'];
	}
  
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

	if($_POST['file']){
		$upload_dir = $_SERVER['DOCUMENT_ROOT'];
		$img = $_POST['file'];
		$img = str_replace('data:image/png;base64,', '', $img);
		$img = str_replace(' ', '+', $img);
		$data = base64_decode($img);
		$file = $_POST['name'] . " " . $_POST['surname'] . " " . $_POST['title'] . " " . $_POST['test'] . ".png";
		$success = file_put_contents($file, $data);
		$url = "https://api.telegram.org/bot{$token}/sendDocument";
		$_document = $_FILES[$file]['tmp_name'];
		$document = new CURLFile(realpath($file));
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
		curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		$out = curl_exec($ch);
		curl_close($ch);
		unlink($file);
	} 
}
?>