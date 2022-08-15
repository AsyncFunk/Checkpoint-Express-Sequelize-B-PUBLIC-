const express = require('express');
const supertest = require('supertest');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {
  const response = todos.listPeople();
  res.status(200).send(response);
});

router.get('/:name/tasks', (req, res, next) => {
  if (!todos.listPeople().includes(req.params.name)) {
    res.sendStatus(404);
  } else {
    if (Object.keys(req.query).length > 0) {
      let response = todos.list(req.params.name).filter((task) => {
        if (req.query.status === 'complete') {
          return task.complete;
        } else if (req.query.status === 'active') {
          return !task.complete;
        }
      });
      res.status(200).send(response);
    } else {
      const response = todos.list(req.params.name);
      res.status(200).send(response);
    }
  }
});

router.post('/:name/tasks', (req, res, next) => {
  if (!req.body.content) {
    res.sendStatus(400);
  } else {
    todos.add(req.params.name, req.body);
    let tasksOfNewAddition = todos.list(`${req.params.name}`);
    res.status(201).send(tasksOfNewAddition[0]);
  }
});

router.put('/:name/tasks/:index', (req, res, next) => {
  todos.complete(req.params.name, req.params.index);
  res.sendStatus(200);
});

router.delete('/:name/tasks/:index', (req, res, next) => {
  todos.remove(req.params.name, req.params.index);
  res.sendStatus(204);
});
