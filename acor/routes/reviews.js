const express = require("express");
const router = express.Router();
const axios = require("axios");
var Reviews = require('../controllers/review')

/* GET home page. */
router.get("/", function (req, res, next) {
  let page = req.query.page;
  let orderBy = req.query.orderBy;
  let keywords = req.query.keywords;
  Reviews.listreviews(page,orderBy,keywords)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro na listagem das reviews: ${err}`);
    });
});

router.get('/:id', function(req, res, next) {
  Reviews.getreview(req.params.id)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao mostrar a review: ${err}`);
    });
});

router.post('/', function(req, res, next) {
  Reviews.addreview(req.body)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao acrescentar uma review à BD: ${err}`);
    });
});

//router.post('/accept/:id', function(req, res, next) {
//  axios.get(`http://localhost:5555/reviews/${req.params.id}`)
//    .then(res => {
//      const review = res.data;
//
//      if (review.adicionar) {
//        axios.post('http://localhost:5555/acordaos', review)
//          .then(data => res.send(data))
//          .catch((err) => {
//            console.log(err);
//            res.status(500).send(`Erro ao acrescentar uma review à BD: ${err}`);
//          });
//      }
//      else {
//        axios.put(`http://localhost:5555/acordaos/${review.id_acordao}`, review)
//          .then(data => res.send(data))
//          .catch((err) => {
//            console.log(err);
//            res.status(500).send(`Erro ao acrescentar uma review à BD: ${err}`);
//          });
//      }
//    })
//    .catch((err) => {
//      console.log(err);
//      res.status(500).send(`Erro ao mostrar a review: ${err}`);
//    });
//
//    axios.delete(`http://localhost:5555/reviews/${req.params.id}`)
//      .then(data => res.send(data))
//      .catch((err) => {
//        console.log(err);
//        res.status(500).send(`Erro ao eliminar a review da BD: ${err}`);
//      }
//    );
//});

router.post('/accept/:id', function(req, res, next) {
  const reviewId = req.params.id;
  const reviewPromise = axios.get(`http://localhost:5555/reviews/${reviewId}`)
    .then(response => {
      const review = response.data;

      if (review.adicionar) {
        return axios.post('http://localhost:5555/acordaos', review)
          .then(reviewResponse => {
            // Execute the delete operation after the POST operation
            return axios.delete(`http://localhost:5555/reviews/${reviewId}`)
              .then(deleteResponse => {
                return { review: reviewResponse.data, delete: deleteResponse.data };
              });
          });
      } else {
        console.log(review.id_acordao);
        return axios.put(`http://localhost:5555/acordaos/${review.id_acordao}`, review)
          .then(reviewResponse => {
            // Execute the delete operation after the PUT operation
            return axios.delete(`http://localhost:5555/reviews/${reviewId}`)
              .then(deleteResponse => {
                return { review: reviewResponse.data, delete: deleteResponse.data };
              });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao mostrar a review: ${err}`);
    });

  reviewPromise
    .then(result => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao processar as requisições: ${err}`);
    });
});



router.delete('/:id', function(req, res, next) {
  Reviews.deletereview(req.params.id)
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Erro ao eliminar a review da BD: ${err}`);
    });
});

module.exports = router;
