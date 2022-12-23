<?php

class RegisterApiHandler
{
    private $CHECK_QUERY = "SELECT id FROM user WHERE username = :username or email = :email or fn = :fn";

    private $connection;
    private $user;

    public function __construct($connection, $user)
    {
        $this->connection = $connection;
        $this->user = $user;
    }

    public function userExists()
    {
        $statement = $this->connection->prepare($this->CHECK_QUERY);
        $statement->execute(["username" => $this->user->getUsername(), "email" => $this->user->getEmail(), "fn" => $this->user->getFn()]);
        return $statement->rowCount() > 0;
    }

    public function action()
    {
        return $this->user->save($this->connection);
    }
}
