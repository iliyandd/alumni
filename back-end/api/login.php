<?php

require_once '../db/database.php';
require_once 'handlers/loginHandler.php';

// init
$parameters = file_get_contents('php://input');
$data = json_decode($parameters, true);


try {
    $db = new Database();
    $connection = $db->getConnection();
    $loginHandler = new LoginHandler($connection, $data['email'], $data["password"]);

    if ($user = $loginHandler->action()) {
        session_start();
        $_SESSION['user'] = $user->toJson(true);

        http_response_code(200);
        exit(json_encode(
            ['status' => 'success', 'message' => 'Успешно вписване!'],
            JSON_UNESCAPED_UNICODE
        ));
    } else {
        http_response_code(404);
        exit(json_encode(
            ['status' => 'error', 'message' => 'Не съществува потребител с такъв имейл и парола!'],
            JSON_UNESCAPED_UNICODE
        ));
    }
} catch (PDOException $err) {
    echo $err->getMessage();
    http_response_code(500);
    exit(json_encode(
        [
            'status' => 'error',
            'message' => 'Възникна грешка при вписването!',
        ],
        JSON_UNESCAPED_UNICODE
    ));
}
