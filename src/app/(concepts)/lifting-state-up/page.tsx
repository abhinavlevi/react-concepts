"use client"
import React, { useState } from 'react'
import CounterDisplay from './ConterDisplay'
import CounterButton from './CounterButton'


export default function page() {

    const [count, setCount] = useState(0)

    const handlePlusCount = (value: number) => {
        setCount(prev => prev + value)
    }

    const handleMinusCount = (value: number) => {
        setCount(prev => prev - value)
    }

    return (
        <>
            <CounterDisplay count={count} />
            <CounterButton
                handlePlusCount={handlePlusCount}
                handleMinusCount={handleMinusCount}
            />
        </>
    )
}