const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    completedMettings: Number,
    image: String,
    profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
    qualities: {},
    rate: Number,
    sex: { type: String, enum: ['male', 'femal', 'other '] },
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', schema)
