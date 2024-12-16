'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Search } from 'lucide-react'

const ChordDiagram = ({ name, positions, fingering }) => {
  const frets = 4
  const strings = 4

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <svg viewBox="0 0 100 120" className="w-24 h-32">
        {/* Nut */}
        <line x1="20" y1="20" x2="80" y2="20" stroke="black" strokeWidth="2" />

        {/* Frets */}
        {[...Array(frets)].map((_, i) => (
          <line
            key={`fret-${i}`}
            x1="20"
            y1={40 + i * 20}
            x2="80"
            y2={40 + i * 20}
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* Strings */}
        {[...Array(strings)].map((_, i) => (
          <line
            key={`string-${i}`}
            x1={20 + i * 20}
            y1="20"
            x2={20 + i * 20}
            y2="100"
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* Positions */}
        {positions.map((pos, i) => {
          if (pos === 0) {
            return (
              <circle
                key={`pos-${i}`}
                cx={20 + i * 20}
                cy="15"
                r="3"
                fill="none"
                stroke="black"
                strokeWidth="1"
              />
            )
          } else if (pos > 0) {
            return (
              <circle
                key={`pos-${i}`}
                cx={20 + i * 20}
                cy={30 + (pos - 1) * 20}
                r="6"
                fill="black"
              />
            )
          }
          return null
        })}
      </svg>
      <div className="text-sm text-gray-600 mt-2">
        Fingering: {fingering.join('-')}
      </div>
    </div>
  )
}

const CHORD_DATA = {
  major: [
    { name: 'C', positions: [0, 0, 0, 3], fingering: [0, 0, 0, 3] },
    { name: 'F', positions: [2, 0, 1, 0], fingering: [2, 0, 1, 0] },
    { name: 'G', positions: [0, 2, 3, 2], fingering: [0, 2, 3, 1] },
    { name: 'A', positions: [2, 1, 0, 0], fingering: [2, 1, 0, 0] },
    { name: 'D', positions: [2, 2, 2, 0], fingering: [2, 3, 1, 0] },
    { name: 'E', positions: [4, 4, 4, 2], fingering: [3, 4, 2, 1] },
    { name: 'B', positions: [4, 3, 2, 2], fingering: [4, 3, 1, 2] }
  ],
  minor: [
    { name: 'Am', positions: [2, 0, 0, 0], fingering: [2, 0, 0, 0] },
    { name: 'Dm', positions: [2, 2, 1, 0], fingering: [2, 3, 1, 0] },
    { name: 'Em', positions: [0, 4, 3, 2], fingering: [0, 4, 3, 1] },
    { name: 'Bm', positions: [4, 2, 2, 2], fingering: [4, 1, 2, 3] }
  ],
  seventh: [
    { name: 'C7', positions: [0, 0, 0, 1], fingering: [0, 0, 0, 1] },
    { name: 'F7', positions: [2, 3, 1, 0], fingering: [2, 3, 1, 0] },
    { name: 'G7', positions: [0, 2, 1, 2], fingering: [0, 2, 1, 3] },
    { name: 'A7', positions: [0, 1, 0, 0], fingering: [0, 1, 0, 0] }
  ]
}

const PracticeRoutine = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Daily Practice Routine (30 mins)</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-medium">Warm-up (5 mins)</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>Finger stretches and exercises</li>
            <li>Single string picking practice</li>
            <li>Basic chord transitions</li>
          </ul>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-medium">Chord Practice (10 mins)</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>Practice new chords slowly</li>
            <li>Work on smooth transitions</li>
            <li>Use a metronome for timing</li>
          </ul>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h4 className="font-medium">Strumming Patterns (10 mins)</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>Basic down strums</li>
            <li>Down-up patterns</li>
            <li>Island strum: D-DU-UDU</li>
          </ul>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <h4 className="font-medium">Song Practice (5 mins)</h4>
          <ul className="list-disc list-inside text-gray-600">
            <li>Practice current song</li>
            <li>Focus on problem sections</li>
            <li>Record and review</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Chord Progressions</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-medium">C - G - Am - F (I-V-vi-IV)</h4>
          <p className="text-gray-600">This is incredibly common in pop music.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-medium">C - Am - F - G (I-vi-IV-V)</h4>
          <p className="text-gray-600">Another popular progression with a slightly different feel.</p>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h4 className="font-medium">G - D - Em - C (I-V-vi-IV)</h4>
          <p className="text-gray-600">A common progression in many genres.</p>
        </div>
        <div className="border-l-4 border-yellow-500 pl-4">
          <h4 className="font-medium">C - G7 - C (I-V7-I)</h4>
          <p className="text-gray-600">The addition of the 7th chord adds a bit of color.</p>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Strumming Patterns</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-medium">Down-Up-Down-Up</h4>
          <p className="text-gray-600">This is a versatile pattern that works well for many songs.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-medium">Down-Down-Up-Up-Down</h4>
          <p className="text-gray-600">This pattern adds a bit more rhythmic interest.</p>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Changing the Key and Tempo</h3>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h4 className="font-medium">Changing the Key</h4>
          <p className="text-gray-600">Practice playing progressions in different keys. Use a key chart, transpose familiar songs, and practice scales in new keys.</p>
        </div>
        <div className="border-l-4 border-green-500 pl-4">
          <h4 className="font-medium">Setting a Tempo</h4>
          <p className="text-gray-600">Use a metronome to set and maintain a consistent tempo. Start slow, gradually increase speed, and stay relaxed.</p>
        </div>
      </div>
    </div>
  </div>
)

const UkuleleReference = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filterChords = (chords) => {
    return chords.filter(chord =>
      chord.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Ukulele Reference Guide</h1>

      <Tabs defaultValue="chords">
        <TabsList className="w-full justify-center mb-6">
          <TabsTrigger value="chords">Chord Library</TabsTrigger>
          <TabsTrigger value="practice">Practice Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="chords">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search chords..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Major Chords</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filterChords(CHORD_DATA.major).map(chord => (
                  <ChordDiagram key={chord.name} {...chord} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Minor Chords</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filterChords(CHORD_DATA.minor).map(chord => (
                  <ChordDiagram key={chord.name} {...chord} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Seventh Chords</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filterChords(CHORD_DATA.seventh).map(chord => (
                  <ChordDiagram key={chord.name} {...chord} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <PracticeRoutine />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UkuleleReference