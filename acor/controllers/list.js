const mongoose = require("mongoose");
const List = require("../models/list");

module.exports.listlistsbyusername = (username) => {
  return List.find({ username: username }, { nome: 1 })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports.getlist = (id) => {
  return List.findOne({ _id: id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports.addlist = (list) => {
  return new List({ ...list }).save();
};

module.exports.addacordao = (listId, ac) => {
  return List.updateOne({ _id: listId }, { $push: { acordaos: ac } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports.deletelist = (id) => {
  return List.findOneAndDelete({ _id: id });
};

module.exports.deleteacordaofromlist = (listId, acId) => {
  return List.updateOne(
    { _id: listId },
    { $pull: { acordaos: { id_acordao: acId } } }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
