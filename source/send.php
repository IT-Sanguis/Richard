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

$error = false;


if ($_SERVER["REQUEST_METHOD"] == "POST" && empty($_POST['email_address']) && !empty($_POST['name']) && !empty($_POST['phone'])) {  // Honeypot Captcha

    function formatting_input($data) {
        $data = trim($data);
        $data = htmlspecialchars($data);
        return $data;
    }


    // if (!preg_match("/^[a-zA-Z-'() ]*$/",$name)) {
    //     throw new \Exception('Name contains invalid characters.');
    //   }

    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     throw new \Exception('Invalid email format');
    // }


    $name = formatting_input($_POST['name']);

    if (empty($name)) {
        $message = 'Проверьте указанное имя.';
        $error = true;
        // exit();
    }

    if (strlen($name) > 60) {
        $message = 'Указанное имя слишком длинное.';
        $error = true;
        // exit();
    }

    $phone = preg_replace('/\D/', '', $_POST['phone']);

    if (substr($phone, 0) == '8') {
        $phone = '7'.substr($phone, 0);
    }

    // if (empty($phone)) {
    //     $message = 'Проверьте номер телефона.';
    //     $error = true;
    //     // exit();
    // }

    if (strlen($phone) != 11) {
        $message = 'Номер телефона должен содержать 11 цифр.';
        $error = true;
        // exit();
    }

    $phone = '<a+href="tel:%2B'.$phone.'">%2B'.$phone.'</a>';
	$text = formatting_input($_POST['text']??'');
    $email = formatting_input($_POST['email']??'');

    $arr = array(
        'ID:' => uniqid(),
        'Имя:' => $name,
        'Телефон:' => $phone,
        'Почта:' => $email,
		'Текст:' => $text
    );

    $txt = "";
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    if (!$error) {
        $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

        if ($sendToTelegram) {
            $error = false;
            $message = 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
        }

        else {
            $error = true;
            $message = 'Какие-то проблемы с сервером.';
        }
    }

    $response = array('error' => $error, 'message' => $message);
    // header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
}

?>
