const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //на чьй странице находится комментарий
    pageId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //Кто оставил комментарий
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // createdAt: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
)

module.exports = model('Comment', schema)
