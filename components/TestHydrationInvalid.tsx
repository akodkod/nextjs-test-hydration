"use client"

import { useState } from "react"

const Sizes = ["small", "medium", "large"] as const
type Size = typeof Sizes[number]

const SizeLocalStorageKey = "size"
const SizeInitialValue: Size = "medium"

export default function TestHydrationInvalid() {
  const [size, setSize] = useLocalStorageState<Size>(SizeLocalStorageKey, SizeInitialValue)

  // Server output: undefined
  // Client output: "medium"
  console.log(size)

  return (
    <div>
      {Sizes.map((s) => (
        <button
          key={s}
          onClick={() => setSize(s)}
          className={`px-4 py-2 m-2 rounded ${
            s === size ? "bg-blue-500" : "bg-blue-200"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return undefined

    const storedValue = window.localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue
  })

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
    window.localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}
