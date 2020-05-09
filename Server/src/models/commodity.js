import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommoditySchema = new Schema({
  id: {
    type: String,
    unique: true,
    reqire: true
  },
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  images: [""],
  description: [{
    para: String,
    image: String
  }],
  create_time: {
    type: String,
    require: true
  },
  last_update_time: {
    type: String
  },
  viewCount: {
    type: Number
  },
  likeCount: {
    type: Number
  },
  collectionCount: {
    type: Number
  }
})

export default mongoose.model('user', CommoditySchema)