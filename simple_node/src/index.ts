import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('query params: ' + JSON.stringify(req.query));
  res.json({ queryParams: req.query });
});

app.post('/', (req, res) => {
  console.log('post data: ' + JSON.stringify(req.query));
  res.send({ postData: req.body });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
