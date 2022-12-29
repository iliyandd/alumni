<?php

require_once '../../../alumni/back-end/models/user.php';

class LoginHandler
{
    private $LOGIN_QUERY = 'SELECT * FROM user WHERE email = :email';

    private $connection;
    private $email;
    private $password;

    public function __construct($connection, $email, $password)
    {
        $this->connection = $connection;
        $this->email = $email;
        $this->password = $password;
    }

    public function action()
    {
        try {
            $statement = $this->connection->prepare($this->LOGIN_QUERY);
            $statement->execute(['email' => $this->email]);
            $userData = $statement->fetch(PDO::FETCH_OBJ);

            if (!$userData || !password_verify($this->password, $userData->password)) {
                return null;
            }

            return new User(
                $userData->username,
                $userData->email,
                $userData->password,
                $userData->first_name,
                $userData->last_name,
                $userData->fn,
                $userData->speciality,
                $userData->in_alumni,
                $userData->id,
                $userData->date_created
            );
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return null;
    }
}
