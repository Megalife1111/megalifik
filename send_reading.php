<?php


if(isset($_POST["name"]) && isset($_POST["surname"]) ) {

    $token = getenv('TELEGRAM_BOT_TOKEN');
  //  $chat_id = "468406344";
    $chat_id = "-447087970";

		$txt = "<u>" . $_POST['name'] . " " . $_POST['surname'] . "</u>%0A";

		if($_POST['tel']){
			$txt .= "<b>Номер телефона: </b> " . $_POST['tel'] . "%0A";
		}

		$txt .= "<b>Проверка скорости чтения</b>%0A";
		$txt .= "<b>" . $_POST['title'] . "</b>%0A";
    
    $txt .= "<b>Время: </b> " . $_POST['time'] . " секунд%0A";

		if($_POST['speed']){
			$txt .= "<b>Скорость: </b> " . $_POST['speed'] . " слов в минуту%0A";
		}

		if($_POST['result']){
			if($_POST['text']){
				$txt .= "<b>Результаты:</b> " . $_POST['result'] . "%0A";
			}else{
				$txt .= "<b>Верно: </b> " . $_POST['result'] . "%0A";
			}
		}

    $txt .= $_POST['sign_up'];

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
}
?>