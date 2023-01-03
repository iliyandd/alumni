<?php

require_once '../../../alumni/back-end/models/event.php';

class EventHandler
{
    private $connection;
    private $method;
    private $data;

    public function __construct($connection, $method, $data = [])
    {
        $this->connection = $connection;
        $this->method = $method;
        $this->data = $data;
    }

    public function action($idQueryParameter = null)
    {
        if ($this->method === 'GET') {
            if (!$idQueryParameter) {
                return $this->listEvents();
            }
            return Event::getById($this->connection, $idQueryParameter);
        } elseif ($this->method === 'POST') {
            return $this->createEvent();
        } elseif ($this->method === 'PUT') {
            return $this->editEvent();
        } elseif ($this->method === 'DELETE') {
            return $this->deleteEvent();
        }
    }

    private function listEvents()
    {
        return Event::getAll($this->connection);
    }

    private function createEvent()
    {
        session_start();
        $event = new Event($this->data['title'], $this->data['description'], $_SESSION['user']['id'], $this->data['date']);
        return $event->save($this->connection);
    }

    private function editEvent()
    {
        $event = new Event($this->data['title'], $this->data['description'], null, $this->data['date'], $this->data['id']);
        return $event->edit($this->connection);
    }

    private function deleteEvent()
    {
        return Event::delete($this->connection, $this->data['id']);
    }
}
