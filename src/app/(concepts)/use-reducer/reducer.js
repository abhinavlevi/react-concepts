export default function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter(
          todo => todo.id !== action.payload
        ),
      };

    case "CLEAR":
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}