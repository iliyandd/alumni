<?php

require_once '../db/database.php';
require_once '../models/user.php';
require_once 'handlers/loginHandler.php';

// init
$parameters = file_get_contents('php://input');
$data = json_decode($parameters, true);

$db = new Database();
$connection = $db->getConnection();
$loginHandler = new LoginHandler($connection, $user);

try {
} catch (PDOException $err) {
    http_response_code(500);
    exit(json_encode(
        [
            'status' => 'error',
            'message' => 'Възникна грешка при вписването!',
        ],
        JSON_UNESCAPED_UNICODE
    ));
}
