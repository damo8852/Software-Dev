// ************************************************
// <!-- Section 1 : Dependencies-->
// ************************************************

// importing the dependencies
// Express is a NodeJS framework that, among other features, allows us to create HTML templates.
const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
require('dotenv').config();

// ************************************************
// <!-- Section 2 : Initialization-->
// ************************************************

// defining the Express app
const app = express();
// using bodyParser to parse JSON in the request body into JS objects
app.use(bodyParser.json());
// Database connection details
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};
// Connect to database using the above details
const db = pgp(dbConfig);

// ************************************************
// <!-- Section 3 : TODOs Enpoint Implementation-->
// ************************************************

// <!-- Endpoint 1 :  GET Endpoint Implementation (Default) -->
const message = 'Hey there!';
app.get('/', (req, res) => {
  res.send(message);
});

// <!-- Endpoint 2 : GET Endpoint Implementation -->
app.get('/getTop3Trails', function (req, res) {
  var rating = req.query.avg_rating;

  var query = `SELECT * FROM trails ORDER BY avg_rating DESC LIMIT 3;`;

  db.query(query)
    .then(data => {
      res.status(200).json({
        trails: data, 
      });
    })
    .catch(err => {
      console.error('Error occurred:', err);
      res.status(400).json({
        trails: '',
        error: err,
      });
    });
});


// <!-- Endpoint 3 : POST Endpoint Implementation -->
app.post('/addReview', function (req, res) {
  const { username, review, rating, image_url, image_caption } = req.body;

  db.task(async t => {
    const reviewQuery = `
      insert into reviews (username, review, rating) 
      values ($1, $2, $3) 
      returning review_id;
    `;
    const reviewResult = await t.one(reviewQuery, [username, review, rating]);

    let imageResult;
    if (image_url && image_caption) {
      const imageQuery = `
        insert into images (image_url, image_caption) 
        values ($1, $2) 
        returning image_id;`;
      imageResult = await t.one(imageQuery, [image_url, image_caption]);

      const mappingQuery = `
        insert into reviews_to_images (review_id, image_id) 
        values ($1, $2);`;
      await t.none(mappingQuery, [reviewResult.review_id, imageResult.image_id]);
    }

    return { review_id: reviewResult.review_id, image_id: imageResult?.image_id || null };
  })
  .then(data => {
    res.status(201).json({
      status: 'success',
      message: 'data added successfully',
      review_id: data.review_id,
      image_id: data.image_id, 
    });
  })
  .catch(err => {
    console.error('error occurred:', err);
    res.status(400).json({
      status: 'error',
      message: 'failed to add data',
      error: err,
    });
  });
});


// <!-- Endpoint 4 : PUT Endpoint Implementation -->
app.put('/updateReview', function (req, res) {
  const { review_id, image_id, new_review, new_rating, new_image_url, new_image_caption } = req.body;

  db.task(async t => {
    if (new_review || new_rating) {
      const updateReviewQuery = `
        update reviews 
        set review = ($1, review), rating = ($2, rating)
        where review_id = $3;`;
      await t.none(updateReviewQuery, [new_review, new_rating, review_id]);
    }

    if (new_image_url || new_image_caption) {
      const updateImageQuery = `
        update images 
        set image_url = ($1, image_url), image_caption = ($2, image_caption)
        where image_id = $3;`;
      await t.none(updateImageQuery, [new_image_url, new_image_caption, image_id]);
    }

    return { review_id, image_id };
  })
  .then(data => {
    res.status(201).json({
      status: 'success',
      message: 'data updated successfully',
      review_id: data.review_id,
      image_id: data.image_id,
    });
  })
  .catch(err => {
    console.error('error occurred:', err);
    res.status(400).json({
      status: 'error',
      message: 'failed to update data',
      error: err,
    });
  });
});


// <!-- Endpoint 5 : DELETE Endpoint Implementation -->
app.delete('/deleteReview', function (req, res) {
  const { review_id, username, rating } = req.body;

  db.task(async t => {
    if (review_id) {
      await t.none('delete from reviews_to_images where review_id = $1;', [review_id]);
      await t.none('delete from reviews where review_id = $1;', [review_id]);
    } else if (username) {
      const reviews = await t.any('select review_id from reviews where username = $1;', [username]);
      for (let review of reviews) {
        await t.none('delete from reviews_to_images where review_id = $1;', [review.review_id]);
      }
      await t.none('delete from reviews where username = $1;', [username]);
    } else if (rating) {
      const reviews = await t.any('select review_id from reviews where rating = $1;', [rating]);
      for (let review of reviews) {
        await t.none('delete from reviews_to_images where review_id = $1;', [review.review_id]);
      }
      await t.none('delete from reviews where rating = $1;', [rating]);
    }

    return {};
  })
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'data deleted successfully',
    });
  })
  .catch(err => {
    console.error('error occurred:', err);
    res.status(400).json({
      status: 'error',
      message: 'failed to delete data',
      error: err,
    });
  });
});

// <!-- Endpoint 6 : GET Endpoint Implementation -->
app.get('/getTrails', function (req, res) {
  const { difficulty, location } = req.query;

  let query = 'select * from trails WHERE 1=1';
  const queryParams = [];

  if (difficulty) {
    query += ' and difficulty = $1';
    queryParams.push(difficulty);
  }

  if (location) {
    query += ' and location = $2';
    queryParams.push(location);
  }

  db.any(query, queryParams)
    .then(data => {
      res.status(200).json({
        status: 'success',
        trails: data
      });
    })
    .catch(err => {
      console.error('Error occurred:', err);
      res.status(400).json({
        status: 'error',
        message: 'failed to retrieve data',
        error: err,
      });
    });
});


// <!-- Endpoint 7 : GET Endpoint Implementation -->
app.get('/getReviewsByTrailID', function (req, res) {
  const trail = req.query.trail_id;

  const query = `
    select r.review_id, r.username, r.review, r.rating, i.image_url, i.image_caption
    from reviews r
    join trails_to_reviews tr ON r.review_id = tr.review_id
    left join reviews_to_images ri ON r.review_id = ri.review_id
    left join images i ON ri.image_id = i.image_id
    where tr.trail_id = $1;`;

  db.any(query, [trail])
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'reviews retrieved successfully'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        status: 'error',
        message: 'failed to retrieve reviews',
        error: err,
      });
    });
});


// ************************************************
// <!-- Section 4 : Start Server-->
// ************************************************
// starting the server and keeping the connection open to listen for more requests
app.listen(3000, () => {
  console.log('listening on port 3000');
});
