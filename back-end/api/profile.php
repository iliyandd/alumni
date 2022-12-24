<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    require_once '../db/database.php';
    require_once '../models/user.php';
    //get the query parameter id from the URL and store it in a variable
    $id = $_GET['id'];
    //connect to the database
    $db = new Database();
    $connection = $db->getConnection();
    //create a new instance of the User class
    //get the static method getById from the User class
    //pass the connection and the id as parameters
    $user = User::getById($connection, $id);
    if ($user) {
        //if the user exists, return the user as a JSON object
        http_response_code(200);
        exit(json_encode($user->toJson(true, false), JSON_UNESCAPED_UNICODE));
    } else {
        //if the user does not exist, return an error message
        http_response_code(404);
        exit(
            json_encode(
                [
                    'status' => 'error',
                    'message' => 'Потребителят не е намерен!',
                ],
                JSON_UNESCAPED_UNICODE
            )
        );
    }
}

?>
