<?php

class UpdateApiHandler
{
    private $UPDATE_QUERY = 'UPDATE user SET username = :username, email = :email, first_name = :firstName, last_name = :lastName, fn = :fn, speciality = :speciality, in_alumni = :inAlumni, password = :password  WHERE id = :id';

    private $connection;
    private $user;

    public function __construct($connection, $user)
    {
        $this->connection = $connection;
        $this->user = $user;
    }

    public function updateUser()
    {
        $statement = $this->connection->prepare($this->UPDATE_QUERY);
        try {
            $statement->execute([
                ...$this->user->toJson(false, true),
                'id' => $this->user->getId(),
            ]);
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }
}

?>
