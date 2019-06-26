const express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// USERS
// Login
router.post('/login', async (req, res) => {
  try {
    if (
      req.body.email === process.env.ADMIN_EMAIL &&
      req.body.password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json('admin');
    } else if (req.body.email === process.env.ADMIN_EMAIL) {
      return res.status(401).json('bad password');
    } else {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) {
        return res.status(401).json('no email');
      }
      let checkPass = await bcrypt.compare(req.body.password, user.password);
      if (!checkPass) {
        return res.status(401).json('bad password');
      }
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

/* // Gel all users
router.get('/api/users', async (req, res, next) => {
  checkAuth;
  let users;
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const usersQuery = User.find();
  let usersCount;
  try {
    if (pageSize && currentPage) {
      usersQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    usersCount = await User.countDocuments();
    users = await usersQuery.sort('firstName');
    res
      .status(200)
      .json({ message: 'success', users: users, count: usersCount });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Admin Create User
router.post('/api/admin/user', async (req, res, next) => {
  checkAuth;
  let hashedPass = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      regionId: req.body.regionId
    });
    const result = await user.save();
    res.status(201).json({ message: 'User created!', user: result });
  } catch (error) {
    res.status(500).json({ message: 'Creating a user failed!' });
  }
});

// NAMESTI DA BUDE PUT A NE POST!!!
// Admin Edit User
router.post('/api/admin/user/:_id', async (req, res, next) => {
  checkAuth;
  try {
    let submittedUser = await User.findById(req.params._id);
    submittedUser.name = req.body.name;
    submittedUser.email = req.body.email;
    submittedUser.password = req.body.password;
    submittedUser.regionId = req.body.regionId;
    const savedUser = await submittedUser.save();
    res.status(200).json({ message: 'User edited.', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Couldn't update user!" });
  }
});
// Admin Delete User
router.delete('/api/admin/user/:_id', async (req, res, next) => {
  checkAuth;
  try {
    const result = await User.deleteOne({ _id: req.params._id });
    res.status(200).json({ message: 'User deleted.', user: result });
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete user!" });
  }
}); */

module.exports = router;
