<?php

require_once '../models/user.php';

class MemberHandler
{
    private $GET_MEMBERS_QUERY = 'SELECT id, username, email, first_name firstName, last_name lastName, fn, speciality, in_alumni inAlumni, date_created dateCreated' .
        ' FROM user WHERE in_alumni = 1';
    private $GET_MEMBER_QUERY = 'SELECT id, username, email, first_name firstName, last_name lastName, fn, speciality, in_alumni inAlumni, date_created dateCreated' .
        ' FROM user WHERE in_alumni = :isMember and username = :username';
    private $SET_MEMBERSHIP_QUERY = 'UPDATE user set in_alumni = :inAlumni where username = :username';

    private $connection;
    private $method;
    private $data;

    public function __construct($connection, $method, $data = [])
    {
        $this->connection = $connection;
        $this->method = $method;
        $this->data = $data;
    }

    public function action($usernameQueryParameter = null, $isMemberQueryParameter = null)
    {
        if ($this->method === 'GET') {
            if (!$usernameQueryParameter || $isMemberQueryParameter == null) {
                $this->listMembers();
            }
            $this->getUser($usernameQueryParameter, $isMemberQueryParameter);
        } elseif ($this->method === 'PUT') {
            $this->setMembership();
        }
    }

    private function listMembers()
    {
        $statement = $this->connection->prepare($this->GET_MEMBERS_QUERY);
        $statement->execute();

        http_response_code(200);
        exit(json_encode(
            [
                'status' => 'success',
                'message' => 'Успешно извличане на членовете!',
                'result' => $statement->fetchAll(PDO::FETCH_ASSOC)
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }

    private function getUser($username, $isMember)
    {
        $statement = $this->connection->prepare($this->GET_MEMBER_QUERY);
        $statement->execute(['username' => $username, 'isMember' => $isMember]);
        $userData = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$userData) {
            http_response_code(404);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' => 'Не съществува такъв потребител!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }

        http_response_code(200);
        exit(json_encode(
            [
                'status' => 'success',
                'message' => 'Успешно извличане на потребителя!',
                'result' => $userData,
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }

    private function setMembership()
    {
        if (!User::getByUsername($this->connection, $this->data['username'])) {
            http_response_code(404);
            exit(json_encode(
                [
                    'status' => 'error',
                    'message' => 'Не съществува такъв член на групата!',
                ],
                JSON_UNESCAPED_UNICODE
            ));
        }

        $statement = $this->connection->prepare($this->SET_MEMBERSHIP_QUERY);
        $statement->execute(['username' => $this->data['username'], 'inAlumni' => $this->data['inAlumni']]);

        $state = $this->data['inAlumni'] == 1 ? 'добавихте' : 'премахнахте';
        http_response_code(200);
        exit(json_encode(
            [
                'status' => 'success',
                'message' => "Успешно {$state} член на групата!",
            ],
            JSON_UNESCAPED_UNICODE
        ));
    }
}
