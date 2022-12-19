<?php
class Database
{
    private $connection;

    public function __construct()
    {
        $dbHost = "localhost";
        $dbName = "alumni-fmi";
        $username = "root";
        $password = "";

        $this->connection = new PDO("mysql:host=$dbHost;dbname=$dbName;", $username, $password,
        [
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
    }

    public function getConnection() {
        return $this->connection;
    }
}