'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const RandomOptionSelector = () => {
  const [options, setOptions] = useState([])
  const [newOption, setNewOption] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const addOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption.trim()])
      setNewOption('')
    }
  }

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index)
    setOptions(updatedOptions)
  }

  const selectRandomOption = () => {
    if (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length)
      setSelectedOption(options[randomIndex])
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Random Option Selector</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Enter an option"
          className="flex-grow mr-2"
        />
        <Button onClick={addOption}>Add</Button>
      </div>
      <ul className="mb-4">
        {options.map((option, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <span>{option}</span>
            <Button variant="destructive" size="sm" onClick={() => removeOption(index)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={selectRandomOption} className="w-full mb-4" disabled={options.length === 0}>
        Select Random Option
      </Button>
      {selectedOption && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-bold">Selected Option:</p>
          <p>{selectedOption}</p>
        </div>
      )}
    </div>
  )
}

export default RandomOptionSelector