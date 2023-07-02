const express = require("express");
const auth = require("../utils/auth");
const router = express.Router();
const User = require("../controllers/user");

/* GET user by username. */
router.get("/:username", function (req, res, next) {
  const { username } = auth.userClaimsFromToken(
    auth.extractTokenFromHeaders(req.headers)
  );
  console.log(username);
  if (username !== req.params.username) {
    User.getByUsername(username).then((user) => {
      if (user && user.role === "ADMIN") {
        User.getByUsername(req.params.username).then((user) => {
          if (user) {
            console.log(user);
            res.send(user);
          } else {
            res.status(404);
            next({ status: 404, response: "User not found" });
          }
        });
      } else {
        res.status(401);
        next("Unauthorized");
      }
    });
  } else {
    User.getByUsername(req.params.username).then((user) => {
      if (user) {
        console.log(user);
        res.send(user);
      } else {
        res.status(404);
        next("User not found");
      }
    });
  }
});

/* POST to add user */
router.post("/", function (req, res, next) {
  User.getByUsername(req.body.username).then(async (user) => {
    if (user) {
      console.log(user);
      res.status(409);
      next("Username already exists");
    } else {
      User.getByEmail(req.body.email).then(async (user) => {
        if (user) {
          console.log(user);
          res.status(409);
          next("Email already exists");
        } else {
          User.createUser(req.body)
            .then(async ({ password, ...user }) => {
              console.log(user);
              res.send({ token: await auth.getToken(user), user });
            })
            .catch((err) => {
              res.status(500);
              next(err);
            });
        }
      });
    }
  });
});

/* PUT to promote user by username */
router.put("/promote/:username", function (req, res, next) {
  console.log(req.headers);
  const { username } = auth.userClaimsFromToken(
    auth.extractTokenFromHeaders(req.headers)
  );
  //console.log(username);
  User.getByUsername(username).then((user) => {
    if (user && user.role === "ADMIN") {
      User.promoteUser(req.params.username)
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          next(err);
        });
    } else {
      res.status(401);
      next("Unauthorized");
    }
  });
});

/* PUT to demote user by username */
router.put("/demote/:username", function (req, res, next) {
  const { username } = auth.userClaimsFromToken(
    auth.extractTokenFromHeaders(req.headers)
  );
  User.getByUsername(username).then((user) => {
    if (user && user.role === "ADMIN") {
      User.demoteUser(req.params.username)
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500);
          next(err);
        });
    } else {
      res.status(401);
      next("Unauthorized");
    }
  });
});

/* PUT to update user by username */
router.put("/:username", function (req, res, next) {
  console.log("Entrei");
  if (
    auth.userClaimsFromToken(auth.extractTokenFromHeaders(req.headers))
      .username !== req.params.username
  ) {
    res.status(401);
    next("Unauthorized");
  }
  if (req.body.password) {
    req.body.password = auth.hashPassword(req.body.password).then((hash) => {
      req.body.password = hash;
      User.updateUser(req.params.username, req.body)
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          next(err);
        });
    });
  } else {
    console.log(req.body);
    User.updateUser(req.params.username, req.body)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        next(err);
      });
  }
});

/* DELETE to delete user by username */
router.delete("/:username", function (req, res, next) {
  const { username } = auth.userClaimsFromToken(
    auth.extractTokenFromHeaders(req.headers)
  );
  User.getByUsername(username).then((user) => {
    if (user && user.role === "ADMIN") {
      User.deleteUser(req.params.username)
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(401);
      next("Unauthorized");
    }
  });
});

module.exports = router;
