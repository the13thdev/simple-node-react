import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, './client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.get('/a', (req, res) => {
  console.log('query params: ' + JSON.stringify(req.query));
  res.json({ queryParams: req.query });
});

app.post('/a', (req, res) => {
  console.log('post data: ' + JSON.stringify(req.body));
  res.send({ postData: req.body });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
