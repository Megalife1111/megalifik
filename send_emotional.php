<?php


if(isset($_POST["name"])) {

    $token = getenv('TELEGRAM_BOT_TOKEN');
  //  $chat_id = "468406344";
    $chat_id = "-447087970";

 	$txt = "<b>Дневник по эмоциональному интеллекту</b>%0A";
 	$txt .= "<b>Дата: </b> " . $_POST['date'] . "%0A";
	$txt .= "<b>Фамилия Имя: </b> " . $_POST['name'] . "%0A";
	$txt .= "<b>Мои эмоции за день: </b> " . $_POST['title'] . "%0A";
	$txt .= "<b>Мои достижения за день: </b> " . $_POST['amount'];
    
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
}
?>