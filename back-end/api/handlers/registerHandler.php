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

    public function action()
    {
        return $this->user->save($this->connection);
    }
}
