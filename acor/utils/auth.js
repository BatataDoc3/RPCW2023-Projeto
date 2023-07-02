const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

async function comparePasswords(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function getToken(user) {
  const { username } = user;
  return jwt.sign({ username }, process.env.SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
}

function extractTokenFromHeaders(headers) {
  return headers.authorization.split(" ")[1];
}

function userClaimsFromToken(token) {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = {
  hashPassword,
  comparePasswords,
  getToken,
  extractTokenFromHeaders,
  userClaimsFromToken,
};
