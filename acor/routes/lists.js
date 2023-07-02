const express = require("express");
const router = express.Router();
var Lists = require("../controllers/list");

/* GET home page. */
router.get("/", function (req, res, next) {
  let username = req.query.username;
  let listId = req.query.listId;
  if (listId) {
    Lists.getlist(listId)
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro ao mostrar a lista: ${err}`);
      });
  } else {
    Lists.listlistsbyusername(username)
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro na listagem das listas: ${err}`);
      });
  }
});

router.post("/", function (req, res, next) {
  let listId = req.query.listId;
  if (listId) {
    Lists.addacordao(listId, req.body)
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro ao alterar a lista: ${err}`);
      });
  } else {
    Lists.addlist(req.body)
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send(`Erro ao acrescentar uma lista: ${err}`);
      });
  }
});

router.delete("/", function (req, res, next) {
  let acordaoId = req.query.acordaoId;
  let listId = req.query.listId;
  Lists.deleteacordaofromlist(listId, acordaoId)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao eliminar acórdão da lista: ${err}`);
    });
});

router.delete("/:id", function (req, res, next) {
  Lists.deletelist(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao eliminar a lista da BD: ${err}`);
    });
});

module.exports = router;
