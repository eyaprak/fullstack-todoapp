const express = require('express');
const app = express();
const dotenv = require('dotenv');
const TodoListRouter = require('./routes/todolist');
const AuthRouter = require('./routes/auth');
const connectDB = require('./db/connection');
const cors = require('cors');

app.use(cors());

dotenv.config();

app.use(express.json());

connectDB();

const port = process.env.PORT || 5000;

app.use('/api/todolist', TodoListRouter);
app.use('/api/auth', AuthRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port} port `);
});
