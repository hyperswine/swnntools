'use client'

import React, { useState, useEffect, useRef } from 'react'

const Schedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = ['Morning', 'Afternoon', 'Evening']
  const initialActivities = [
    'Music Practice', 'Music Theory',
    'Painting Practice', 'Painting Theory',
    'Programming Practice', 'Programming Theory',
    'Science Theory', 'Science Practice'
  ]

  const [schedule, setSchedule] = useState(
    timeSlots.map(() => days.map(() => ''))
  )
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const tableRef = useRef(null)

  useEffect(() => {
    const savedSchedule = localStorage.getItem('schedule')
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule))
  }, [schedule])

  const handleCellChange = (slotIndex, dayIndex, value) => {
    const newSchedule = [...schedule]
    newSchedule[slotIndex][dayIndex] = value
    setSchedule(newSchedule)
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - tableRef.current.offsetLeft)
    setScrollLeft(tableRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - tableRef.current.offsetLeft
    const walk = (x - startX) * 2
    tableRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Interactive Adaptive Flexible Weekly Schedule</h2>
      <div
        className="overflow-x-auto cursor-grab"
        ref={tableRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <table className="w-full border-collapse border border-gray-300 min-w-max">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100 sticky left-0 z-10">Time / Day</th>
              {days.map(day => (
                <th key={day} className="border border-gray-300 p-2 bg-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slot}>
                <td className="border border-gray-300 p-2 font-bold bg-gray-100 sticky left-0 z-10">{slot}</td>
                {days.map((day, dayIndex) => (
                  <td key={`${day}-${slot}`} className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={schedule[slotIndex][dayIndex]}
                      onChange={(e) => handleCellChange(slotIndex, dayIndex, e.target.value)}
                      className="w-full p-1 border border-gray-200 rounded"
                      placeholder={initialActivities[(slotIndex * days.length + dayIndex) % initialActivities.length]}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Adaptive Notes:</h3>
        <ul className="list-disc pl-5">
          <li>Feeling stressed? Rotate to the next activity sooner</li>
          <li>Feeling focused? Keep going with the activity until you are satisfied</li>
          <li>Feeling obsessed without progress? Consider switching to a different activity</li>
          <li>Energy low? Choose a less demanding activity or take a short break</li>
        </ul>
      </div>
    </div>
  )
}

export default Schedule