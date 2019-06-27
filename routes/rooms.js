const express = require('express');
const Room = require('../models/room');

const router = express.Router();

router.get('/admin/newItem', async (req, res, next) => {
  try {
    const result = await Room.find();
    const rooms = result.map((res) => {
      return res.name;
    }).sort()
    console.log(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }

});

module.exports = router;
