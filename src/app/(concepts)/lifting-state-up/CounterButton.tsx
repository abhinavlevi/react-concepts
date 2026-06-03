import React from 'react'

type CounterProps = {
    handlePlusCount: (value: number) => void,
    handleMinusCount: (value: number) => void
}

export default function CounterButton({ handlePlusCount, handleMinusCount }: CounterProps) {
    return (
        <>
            <button onClick={() => handlePlusCount(1)}> +1 </button>
            <button onClick={() => handleMinusCount(1)}> -1 </button>
        </>
    )
}
