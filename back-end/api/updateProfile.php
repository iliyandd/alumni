<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once '../aws/s3.php';

    if (isset($_FILES['profile_picture'])) {
        $s3 = new S3();
        $s3->putObject('profile_pictures/', $_FILES['profile_picture']['tmp_name'], $_FILES['profile_picture']['name']);
    }

    header('Location: ../../front-end/profile/Profile.html');
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    require_once '../db/database.php';
    require_once '../models/user.php';
    require_once 'handlers/updateHandler.php';

    $parameters = file_get_contents('php://input');
    $data = json_decode($parameters, true);

    $db;
    $connection;
    try {
        $db = new Database();
        $connection = $db->getConnection();
    } catch (PDOException $e) {
        echo $e->getMessage();
        http_response_code(500);
        exit(json_encode(
            [
                'status' => 'error',
                'message' =>
                'Възникна грешка при свързването с базата данни!',
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }

    try {
        $user = new User(
            $data['username'],
            $data['email'],
            password_hash($data['password'], PASSWORD_DEFAULT),
            $data['firstName'],
            $data['lastName'],
            $data['fn'],
            $data['speciality'],
            $data['inAlumni'],
            $data['id']
        );

        $updateApiHandler = new UpdateApiHandler($connection, $user);

        if ($user->userExists($connection, true)) {
            http_response_code(400);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' =>
                    'Потребител с това потребителско име, имейл или факултетен номер вече съществува!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }

        if ($updateApiHandler->updateUser()) {
            session_start();
            unset($_SESSION['user']);
            $sessionData = $user->toJson();
            $sessionData['id'] = $user->getId();
            $_SESSION['user'] = $sessionData;
            http_response_code(200);
            exit(json_encode(
                [
                    'status' => 'success',
                    'message' => 'Успешно редактиране!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        } else {
            http_response_code(500);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' => 'Възникна грешка при редактирането!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
        http_response_code(500);
        exit(json_encode(
            [
                'status' => 'error',
                'message' =>
                'Възникна грешка при редактирането в базата данни!',
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }
}
