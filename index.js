const express = require('express');
require('./db/Config');
const cors = require("cors");
const User = require('./db/User');
const Product = require('./db/Product')
const app = express();
const JWT = require('jsonwebtoken');
const jwtKey = 'e.com'
app.use(express.json()); // middlewars
app.use(cors()); //middlewars

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  JWT.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong" })
    }
    res.send({ result, token });
  })
})

app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password")
    if (user) {

      JWT.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong" })
        }
        res.send({ user, token });
      })
    }
  } else {
    res.send("no user found");
  }
})

app.post('/add-Product', verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result)
})

app.get('/products', verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products)
  } else {
    res.send(result, ":No products Found");
  }
})

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  res.send(result)
})

app.get('/product/:id', verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send("no record found")
  }
})

app.put('/product/:id', verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  res.send(result);
})

app.get('/search/:key', verifyToken, async (req, res) => {
  const result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } }
    ]
  });
  res.send(result)
})

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  // res.send(token);
  console.log("middleware called", token);
  if (token) {
    JWT.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send("please provide valid token");
      } else {
        next();
      }
    })
  } else {
    res.status(403).send("please add token with header");
  }
}


app.listen(process.env.PORT||9000);