const TodoListReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TODOLIST_START':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'GET_TODOLIST_SUCCESS':
      return {
        ...state,
        todoList: action.payload,
        isFetching: false,
        error: null,
      };
    case 'GET_TODOLIST_ERROR':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'ADD_TODO_START':
      return {
        ...state,
        error: null,
      };
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        todoList:
          state.sort === 'asc'
            ? [...state.todoList, action.payload]
            : [action.payload, ...state.todoList],
        isFetching: false,
        error: null,
      };
    case 'ADD_TODO_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case 'REMOVE_TODO_START':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'REMOVE_TODO_SUCCESS':
      return {
        todoList: state.todoList.filter(
          (todo) => String(todo._id) !== String(action.payload)
        ),
        isFetching: false,
        error: null,
      };
    case 'REMOVE_TODO_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case 'SORT_TODOLIST_SUCCESS':
      return {
        ...state,
        sort: action.payload,
      };
    case 'UPDATE_TODO_START':
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case 'UPDATE_TODO_SUCCESS':
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }
          return todo;
        }),
        isFetching: false,
        error: null,
      };
    case 'UPDATE_TODO_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default TodoListReducer;
