<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    if (isset($_SESSION['user'])) {
        http_response_code(200);
        echo json_encode($_SESSION['user']);
        return json_encode($_SESSION['user']);
    } else {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Няма активна сесия!',]);
        return json_encode([
            'status' => 'error',
            'message' => 'Няма активна сесия!',
        ]);
    }
}

?>
