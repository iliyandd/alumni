<?php

class Event
{
    private $SAVE_QUERY = 'INSERT INTO event (title, description, creator, date)' .
        ' VALUES (:title, :description, :creator, :date)';
    private static $GET_ALL_QUERY = 'SELECT event.id, title, description, creator, date, event.date_created, first_name firstName, last_name lastName' .
        ' FROM event JOIN user on creator = user.id ORDER BY date';
    private static $GET_BY_ID_QUERY = 'SELECT event.id, title, description, creator, date, event.date_created, first_name, last_name' .
        ' FROM event JOIN user on creator = user.id WHERE event.id = :id ';
    private static $DELETE_QUERY = 'DELETE FROM event WHERE id = :id';
    private static $EDIT_QUERY = 'UPDATE event SET title = :title, description = :description, date = :date where id = :id';

    private $id;
    private $title;
    private $description;
    private $creator;
    private $date;
    private $dateCreated;

    public function __construct($title, $description, $creator, $date, $id = null, $dateCreated = null)
    {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->creator = $creator;
        $this->date = $date;
        $this->dateCreated = $dateCreated;
    }

    public function toJson($detailInformation = false)
    {
        $result = ['title' => $this->title, 'description' => $this->description, 'creator' => $this->creator, 'date' => $this->date];
        if ($detailInformation) {
            $result['id'] = $this->id;
            $result['dateCreated'] = $this->dateCreated;
        }
        return $result;
    }

    public function save($connection)
    {
        try {
            $statement = $connection->prepare($this->SAVE_QUERY);
            $statement->execute($this->toJson());
            return true;
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return false;
    }

    public static function getAll($connection)
    {
        try {
            $statement = $connection->prepare(Event::$GET_ALL_QUERY);
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return null;
    }

    public static function getById($connection, $id)
    {
        try {
            $statement = $connection->prepare(Event::$GET_BY_ID_QUERY);
            $statement->execute(['id' => $id]);
            $eventData = $statement->fetch(PDO::FETCH_OBJ);

            if (!$eventData) {
                return null;
            }

            $event = new Event(
                $eventData->title,
                $eventData->description,
                $eventData->creator,
                $eventData->date,
                $eventData->id,
                $eventData->date_created
            );
            $result = $event->toJson(true);
            $result['firstName'] = $eventData->first_name;
            $result['lastName'] = $eventData->last_name;

            return $result;
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return null;
    }

    public function edit($connection)
    {
        try {
            $statement = $connection->prepare(Event::$EDIT_QUERY);
            $statement->execute(['title' => $this->title, 'description' => $this->description, 'date' => $this->date, 'id' => $this->id]);
            return $statement->rowCount() > 0 ? true : false;
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return false;
    }

    public static function delete($connection, $id)
    {
        try {
            $statement = $connection->prepare(Event::$DELETE_QUERY);
            $statement->execute(['id' => $id]);
            return $statement->rowCount() > 0 ? true : false;
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return false;
    }

    public function getId()
    {
        return $this->id;
    }
}
