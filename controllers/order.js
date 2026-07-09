const { Order, ProductCart } = require("../models/order");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.json({
        error: "Failed to save your order in DB",
      });
    }
    return res.status(200).json(order);
  });
};

exports.prescription = (req, res) => {
  let order = req.order;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size too BIG!",
        });
      }
      order.prescription.data = fs.readFileSync(file.photo.path);
      order.prescription.contentType = file.photo.type;
    }

    //save to DB
    order.save((err, order) => {
      if (err) {
        res.status(400).json({
          error: "Saving prescription in DB failed",
        });
      }
      res.json(order);
    });
  });
};
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB",
        });
      }
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      // console.log(order);
      return res.json(order);
    }
  );
};

exports.prescriptionphoto = (req, res, next) => {
  if (req.order.prescription.data) {
    res.set("Content-Type", req.order.prescription.contentType);
    return res.send(req.order.prescription.data);
  }
  next();
};
