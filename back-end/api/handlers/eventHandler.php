<?php

require_once '../../models/event.php';

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

    public function action()
    {
        if ($this->method === 'GET') {
            return $this->listEvents();
        } elseif ($this->method === 'POST') {
            return $this->createEvent();
        }
    }

    private function listEvents()
    {
        return Event::getAll($this->connection);
    }

    private function createEvent()
    {
        $event = new Event($this->data['title'], $this->data['description'], $_SESSION['user']['id'], $this->data['date']);
        return $event->save($this->connection);
    }
}
