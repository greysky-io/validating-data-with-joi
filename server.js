const express = require('express');
const app = express();

const port = 3000;

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

app.get('/books', (req, res) => {
  res.send(JSON.stringify(books));
});

app.post('/books', (req, res) => {
  books.push(req.body);
  res.send(JSON.stringify(res.body));
});

app.listen(port, () => console.log(`App is running on ${port}`));
