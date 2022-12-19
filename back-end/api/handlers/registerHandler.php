<?php

class RegisterApiHandler
{
    private $connection;
    private $user;

    public function __construct($connection, $user)
    {
        $this->connection = $connection;
        $this->user = $user;
    }

    public function check()
    {
    }

    public function action()
    {
    }
}
