const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

// importing functions required for endpoints
const register = require('./EndPointFunctions/register.js');
const foodItem = require('./EndPointFunctions/fooditem.js');
const profile = require('./EndPointFunctions/profile.js');
const signIn = require('./EndPointFunctions/signin.js');
const apiCall = require('./EndPointFunctions/apicall.js');

const database = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('This route is customizable!');
});

app.get('/start-server', (req, res) => {
  res.json('Server has successfully started!');
});

app.post('/signin', (req, res) => {
  signIn.handlePost(req, res, bcrypt, database);
});

app.post('/register', (req, res) =>
  register.handlePost(req, res, bcrypt, database)
);

app.get('/profile/:id', (req, res) => profile.handleGetId(req, res, database));

app.put('/fooditem', (req, res) => foodItem.handlePut(req, res, database));

app.post('/apicall', apiCall.handlePost);

app.listen(process.env.PORT, () => {
  console.log('running');
});
