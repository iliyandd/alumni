<?php
// for edit profile
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once '../db/database.php';
    require_once '../models/user.php';
    //get the query parameter id from the URL and store it in a variable
  
    //connect to the database
    $db = new Database();
    $connection = $db->getConnection();
    //create a new instance of the User class
    //get the static method getById from the User class
    //pass the connection and the id as parameters
    
}

?>
