<?php


if(isset($_POST["name"]) && isset($_POST["surname"])) {

    $token = getenv('TELEGRAM_BOT_TOKEN');
  //  $chat_id = "468406344";
    $chat_id = "-447087970";

	$txt = "<u>" . $_POST['name'] . " " . $_POST['surname'] . "</u>%0A";
	$txt .= "<b>Тест на зрительную память</b>%0A";
	$txt .= $_POST['result'];
    
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
}
?>