<?php

class Event
{
    private $SAVE_QUERY = 'INSERT INTO event (title, description, creator, date)' .
        ' VALUES (:title, :description, :creator, :date)';
    private static $GET_ALL_QUERY = 'SELECT * FROM event ORDER BY date';
    private static $GET_BY_ID_QUERY = 'SELECT * FROM event WHERE id = :id';

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

            return new Event(
                $eventData->title,
                $eventData->description,
                $eventData->creator,
                $eventData->date,
                $eventData->id,
                $eventData->date_created
            );
        } catch (PDOException $err) {
            echo $err->getMessage();
        }
        return null;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getCreator()
    {
        return $this->creator;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function getDateCreated()
    {
        return $this->dateCreated;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function setCreator($creator)
    {
        $this->creator = $creator;
    }

    public function setDate($date)
    {
        $this->date = $date;
    }

    public function setDateCreated($dateCreated)
    {
        $this->dateCreated = $dateCreated;
    }
}
