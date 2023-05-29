<?php

require '../aws/s3.php';

class User
{
    private $SAVE_QUERY =
    'INSERT INTO user (username, email, password, first_name, last_name, fn, speciality, in_alumni)' .
        ' VALUES (:username, :email, :password, :firstName, :lastName, :fn, :speciality, :inAlumni, :profilePictureUrl)';

    private $CHECK_QUERY = 'SELECT id FROM user WHERE username = :username or email = :email or fn = :fn';

    private static $UPDATE_PROFILE_PICTURE_QUERY = 'UPDATE user set profile_picture_url = :profilePictureUrl where id = :id';

    private static $GET_BY_USERNAME_QUERY = 'SELECT * FROM user WHERE username = :username';
    private $id;
    private $username;
    private $email;
    private $password;
    private $firstName;
    private $lastName;
    private $fn;
    private $speciality;
    private $inAlumni;
    private $profilePictureUrl;
    private $dateCreated;

    public function __construct(
        $username,
        $email,
        $password,
        $firstName,
        $lastName,
        $fn,
        $speciality,
        $inAlumni,
        $id = null,
        $profilePictureUrl = null,
        $dateCreated = null
    ) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->fn = $fn;
        $this->speciality = $speciality;
        $this->inAlumni = $inAlumni;
        $this->profilePictureUrl = $profilePictureUrl;
        $this->dateCreated = $dateCreated;
    }

    public function toJson(
        $detailInformation = false,
        $sensitiveInformation = false
    ) {
        $result = [
            'username' => $this->username,
            'email' => $this->email,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'fn' => $this->fn,
            'speciality' => $this->speciality,
            'inAlumni' => $this->inAlumni,
            'profilePictureUrl' => $this->profilePictureUrl,
        ];
        if ($detailInformation) {
            $result['id'] = $this->id;
            $result['dateCreated'] = $this->dateCreated;
        }
        if ($sensitiveInformation) {
            $result['password'] = $this->password;
        }

        return $result;
    }

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

    public function getFn()
    {
        return $this->fn;
    }

    public static function getProfilePictureUrl($username, $connection)
    {
        $statement = $connection->prepare(User::$GET_BY_USERNAME_QUERY);
        $statement->execute(['username' => $username]);
        $userData = $statement->fetch(PDO::FETCH_OBJ);

        $profilePictureUrl = $userData->profile_picture_url;
        $profilePictureHeaders = $profilePictureUrl ? @get_headers($profilePictureUrl) : null;

        if (!$profilePictureHeaders || $profilePictureHeaders[0] == 'HTTP/1.1 404 Not Found') {
            $profilePictureUrl = '../../../alumni/img/anonymous_profile_picture.png';
        } elseif ($profilePictureHeaders[0] == 'HTTP/1.1 403 Forbidden') {
            $s3 = new S3();
            $profilePictureUrl = $s3->getObjectUrl('profile_pictures/', "{$username}.png");
        }

        return $profilePictureUrl;
    }

    public function save($connection)
    {
        $statement = $connection->prepare($this->SAVE_QUERY);
        try {
            $statement->execute($this->toJson(false, true));
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public static function getByUsername($connection, $username)
    {
        $statement = $connection->prepare(User::$GET_BY_USERNAME_QUERY);
        $statement->execute(['username' => $username]);
        $userData = $statement->fetch(PDO::FETCH_OBJ);

        if (!$userData) {
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
    }

    public function userExists($connection, $hasId = false)
    {
        $statement = $connection->prepare($this->CHECK_QUERY);
        $statement->execute([
            'username' => $this->getUsername(),
            'email' => $this->getEmail(),
            'fn' => $this->getFn(),
        ]);
        return $hasId
            ? $statement->rowCount() > 0 && $statement->fetch(PDO::FETCH_OBJ)->id != $this->getId()
            : $statement->rowCount() > 0;
    }

    public static function updateUserProfilePicture($id, $profilePictureUrl, $connection)
    {
        $statement = $connection->prepare(User::$UPDATE_PROFILE_PICTURE_QUERY);
        try {
            $statement->execute(
                ['id' => $id, 'profilePictureUrl' => $profilePictureUrl]
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
