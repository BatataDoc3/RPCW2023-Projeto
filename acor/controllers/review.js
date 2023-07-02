const mongoose = require("mongoose");
const Review = require("../models/review");

module.exports.listreviews = () => {
  return Review.find({}, { processo: 1, user: 1, data_review: 1, adicionar: 1 })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports.getreview = (id) => {
  return Review.findOne({ _id: id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports.addreview = (review) => {
  return new Review({ ...review }).save();
};

module.exports.deletereview = (id) => {
  return Review.findOneAndDelete({ _id: id });
};
