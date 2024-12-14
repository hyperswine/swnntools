import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaMusic, FaDrum, FaClock } from 'react-icons/fa' // Importing new icons

const PianoExercises = () => {
  const fingerExercises = [
    {
      title: "Five-Finger Sequence",
      description: "Start with thumb (1) on C, play C-D-E-F-G-F-E-D-C using fingers 1-2-3-4-5-4-3-2-1",
      notation: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" className="w-full h-32">
          <g transform="translate(20,30)">
            <path d="M0,20 H360 M0,30 H360 M0,40 H360 M0,50 H360 M0,60 H360" stroke="currentColor" />
            <circle cx="20" cy="55" r="5" fill="currentColor" />
            <circle cx="60" cy="50" r="5" fill="currentColor" />
            <circle cx="100" cy="45" r="5" fill="currentColor" />
            <circle cx="140" cy="40" r="5" fill="currentColor" />
            <circle cx="180" cy="35" r="5" fill="currentColor" />
            <circle cx="220" cy="40" r="5" fill="currentColor" />
            <circle cx="260" cy="45" r="5" fill="currentColor" />
            <circle cx="300" cy="50" r="5" fill="currentColor" />
            <circle cx="340" cy="55" r="5" fill="currentColor" />
            <text x="15" y="80" fontSize="12">1</text>
            <text x="55" y="80" fontSize="12">2</text>
            <text x="95" y="80" fontSize="12">3</text>
            <text x="135" y="80" fontSize="12">4</text>
            <text x="175" y="80" fontSize="12">5</text>
            <text x="215" y="80" fontSize="12">4</text>
            <text x="255" y="80" fontSize="12">3</text>
            <text x="295" y="80" fontSize="12">2</text>
            <text x="335" y="80" fontSize="12">1</text>
          </g>
        </svg>
      ),
      tips: ["Start slowly", "Keep fingers curved", "Maintain even pressure"]
    },
    {
      title: "Alternating Thirds",
      description: "Play C-E (1-3), D-F (2-4), E-G (3-5). Then reverse the pattern.",
      tips: ["Focus on smooth transitions", "Keep both notes pressed equally", "Practice hands separately first"]
    },
    {
      title: "Chromatic Scale",
      description: "Play all notes in sequence using fingering 1-2-3-1-2-3-4-1-2-3-1-2-3-4-5",
      tips: ["Practice thumb-under technique", "Keep hand position steady", "Maintain consistent tempo"]
    }
  ]

  const rhythmExercises = [
    {
      title: "Simple Eighth Notes",
      description: "Play steady eighth notes: 1 & 2 & 3 & 4 &",
      notation: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" className="w-full h-32">
          <g transform="translate(20,30)">
            <path d="M0,30 H360" stroke="currentColor" />
            <line x1="0" y1="20" x2="0" y2="40" stroke="currentColor" />
            <line x1="90" y1="25" x2="90" y2="35" stroke="currentColor" />
            <line x1="180" y1="20" x2="180" y2="40" stroke="currentColor" />
            <line x1="270" y1="25" x2="270" y2="35" stroke="currentColor" />
            <line x1="360" y1="20" x2="360" y2="40" stroke="currentColor" />
            <path d="M22,30 L22,10 L30,10" stroke="currentColor" fill="none" />
            <circle cx="30" cy="10" r="5" fill="currentColor" />
            <path d="M52,30 L52,10 L60,10" stroke="currentColor" fill="none" />
            <circle cx="60" cy="10" r="5" fill="currentColor" />
            <path d="M112,30 L112,10 L120,10" stroke="currentColor" fill="none" />
            <circle cx="120" cy="10" r="5" fill="currentColor" />
            <path d="M142,30 L142,10 L150,10" stroke="currentColor" fill="none" />
            <circle cx="150" cy="10" r="5" fill="currentColor" />
            <text x="-10" y="60" fontSize="12">1</text>
            <text x="80" y="60" fontSize="12">2</text>
            <text x="170" y="60" fontSize="12">3</text>
            <text x="260" y="60" fontSize="12">4</text>
          </g>
        </svg>
      ),
      tips: ["Use metronome", "Count aloud", "Keep steady tempo"]
    },
    {
      title: "Syncopated Pattern",
      description: "Play: 1 (rest) & 2 & (rest) 4 &",
      tips: ["Start slow", "Feel the off-beats", "Gradually increase tempo"]
    },
    {
      title: "Triplet Exercise",
      description: "Play triplets on each beat: 1 tri-ple-let 2 tri-ple-let 3 tri-ple-let 4 tri-ple-let",
      tips: ["Count 'tri-ple-let'", "Keep triplets even", "Use metronome"]
    }
  ]

  const ExerciseCard = ({ exercise }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{exercise.title}</CardTitle>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {exercise.notation && (
          <div className="mb-4">
            {exercise.notation}
          </div>
        )}
        <div className="space-y-2">
          <h4 className="font-semibold">Practice Tips:</h4>
          <ul className="list-disc pl-6">
            {exercise.tips.map((tip, index) => (
              <li key={index} className="text-sm">{tip}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mini MIDI Keyboard Exercises</h1>

      <Tabs defaultValue="finger" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="finger" className="flex items-center gap-2">
            <FaMusic className="w-4 h-4" /> {/* Replacing PianoKey with FaMusic */}
            Finger Dexterity
          </TabsTrigger>
          <TabsTrigger value="rhythm" className="flex items-center gap-2">
            <FaDrum className="w-4 h-4" /> {/* Replacing MusicNote with FaDrum */}
            Rhythm
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finger" className="mt-4">
          <div className="space-y-4">
            {fingerExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rhythm" className="mt-4">
          <div className="space-y-4">
            {rhythmExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <FaClock className="w-6 h-6 text-blue-600" /> {/* Replacing Timer with FaClock */}
            <div>
              <h3 className="font-semibold mb-2">Practice Tips</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Start slowly and gradually increase speed as you become comfortable</li>
                <li>Always use a metronome to maintain steady timing</li>
                <li>Practice each hand separately before combining them</li>
                <li>Focus on maintaining evenness and clarity in your playing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PianoExercises