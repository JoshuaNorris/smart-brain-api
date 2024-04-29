const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send("success");
})

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'joshnorris',
    password: '',
    database: 'smart-brain',
  },
});


app.post('/register', register.handleRegister(db, bcrypt) );
    // What we do with bcrypt and db is a dependency injection
    // the req and res are implicitely being given to the function as parameters.
app.post('/signin', signin.handleSignin(db, bcrypt) );

app.get('/profile:id', profile.handleGetUser(db) );

app.put('/image', (req, res) => { image.handlePutImage(req, res, db) });


app.listen(3000, ()=> {
    console.log('app is running on port 3000');
});