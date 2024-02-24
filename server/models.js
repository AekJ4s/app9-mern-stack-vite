import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2' //สำหรับแบ่งเพจ

//* Connection
mongoose
  .connect('mongodb://localhost/db1')
  .then(() => {
    console.log('MongoDB Connected!')
  })
  .catch((e) => console.log({ message: e.message }))

//* Product Model
let productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  detail: String,
  date_added: {
    type: Date,
    default: Date.now(),
  },
})

productSchema.plugin(paginate) //สำหรับแบ่งเพจ

let Product = mongoose.model('Product', productSchema)

export { Product }
