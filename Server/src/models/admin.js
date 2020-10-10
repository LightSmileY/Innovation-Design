import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  id: {
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
  }
})

export default mongoose.model('user', AdminSchema)