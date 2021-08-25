const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv").config();

// Scraperapi credentials
const { APIKEY } = process.env;
const baseUrl = `http://api.scraperapi.com?api_key=${APIKEY}&autoparse=true`;

// Middlewares
app.use(express.json());

// Route middlewares

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API!");
});

// Get product details by id
app.get("/products/:productId", (req, res) => {
  const { productId } = req.params;

  const getData = () => {
    // create a promise for the axios request
    const promise = axios.get(
      `${baseUrl}&url=https://amazon.com/dp/${productId}`
    );
    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data);
    // return it
    return dataPromise;
  };

  // now we can use that data from the outside!
  getData()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => console.log(err));
});

// Get product reviews by id
app.get("/products/:productId/reviews", (req, res) => {
  const { productId } = req.params;

  axios
    .get(`${baseUrl}&url=https://amazon.com/product-reviews/${productId}`)
    .then((res) => res.data)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => console.log(err));
});

// Get product offers by id
app.get("/products/:productId/offers", (req, res) => {
  const { productId } = req.params;

  axios
    .get(`${baseUrl}&url=https://amazon.com/gp/offer-listing/${productId}`)
    .then((res) => res.data)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => console.log(err));
});

// Search
app.get("/search/:searchQuery", (req, res) => {
  const { searchQuery } = req.params;

  axios
    .get(`${baseUrl}&url=https://amazon.com/s?k=${searchQuery}`)
    .then((res) => res.data)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
