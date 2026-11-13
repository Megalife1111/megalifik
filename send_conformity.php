<?php


if(isset($_POST["name"]) && isset($_POST["surname"])) {

		$title = $_POST['title'];
    $time = $_POST['time'];
    $test1 = $_POST['test1'];
    $token = getenv('TELEGRAM_BOT_TOKEN');
   // $chat_id = "468406344";
    $chat_id = "-447087970";

		$txt = "<u>" . $_POST['name'] . " " . $_POST['surname'] . "</u>%0A";
		$txt .= "<b>Найти соответствие " . $_POST['title'] . "</b>%0A";

    $txt .= "<b>Время: </b> " . $_POST['full_time'] . "%0A";
		$txt .= "<b>Верно: </b> " . $_POST['result'];

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
}
?>