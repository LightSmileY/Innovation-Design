import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  id: {
    type: String,
    unique: true,
    reqire: true
  },
  title: {
    type: String,
    reqire: true
  },
  type: {
    type: Number,
    reqire: true
  },
  content: [{
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
    type: Number,
    default: 0
  }
})

export default mongoose.model('article', ArticleSchema)