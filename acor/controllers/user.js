const auth = require("../utils/auth");
const User = require("../models/user");

async function getByUsername(username) {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return user.toJSON();
    }
    return user;
  } catch (err) {
    return err;
  }
}

async function getByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return user.toJSON();
    }
    return user;
  } catch (err) {
    return err;
  }
}

async function createUser(user) {
  try {
    user.role = "USER";
    user.registeredOn = new Date();
    user.password = await auth.hashPassword(user.password);
    let res = await new User({ ...user }).save();
    return res.toJSON();
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function promoteUser(username) {
  try {
    const res = await User.findOneAndUpdate(
      { username: username },
      { role: "MODERADOR" },
      { new: true }
    );
    return res.toJSON();
  } catch (err) {
    return err;
  }
}

async function demoteUser(username) {
  try {
    const res = await User.findOneAndUpdate(
      { username: username },
      { role: "USER" },
      { new: true }
    );
    return res.toJSON();
  } catch (err) {
    return err;
  }
}

async function deleteUser(username) {
  try {
    const res = User.findOneAndRemove({ username: username });
    return res;
  } catch (err) {
    return err;
  }
}

async function updateUser(username, user) {
  try {
    const res = User.findOneAndUpdate(
      { username: username },
      { $set: { ...user } },
      {
        new: true,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

async function getUserTypeFromUsername(username) {
  try {
    const user = await getByUsername(username);
    return user.role;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getByUsername,
  createUser,
  deleteUser,
  updateUser,
  getUserTypeFromUsername,
  getByEmail,
  promoteUser,
  demoteUser,
};
