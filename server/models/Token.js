const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    user: {
      type: Schema.Types.Array.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Token', schema)
