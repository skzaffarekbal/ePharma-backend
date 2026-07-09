const { Order, ProductCart } = require("../models/order");
const Product = require("../models/product");
// TODO: come here to put sk key
const stripe = require("stripe")(process.env.STRIPE_SK);
const uuid = require("uuid/v4");
const product = require("../models/product");
const { json } = require("body-parser");

exports.payment_stripe = (req, res, next) => {
  const { products, token } = req.body;
  const idempontencyKey = uuid();

  products.map((product) => {
    let nam = product.name;
    Product.findById(product._id).exec((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: `${nam} not Found`,
        });
      }
      if (prod.price != product.price) {
        res.status(400).json({ error: "Amount was tempered" });
      }
    });
  });
  // console.log(req);

  stripe.customers
    .create({
      email: token.email,
    })
    .then((customer) => {
      req.body.order = {
        products: req.body.products,
        transaction_id: req.body.token.id,
        amount: req.body.amount,
        user: req.body.user._id,
      };
      console.log("ORDER:", req.body.order);

      next();
      // return res.status(200).json(customer);
    })
    .catch((error) => console.error(error));
};
