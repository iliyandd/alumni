<?php

require_once '../db/database.php';
require_once 'handlers/memberHandler.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $db = new Database();
        $connection = $db->getConnection();
        $memberHandler = new MemberHandler($connection, 'GET');

        $memberHandler->action(isset($_GET['username']) ? $_GET['username'] : null);
    } catch (PDOException $err) {
        echo $err->getMessage();
        http_response_code(500);
        exit(json_encode(
            [
                'status' => 'error',
                'message' => 'Възникна грешка с базата!',
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $parameters = file_get_contents('php://input');
    $data = json_decode($parameters, true);

    try {
        $db = new Database();
        $connection = $db->getConnection();
        $memberHandler = new MemberHandler($connection, 'POST', $data);

        $memberHandler->action();
    } catch (PDOException $err) {
        echo $err->getMessage();
        http_response_code(500);
        exit(json_encode(
            [
                'status' => 'error',
                'message' => 'Възникна грешка с базата!',
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }
}
