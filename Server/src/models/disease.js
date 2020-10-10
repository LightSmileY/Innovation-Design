import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DiseaseSchema = new Schema({
  id: {
    type: String,
    unique: true,
    reqire: true
  },
  img: {
    type: String,
    reqire: true
  },
  name: {
    type: String,
    reqire: true
  },
  type: {
    type: String,
    reqire: true
  },
  introduce: {
    type: String,
    reqire: true
  },
  highIncidence: {
    type: String,
    reqire: true
  },
  prevebtivetreat: {
    type: String,
    reqire: true
  },
  create_time: {
    type: String,
    require: true
  },
  last_update_time: {
    type: String
  }
})

export default mongoose.model('disease', DiseaseSchema)