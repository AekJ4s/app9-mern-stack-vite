import express from 'express'
import { Product } from '../models.js'

const router = express.Router()

//*  http://localhost:8000/api/db

router.post('/db/create', (req, res) => {
  let form = req.body
  let data = {
    name: form.name || '',
    price: form.price || 0,
    detail: form.detail || '',
  }

  Product.create(data)
    .then((docs) => {
      console.log('document saved')
      res.send(true)
    })
    .catch((err) => {
      console.log(err.message).send(false)
    })
})

router.get('/db/read', (req, res) => {
  Product.find()
    .exec()
    .then((docs) => res.json(docs))
})

router.post('/db/update', (req, res) => {
  let form = req.body
  let data = {
    name: form.name || '',
    price: form.price || 0,
    detail: form.detail || '',
    date_added: new Date(Date.parse(form.date_added)) || new Date(),
  }

  Product.findByIdAndUpdate(form._id, data, { useFindAndModify: false })
    .exec()
    .catch((err) => res.json({ message: err.message }))

  //หลังการอัปเดต ก็อ่านข้อมูลอีกครั้ง แล้วส่งไปแสดงผลที่ฝั่งโลคอลแทนข้อมูลเดิม
  Product.find()
    .exec()
    .then((docs) => res.json(docs))
})

router.post('/db/delete', (req, res) => {
  let _id = req.body._id

  Product.findByIdAndDelete(_id, { useFindAndModify: false })
    .exec()
    .catch((err) => res.json({ message: err.message }))

  Product.find()
    .exec()
    .then((docs) => res.json(docs))
})

router.get('/db/search', (req, res) => {
  let q = req.query.q || ''

  //กรณีนี้ให้กำหนด pattern ด้วย RegExp แทนการใช้ / /
  let pattern = new RegExp(q, 'ig')

  //จะค้นหาจากฟิลด์ name และ detail
  let conditions = {
    $or: [{ name: { $regex: pattern } }, { detail: { $regex: pattern } }],
  }

  let options = {
    page: req.query.page || 1, //เพจปัจจุบัน
    limit: 3, //แสดงผลหน้าละ 2 รายการ (ข้อมูลมีน้อย)
  }

  Product.paginate(conditions, options, (err, result) => {
    res.json(result)
  })
})

export default router
