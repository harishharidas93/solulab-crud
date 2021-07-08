const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const URI = "mongodb+srv://test_user:test_pass@cluster0-n9qah.mongodb.net/test?retryWrites=true&w=majority";
const userModel = require('./model/user.model')
const moment = require('moment')
module.exports = router;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

router.get('/user', async function (req, res) {
  try {
    // Getting the records
    let result = await userModel.find({}).lean()
    // Converting date to IST
    result = result.map((x) => {
      if (x.dob) {
        x.dob = moment(x.dob).utcOffset("+05:30").format()
      }
      if (x.createdAt) {
        x.createdAt = moment(x.createdAt).utcOffset("+05:30").format()
      }
      return x
    })
    res.status(200).json(result)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.put('/user', async function (req, res) {
  try {
    let record = req.body
    // Creating the record
    await userModel.create(record)
    res.status(200).send('success')
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.delete('/user', async function (req, res) {
  try {
    let { deleteId } = req.body
    // Deleting the record based on deleteId
    const result = await userModel.deleteOne({ id: deleteId })
    res.status(200).send('success')
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// As post is common, not using simply user for route
router.post('/update_user', async function (req, res) {
  try {
    let record = req.body
    // Will update based on id, all keys in record will be updated.
    await userModel.updateOne({id:{$eq:record.id}}, record)
    res.status(200).send('success')
  } catch (err) {
    res.status(400).send(err.message)
  }
})
