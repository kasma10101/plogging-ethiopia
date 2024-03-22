var express = require('express')
const multer = require('multer')
const sequelize = require('./sequilize')
  cors = require('cors'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  compression = require('compression'),
  mongoose = require('mongoose');
  dotenv = require("dotenv");
  

  dotenv.config();

const db_conn = require('./utils/DB');

const app = express();

app.use(cors({origin:"http://localhost:3000"}))

app.use(express.json());
app.use(bodyParser.json());

app.use(compression());

app.use(cors());
app.use(express.static('upload'));


app.use('/members', require('./routes/member'));
app.use('/blogs', require('./routes/blog'));
app.use('/galleries', require('./routes/gallery'));
dotenv.config();
 const PORT = process.env.PORT
 const DB = process.env.DB_REMOTE

 sequelize.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
   app.listen(PORT, () => {
     console.log(`App is listening on port ${PORT}`);
   });
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });