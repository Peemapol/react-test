"use client"

import React, { useState } from "react"

interface CounterProps {
  initialCount?: number
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

  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="align-center text-5xl">
          Count: <span>{count}</span>
        </p>
      </div>
      <div>
        <button
          onClick={increment}
          className="m-10 rounded-xl border-[1px] border-solid border-gray-400 px-10 py-2 duration-200 hover:bg-gray-200"
          data-testid="button1"
        >
          {" "}
          Increment
        </button>
        <button
          onClick={decrement}
          className="m-10 rounded-xl border-[1px] border-solid border-gray-400 px-10 py-2 duration-200 hover:bg-gray-200"
          data-testid="button2"

        >
          {" "}
          Decrement
        </button>
        <button
          onClick={restart}
          className="m-10 rounded-xl border-[1px] border-solid border-gray-400 px-10 py-2 duration-200 hover:bg-gray-200"
          data-testid="button3"

        >
          {" "}
          Set 0
        </button>
        <button
          onClick={switchSign}
          className="m-10 rounded-xl border-[1px] border-solid border-gray-400 px-10 py-2 duration-200 hover:bg-gray-200"
          data-testid="button4"

        >
          {" "}
          Switch Sign
        </button>
      </div>
    </div>
  )
}

export default Counter
