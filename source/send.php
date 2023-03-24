<?php

if (!file_exists('config.php')) {
      throw new \Exception('Create config.php based on config.sample.php.');
  }
  require 'config.php';

if (!defined('TOKEN') || !defined('CHAT_ID')) {
        throw new \Exception('Config file is invalid. Please make sure that TOKEN and CHAT_ID are defined.');
    }

$token = TOKEN;
$chat_id = CHAT_ID;

//Определяем переменные для передачи данных из нашей формы
if ($_POST['act'] == 'order') {
    $name = ($_POST['name']);
    $phone = '<a+href="tel:%2B'.$_POST['phone'].'">%2B'.$_POST['phone'].'</a>';
	$text = ($_POST['text']??'');
    $email = ($_POST['email']??'');
    // if ($_POST['email']) {
    //     $email = ($_POST['email']);
    // }

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'ID:' => uniqid(),
        'Имя:' => $name,
        'Телефон:' => $phone,
        'Почта:' => $email,
		'Текст:' => $text
    );

    // if ($email) {
    //     array_push($array, $email);
    // }

//Настраиваем внешний вид сообщения в телеграме
$txt = "";
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        echo 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
    }

//А здесь сообщение об ошибке при отправке
    else {
        echo 'Что-то пошло не так. Попробуйте отправить форму ещё раз.';
    }

}

?>
