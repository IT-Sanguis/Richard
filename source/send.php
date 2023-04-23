<?php

if (!file_exists('config.php')) {
    throw new \Exception('Create config.php based on config.sample.php.');
}

require 'config.php';

if (!defined('TOKEN') || !defined('CHAT_ID')) {
    throw new \Exception('Config file is invalid. Please make sure that TOKEN and CHAT_ID are defined.');
}

header('Content-Type: application/json; charset=utf-8');

// if (function_exists('curl_version')) {
//     throw new \Exception('cURL is enabled.');
// } else {
//     throw new \Exception('cURL is not enabled.');
// }

mb_internal_encoding('UTF-8'); // Установка внутренней кодировки в UTF-8
// mb_http_output('UTF-8'); // Установка кодировки UTF-8 входных данных HTTP-запроса
// mb_http_input('UTF-8'); // Установка кодировки UTF-8 выходных данных HTTP-запроса
// mb_regex_encoding('UTF-8'); // Установка кодировки UTF-8 для многобайтовых регулярных выражений

$token = TOKEN;
$chat_id = CHAT_ID;

$limit_phone_length = 11;
$min_name_length = 2;
$max_name_length = 80;

$error = false;


if ($_SERVER["REQUEST_METHOD"] == "POST" && empty($_POST['email_address']) && !empty($_POST['name']) && !empty($_POST['phone'])) {  //email_address - Honeypot Captcha

    function formatting_input($data) {
        $data = trim($data);
        // $data = htmlspecialchars($data, ENT_SUBSTITUTE);
        $data = htmlspecialchars($data, ENT_QUOTES);
        // $data = addslashes($data);
        // $data = htmlentities($data, ENT_QUOTES, "UTF-8");
        // $data = rawurlencode($data);
        $data = urlencode($data);
        return $data;
    }

    $name = preg_replace("/[^a-zA-Zа-яА-ЯёЁ\s\-'()]+/u", '', $_POST['name']);
    // $name = preg_replace("/[^\p{L}\s'-()]+/u", "", $_POST["name"]);
    $name = trim($name);
    $name = str_replace("H", "%48", $name); //Костыль для решения проблемы с заглавной H (форма не отправлялась, если H первая буква)
    // $name = trim($_POST['name']);


    // if (strlen($name) < $min_name_length) {
    if (mb_strlen($name, 'utf-8') < $min_name_length) {
        $message = 'Слишком короткое имя.';
        $error = true;
    }

    // if (strlen($name) > $max_name_length) {
    if (mb_strlen($name, 'utf-8') > $max_name_length) {
        $message = 'Указанное имя слишком длинное.';
        $error = true;
    }

    $phone = preg_replace('/\D/', '', $_POST['phone']);

    if (substr($phone, 0) == '8') {
        $phone = '7'.substr($phone, 0);
    }

    if (strlen($phone) != $limit_phone_length) {
        $message = 'Номер телефона должен содержать 11 цифр.';
        $error = true;
    }

    $phone = '<a+href="tel:%2B'.$phone.'">%2B'.$phone.'</a>';
    // $phone = '<a+href="tel:+'.$phone.'">+'.$phone.'</a>';
    // $phone = "&lt;a+href='tel:%2B'.$phone.''&gt;%2B'.$phone.'&lt;/a&gt;";
    // $phone = "[+".$phone."](tel:+".$phone.")"; //Markdown
	$text = formatting_input($_POST['text']??'');
    $email= filter_var($_POST['email']??'', FILTER_VALIDATE_EMAIL);

    $arr = array(
        'ID:' => uniqid(),
        'Имя:' => $name,
        'Телефон:' => $phone,
        'Почта:' => $email,
		'Текст:' => $text
    );

    $txt = "";
    foreach($arr as $key => $value) {
        // $txt .= "<b>".$key."</b> ".$value."\n";
        $txt .= "<b>".$key."</b> ".$value."%0A";
        // $txt .= "*".$key."* ".$value."\n"; //Markdown
    };

    // $encoded_txt = urlencode($txt);



    if (!$error) {
        // $params = array(
        //     'chat_id' => $chat_id, // id получателя
        //     'text' => $txt, // текст сообщения
        //     // 'text' => $encoded_txt, // текст сообщения
        //     // 'parse_mode' => 'html', // режим отображения сообщения HTML
        //     'parse_mode' => 'Markdown', // режим отображения сообщения HTML
        // );

        // $curl = curl_init(); // инициализируем cURL с настройками
        // curl_setopt($curl, CURLOPT_HEADER, false);
        // curl_setopt($curl, CURLOPT_URL, "https://api.telegram.org/bot{$token}/sendMessage"); // адрес вызова api функции телеграм
        // // curl_setopt($curl, CURLOPT_POST, true); // отправка методом POST
        // curl_setopt($curl, CURLOPT_POST, 1);
        // curl_setopt($curl, CURLOPT_TIMEOUT, 10); // время выполнения запроса
        // // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        // curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        // // curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        // // curl_setopt($curl, CURLOPT_POSTFIELDS, $params); // параметры запроса
        // curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));
        // $sendToTelegram = curl_exec($curl); // запрос к api
        // curl_close($curl); // закрываем cURL сессию


        $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
        // $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$encoded_txt}","r");

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

    echo json_encode($response);
}
?>
