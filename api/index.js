import express from 'express';

const app = express();
const Port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(Port, () => {
  console.log(`Server is running at http://localhost:${Port}`);
});
