import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  wx_id: {
    type: String,
    unique: true,
    reqire: true
  },
  password: {
    type: String,
    reqire: true
  },
  nickname: {
    type: String
  },
  email: {
    type: String,
    reqire: true
  },
  create_time: {
    type: String
  },
  last_login_time: {
    type: String
  },
  articleColections: [{
    cid: String,
    title: String,
    images: [""],
    desc: String
  }],
  commodityColections: [{
    cid: String,
    title: String,
    images: [""],
    desc: String
  }]
})

export default mongoose.model('user', UserSchema)