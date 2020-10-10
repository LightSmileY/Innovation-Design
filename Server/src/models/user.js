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
  articleLikes: [{
    aid: {
      type: String,
      unique: true
    }
  }],
  medicLikes: [{
    mid: {
      type: String,
      unique: true
    }
  }],
  articleCollections: [{
    aid: {
      type: String,
      unique: true
    }
  }],
  medicCollections: [{
    mid: {
      type: String,
      unique: true
    }
  }]
})

export default mongoose.model('user', UserSchema)