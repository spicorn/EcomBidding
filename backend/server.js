import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('[DB] Connection Success');
  })
  .catch((err) => {
    console.log(err.message);
  });

// returns list of products for this api
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

// :url is the product url user requested
app.get('/api/products/url/:url', (req, res) => {
  const product = data.products.find((item) => item.url === req.params.url);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
}); // server starts listining to requests
