const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Questions = require('./data/questions');

//Initialize Express
const app = express();

// Serve static files found in dist folder
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

//Define server port number
const PORT = 3002;

//Allow Express to make use of Body-Parser Middle-Ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Current Question
let currentQuestion = {};

//GET REQUEST
app.get('/question', (req, res) => {
  let { id } = req.query;
  currentQuestion = Questions[id];
  res.send(currentQuestion);
});

app.post('/validate', (req, res) => {
  let { answer } = req.body;
  console.log(answer);
  for (let option of currentQuestion.options) {
    if (option.value === answer) {
      res.send(option.isCorrect);
    }
  }
});

//Start server && Log which port is being listened on
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app; // for testing
