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

// Gel all users
router.get('/admin/users', async (req, res, next) => {
  // checkAuth;
  // let users;
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
  // const usersQuery = User.find();
  // let usersCount;
  try {
    // if (pageSize && currentPage) {
    //   usersQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    // }
    // usersCount = await User.countDocuments();
    users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Admin Create User
router.post('/admin/newUser', async (req, res, next) => {
  // checkAuth;
  let hashedPass = await bcrypt.hash(req.body.password, 10);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      emailPassword: req.body.emailPassword,
      password: hashedPass,
      region: req.body.region,
      status: req.body.status
    });
    const result = await user.save();
    res.status(201).json({ success: 'ok' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Admin Edit/Delete User
router.post('/admin/editUser/:_id', async (req, res, next) => {
  // checkAuth;
  try {
    let submittedUser = await User.findById(req.params._id);
    submittedUser.name = req.body.name;
    submittedUser.email = req.body.email;
    submittedUser.password = req.body.password;
    submittedUser.emailPassword = req.body.emailPassword;
    submittedUser.region = req.body.region;
    submittedUser.status = req.body.status;
    const savedUser = await submittedUser.save();
    res.status(200).json({ success: 'ok' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
