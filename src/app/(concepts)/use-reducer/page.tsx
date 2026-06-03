"use client"
import { useReducer, useState } from "react";
import reducer from "./reducer";

export default function UseReducerApp() {

    const [state, dispatch] = useReducer(reducer, 0);
    const [value, setValue] = useState(0)

    const handleSet = () => {
        dispatch({ type: 'Set', payload: +value })
        setValue(0)
    }
    const handleDecreament = () => {
        dispatch({ type: 'DECREMENT', payload: +value })
        setValue(0)
    }
    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT', payload: +value })
        setValue(0)
    }
    const handleReset = () => {
        dispatch({ type: 'RESET', payload: +value })
        setValue(0)
    }

    return (
        <div className="container">
            <div className="counter-display">
                <h1>Count : {state}</h1>
                <div className="btn">
                    <div className="item first">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                            className="input-box" />
                        <button
                            onClick={handleSet}
                            className='btn-btn'
                        >SetValue
                        </button>
                    </div>
                    <div className="item">
                        <button
                            onClick={handleDecreament}
                            className="item-btn"
                            disabled={state === 0}
                        >Decreament</button>


                        <button
                            onClick={handleIncrement}
                            className="item-btn"
                        >Increment
                        </button>
                    </div>
                    <button
                        className="item second btn-btn"
                        onClick={handleReset}
                    >Reset
                    </button>
                </div>
            </div>

        </div>
    )
}