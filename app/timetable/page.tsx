import React from 'react'

const Schedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = ['Morning', 'Afternoon', 'Evening']
  const activities = [
    'Music Practice', 'Music Theory',
    'Painting Practice', 'Painting Theory',
    'Programming Practice', 'Programming Theory',
    'Science Theory', 'Science Practice'
  ]

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Adaptive Flexible Weekly Schedule</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Time / Day</th>
            {days.map(day => (
              <th key={day} className="border border-gray-300 p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot}>
              <td className="border border-gray-300 p-2 font-bold">{slot}</td>
              {days.map((day, index) => (
                <td key={`${day}-${slot}`} className="border border-gray-300 p-2">
                  {activities[index % activities.length]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Adaptive Notes:</h3>
        <ul className="list-disc pl-5">
          <li>Feeling stressed? Rotate to the next activity sooner</li>
          <li>Feeling focused? Keep going with the activity until you&apos;re satisfied</li>
          <li>Feeling obsessed without progress? Consider switching to a different activity</li>
          <li>Energy low? Choose a less demanding activity or take a short break</li>
        </ul>
      </div>
    </div>
  )
}

export default Schedule