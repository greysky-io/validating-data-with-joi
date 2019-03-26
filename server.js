const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const validationMiddleware = require('./middleware');

const app = express();
const port = 3000;
app.use(bodyParser.json());

//these should go into a database...
const books = [
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    pages: 42,
    publishDate: new Date('10/12/1979'),
  },
  {
    title: 'The Restaurant at the End of the Universe',
    author: 'Douglas Adams',
    pages: 84,
    publishDate: new Date('10/01/1980'),
  },
  {
    title: 'Life, the Universe and Everything',
    author: 'Douglas Adams',
    pages: 126,
    publishDate: new Date('08/01/1982'),
  },
];

const bookSchema = Joi.object().keys({
  title: Joi.string().required(),
  author: Joi.string().required(),
  pages: Joi.number()
    .integer()
    .min(1)
    .required(),
  publishDate: Joi.date().max('now'),
});

app.get('/books', (req, res) => {
  res.send(JSON.stringify(books));
});

//Add our middleware to the post route
app.post('/books', validationMiddleware(bookSchema), (req, res) => {
  books.push(req.body);
  res.send(JSON.stringify(res.body));
});

//Define a custom error handler
app.use((err, req, res, next) => {
  if (err && err.isJoi) {
    //this error was generated from Joi
    return res.status(400).send(JSON.stringify({ error: err.details[0].message }));
  }

  //some other error, let Express handle it.
  return next(err);
});

app.listen(port, () => console.log(`App is running on ${port}`));
