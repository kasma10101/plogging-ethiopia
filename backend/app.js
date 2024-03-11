var express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  compression = require('compression'),
  mongoose = require('mongoose');

const db_conn = require('./utils/DB');

const app = express();

app.use(cors({origin:"http://localhost:3000"}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());

app.use(cors());
app.use(express.static('upload'));

app.use('/members', require('./routes/member'));
app.use('/blogs', require('./routes/blog'));
app.use('/galleries', require('./routes/gallery'));

const server = app.listen(config.PORT || 3001, function() {
  console.log('Listening on port ' + server.address().port);
})
