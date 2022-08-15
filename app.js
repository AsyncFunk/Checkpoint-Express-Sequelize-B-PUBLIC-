const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const usersRouter = require('./routes');
// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.query());

app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
