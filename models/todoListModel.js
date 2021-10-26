const mongoose = require('mongoose');

const TodoListSchema = mongoose.Schema(
  {
    description: { type: 'String', required: true },
    status: { type: 'String', required: true, default: 'waiting' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TodoList', TodoListSchema);
