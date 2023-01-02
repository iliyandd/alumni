<?php

require_once '../db/database.php';
require_once 'handlers/eventHandler.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $db = new Database();
        $connection = $db->getConnection();
        $eventHandler = new EventHandler($connection, 'GET');

        $result = $eventHandler->action(isset($_GET['id']) ? $_GET['id'] : null);
        if ($result === null) {
            http_response_code(400);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' => 'Възникна грешка при извличането на събития!',
                    'result' => [],
                ],
                JSON_UNESCAPED_UNICODE
            ));
        } else {
            http_response_code(200);
            exit(json_encode(
                [
                    'status' => 'success',
                    'message' => 'Успешно извличане на събитията!',
                    'result' => $result,
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }
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
        $eventHandler = new EventHandler($connection, 'POST', $data);

        if ($eventHandler->action()) {
            http_response_code(201);
            exit(json_encode(
                [
                    'status' => 'success',
                    'message' => 'Успешно създадохте събитие!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        } else {
            http_response_code(400);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' => 'Възникна грешка при създаването на събитие!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }
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
} elseif ($_SERVER["REQUEST_METHOD"] === 'DELETE') {
    $parameters = file_get_contents('php://input');
    $data = json_decode($parameters, true);

    try {
        $db = new Database();
        $connection = $db->getConnection();
        $eventHandler = new EventHandler($connection, 'DELETE', $data);

        if ($eventHandler->action()) {
            http_response_code(204);
            exit(json_encode(
                [
                    'status' => 'success',
                    'message' => 'Успешно изтрихте събитие!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        } else {
            http_response_code(400);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' => 'Възникна грешка при изтриването на събитие!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }
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
