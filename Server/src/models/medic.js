import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MedicSchema = new Schema({
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
  introduce: {
    type: String,
    require: true
  },
  careabout: {
    type: String,
    require: true
  },
  create_time: {
    type: String,
    require: true
  },
  last_update_time: {
    type: String
  },
  viewCount: {
    type: Number,
    default: 0
  }
})

export default mongoose.model('medic', MedicSchema)