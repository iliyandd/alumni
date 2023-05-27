<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    if (isset($_SESSION['user'])) {
        require_once '../../db/database.php';
        require_once '../aws/s3.php';

        try {
            $db = new Database();
            $connection = $db->getConnection();
            $statement = $connection->prepare('SELECT in_alumni FROM user WHERE id = :id');
            $statement->execute(['id' => $_SESSION['user']['id']]);
            $InAlumniData = $statement->fetch(PDO::FETCH_OBJ);

            if ($_SESSION['user']['inAlumni'] != $InAlumniData->in_alumni) {
                $_SESSION['user']['inAlumni'] = $InAlumniData->in_alumni;
            }
        } catch (PDOException $err) {
            echo $err->getMessage();
            http_response_code(500);
            return json_encode([
                'status' => 'error',
                'message' => 'Грешка при вземането на сесия!',
            ]);
        }

        $s3 = new S3();
        $_SESSION['user']['profilePictureUrl'] = $s3->getObjectUrl('profile_pictures/', "{$_SESSION['user']['id']}.png");

        http_response_code(200);
        return json_encode($_SESSION['user']);
    } else {
        http_response_code(401);
        return json_encode([
            'status' => 'error',
            'message' => 'Няма активна сесия!',
        ]);
    }
}
