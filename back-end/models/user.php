<?php
class User
{
    private $SAVE_QUERY = "INSERT INTO user (username, email, password, first_name, last_name, fn, speciality, in_alumni)"
        . " VALUES (:username, :email, :password, :firstName, :lastName, :fn, :speciality, :inAlumni)";

    private $id;
    private $username;
    private $email;
    private $password;
    private $firstName;
    private $lastName;
    private $fn;
    private $speciality;
    private $inAlumni;
    private $dateCreated;

    public function __construct($id, $username, $email, $password, $firstName, $lastName, $fn, $speciality, $inAlumni, $dateCreated)
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->fn = $fn;
        $this->speciality = $speciality;
        $this->inAlumni = $inAlumni;
        $this->dateCreated = $dateCreated;
    }

    public function toJson()
    {
        return [
            "id" => $this->id, "username" => $this->username, "email" => $this->email, "password" => $this->password,
            "firstName" => $this->firstName, "lastName" => $this->lastName, "fn" => $this->fn, "speciality" => $this->speciality,
            "inAlumni" => $this->inAlumni, "dateCreated" => $this->dateCreated
        ];
    }

    // Getters
    public function getId()
    {
        return $this->id;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function getFn()
    {
        return $this->fn;
    }

    public function getSpeciality()
    {
        return $this->speciality;
    }

    public function getInAlumni()
    {
        return $this->inAlumni;
    }

    public function getDateCreated()
    {
        return $this->dateCreated;
    }


    // Setters
    public function setId($id)
    {
        $this->id = $id;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    public function setFn($fn)
    {
        $this->fn = $fn;
    }

    public function setSpeciality($speciality)
    {
        $this->speciality = $speciality;
    }

    public function setInAlumni($inAlumni)
    {
        $this->inAlumni = $inAlumni;
    }

    public function setDateCreated($dateCreated)
    {
        $this->dateCreated = $dateCreated;
    }

    // Database methods
    public function save($connection)
    {
        $statement = $connection->prepare($this->SAVE_QUERY);
        $statement->execute($this->toJson());
    }

    public static function getById($connection, $id)
    {
        $statement = $connection->prepare("SELECT * FROM user WHERE id = '?'");
        $statement->execute([$id]);
        $userData = $statement->fetchAll(PDO::FETCH_OBJ);

        if (!$userData) {
            return null;
        }

        return new User(
            $userData["id"],
            $userData["username"],
            $userData["email"],
            $userData["password"],
            $userData["first_name"],
            $userData["last_name"],
            $userData["fn"],
            $userData["speciality"],
            $userData["in_alumni"],
            $userData["date_created"]
        );
    }

    public static function getByEmail($connection, $email)
    {
    }
}
