"use client"
import { useReducer, useState } from "react";
import reducer from "./reducer";

export default function UseReducerApp() {

    const initialState = {
        todos: [],
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const [todos, setTodos] = useState("");

    const handleSubmitBtn = () => {
        dispatch({ type: "ADD", payload: todos })
        console.log("aadded")
        setTodos("")
    }

    const handleRClear = () => {
        dispatch({ type: 'CLEAR' })
    }

    return (
        <div className="container p-8">
            <div className="border rounded border-gray-200 p-4 flex gap-4">
                <input name="todo" value={todos} onChange={(e) => setTodos(e.target.value)} className="border p-2 rounded" placeholder="Add TODO" />
                <button className="cursor-pointer bg-gray-200 p-2 border border-gray-300 rounded" onClick={handleSubmitBtn}>Add Todo</button>
            </div>

            <div>
                <button className="cursor-pointer bg-gray-200 p-2 border border-gray-300 rounded" onClick={handleRClear}>Clear Todo</button>
            </div>
            <ul>
                {state.todos.map(todo => (
                    <div key={todo.id}>
                        {todo.text}

                        <button
                            onClick={() =>
                                dispatch({
                                    type: "DELETE",
                                    payload: todo.id,
                                })
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </ul>

        </div>
    )
}