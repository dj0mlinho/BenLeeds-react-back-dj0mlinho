const express = require('express');
const Item = require('../models/item');

const router = express.Router();

// Get Items from Room
router.get('/admin/rooms/:room', async (req, res, next) => {
  // const pageSize = +req.query.pagesize;
  // const currentPage = +req.query.page;
  // const itemsQuery = Item.find();
  try {
    // if (pageSize && currentPage) {
    //   itemsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    // }
    // const itemsCount = await Item.countDocuments();
    const result = await Item.find();
    console.log(result);
    const items = result
      .filter(item => {
        return item.room.toLowerCase() == req.params.room.toLowerCase();
      })
      .sort();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

// // Reset All Items Status
// router.get('/api/itemsReset', async (req, res, next) => {
//   const items = await Item.find();
//   for (let i = 0; i < items.length; i++) {
//     items[i].status = 'ready';
//     items[i].quantity = null;
//     items[i].comment = '';
//     items[i].save();
//   }
//   res.status(200).json({ message: 'success', items: items });
// });

// // User Edit Item
// router.post('/api/items/:id', async (req, res, next) => {
//   let submittedItem = await Item.findById(req.params.id);

//   if (req.body.status) {
//     submittedItem.status = 'fixing';
//     submittedItem.quantity = req.body.item.quantity;
//     submittedItem.comment = req.body.item.comment;
//   } else {
//     submittedItem.status = 'ready';
//     submittedItem.quantity = null;
//     submittedItem.comment = '';
//   }
//   const savedItem = await submittedItem.save();
//   res.status(200).json({ message: 'success', item: savedItem });
// });

// // Create New Item
router.post('/admin/newItem', async (req, res, next) => {
  try {
    const item = new Item({
      name: req.body.name,
      subCategory: req.body.subCategory,
      room: req.body.room,
      price: Number(req.body.price),
      link: req.body.link
    });
    const result = await item.save();
    res.status(200).json({ success: 'ok' });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

// Admin Edit Items
router.post('/admin/editItem/:id', async (req, res, next) => {
  try {
    let submittedItem = await Item.findById(req.params.id);
    submittedItem.name = req.body.name;
    submittedItem.subCategory = req.body.subCategory;
    submittedItem.price = Number(req.body.price);
    submittedItem.room = req.body.room;
    submittedItem.link = req.body.link;
    const savedItem = await submittedItem.save();
    res.status(200).json({ success: 'ok' });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

// Admin Delete Items
router.post('/admin/items/:id', async (req, res, next) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: 'ok' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
