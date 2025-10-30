// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcryptjs'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
});

// database configuration
const dbConfig = {
  host: 'db', // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

// TODO - Include your API routes here
app.get('/', (req, res) => {
  res.redirect('/login'); 
});

app.get('/register', (req, res) => {
  res.render('pages/register'); 
});

app.post('/register', async (req, res) => {
  const username = req.body.username; 
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const query = 'INSERT INTO users VALUES($1, $2) returning *;';

  db.any(query, [username, hashedPassword])
    .then(data => {
      console.log('User registered with hashed password:', hashedPassword);
      console.log(data);
      res.redirect('/login');
    }
    )

  .catch(error => {
    console.error('Error inserting user:', error.message); 
    res.redirect('/register');
  });
});

// Route: /login (GET)
app.get('/login', (req, res) => {
  res.render('pages/login'); 
});

// Route: /login (POST)
app.post('/login', async (req, res) => {
  
  try {
    const user = await db.one('select username, password from users where username = $1;', [req.body.username]);

    if (!user) {
      return res.redirect('/register');
    }
<<<<<<< HEAD
=======

    console.log('retrieved user:', user);
    console.log("hashed password:", user.password);
    console.log('password entered:', req.body.password);
>>>>>>> refs/remotes/origin/main
    
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log('input password:', match);
    
    if (match) {
      req.session.user = user;
      req.session.save();
      res.redirect('/discover');
    }
    else {
      return res.render('pages/login', { message: 'Incorrect username or password.', error: true });
    }
   

  } catch (error) {
    console.error('Error during login:', error.message);
    res.render('pages/login', { message: 'An error occurred during login. Please try again.', error: true });
  }
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};
app.use(auth);

app.get('/discover', async (req, res) => {
  try {
    const keyword = '';
    const size = 12; 
    const apiKey = process.env.API_KEY; 

    const response = await axios({
      url: `https://app.ticketmaster.com/discovery/v2/events.json`,
      method: 'GET',
      headers: {
        'Accept-Encoding': 'application/json',
      },
      params: {
        apikey: apiKey,
        keyword: keyword,
        size: size,
      },
    });

    const events = response.data._embedded ? response.data._embedded.events : [];
    res.render('pages/discover', { results: events });
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.render('pages/discover', { results: [], message: 'Failed to fetch events. Please try again later.' });
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('pages/logout'); 
  });
});



// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000);
console.log('Server is listening on port 3000');