<?php

require_once("../db/database.php");
require_once("../models/user.php");
require_once("handlers/registerHandler.php");

// init
$parameters = file_get_contents("php://input");
$data = json_decode($params, true);

$db = new Database();
$connection = $db->getConnection();
$user = new User(
    $data["username"],
    $data["email"],
    password_hash($data["password"], PASSWORD_DEFAULT),
    $data["first_name"],
    $data["last_name"],
    $data["fn"],
    $data["speciality"],
    $data["inAlumni"]
);
$registerHandler = new RegisterApiHandler($connection, $user);

try {
    // check whether user exists
    if ($registerHandler->userExists()) {
        http_response_code(400);
        exit(json_encode(
            ["status" => "error", "message" => "Потребител с това потребителско име, имейл или факултетен номер вече съществува!"],
            JSON_UNESCAPED_UNICODE
        ));
    }

    // create user
    if ($registerHandler->action()) {
        session_start();
        $sessionData = $user->toJson();
        $sessionData["id"] = $connection->lastInsertId();
        $_SESSION["user"] = $sessionData;

        setcookie("user", $user->getUsername(), time() + 60 * 60 * 2, "/");

        http_response_code(201);
        exit(json_encode(["status" => "success", "message" => "Успешна регистрация!"], JSON_UNESCAPED_UNICODE));
    } else {
        http_response_code(500);
        exit(json_encode(["status" => "error", "message" => "Възникна грешка при регистрацията!"], JSON_UNESCAPED_UNICODE));
    }
} catch (PDOException $err) {
    http_response_code(500);
    return json_encode(["status" => "error", "message" => "Възникна грешка при регистрацията!"], JSON_UNESCAPED_UNICODE);
}
