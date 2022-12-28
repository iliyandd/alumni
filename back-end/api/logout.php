<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    if (isset($_SESSION['user'])) {
        session_unset();
        session_destroy();
        header('Location: ../../front-end/login/login.html');
    }
}
