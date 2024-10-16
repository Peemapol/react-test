'use client'

import React, { useState } from 'react'

interface CounterProps {
  initialCount?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {

  const [count, setCount] = useState<number>(initialCount)

  const increment = (): void => {
    setCount((prev) => prev + 1)
  }

  const decrement = (): void => {
    setCount((prev) => prev - 1)
  }

  const restart = (): void => {
    setCount(0)
  }

  const switchSign = (): void => {
    setCount((prev) => prev * -1)
  }

  return(
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <div>
        <button onClick={increment}> Increment</button>
        <button onClick={decrement}> Decrement</button>
        <button onClick={restart}> Set 0</button>
        <button onClick={switchSign}> Switch Sign</button>
      </div>
    </div>
  )
}

export default Counter
