const router = require('express').Router();
const TodoList = require('../models/todoListModel');
const verifyToken = require('../verifyToken');
// GET ALL TODO LIST
router.get('/', verifyToken, async (req, res) => {
  const query = req.query.sort;
  const {
    user: { _id: id },
  } = req.user;
  try {
    const todolist =
      query === 'asc'
        ? await TodoList.find({ user: id })
        : await TodoList.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json(todolist);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

//CREATE NEW TODO
router.post('/', verifyToken, async (req, res) => {
  try {
    const todolist = new TodoList(req.body);

    const savedTodoList = await todolist.save();

    res.status(201).json(savedTodoList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE TODO
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const todoId = req.params.id;

    const todoItem = await TodoList.findById(todoId);

    if (!todoItem) return res.status(404).json('Todo could not find.');

    await todoItem.remove();

    res.status(200).json('Todo item has been deleted successfully.');
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json('Todo could not find');
    }
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE TODO
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await TodoList.findByIdAndUpdate(
      todoId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json('Todo could not find.');
    }
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
