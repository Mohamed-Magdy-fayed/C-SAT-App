const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    code: {
      type: Number,
      required: [true, 'Please add a code'],
      unique: true,
    },
    questions: {
      type: Array,
      required: [true, 'Please add a question'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Service', serviceSchema)
