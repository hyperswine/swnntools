'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Paintbrush, Eye, Box, Palette, Compass } from 'lucide-react'

const exerciseData = {
  fundamentals: {
    title: "Daily Fundamentals",
    icon: Paintbrush,
    exercises: [
      {
        name: "Color Mixing",
        description: "Mix different combinations of primary colors to create secondary and tertiary colors. Try to match specific colors from your environment.",
        timeEstimate: "15-20 min"
      },
      {
        name: "Value Scales",
        description: "Create grayscale from white to black, then practice making value scales for different colors.",
        timeEstimate: "10-15 min"
      },
      {
        name: "Brush Control",
        description: "Practice painting straight lines, curves, and various shapes to improve brush handling.",
        timeEstimate: "10 min"
      }
    ]
  },
  observation: {
    title: "Observational Skills",
    icon: Eye,
    exercises: [
      {
        name: "Still Life Studies",
        description: "Set up a simple object and paint/draw it from different angles.",
        timeEstimate: "20-30 min"
      },
      {
        name: "Timed Sketches",
        description: "Do quick 5-10 minute sketches of objects or scenes to improve speed and capture essentials.",
        timeEstimate: "5-10 min"
      },
      {
        name: "Light and Shadow",
        description: "Observe and paint how light falls on objects, focusing on highlights and shadows.",
        timeEstimate: "15-20 min"
      }
    ]
  },
  perspective: {
    title: "Perspective Practice",
    icon: Box,
    exercises: [
      {
        name: "Basic Shapes",
        description: "Draw basic 3D shapes (cubes, spheres, cylinders) in various orientations.",
        timeEstimate: "15 min"
      },
      {
        name: "Perspective Grids",
        description: "Practice with 1-point, 2-point, and 3-point perspective grids.",
        timeEstimate: "20 min"
      },
      {
        name: "Rotational Studies",
        description: "Draw objects from multiple angles, rotating 45 or 90 degrees each time.",
        timeEstimate: "20-30 min"
      }
    ]
  },
  color: {
    title: "Color Studies",
    icon: Palette,
    exercises: [
      {
        name: "Limited Palette - Warm/Cool",
        description: "Practice mixing with: Titanium White, Burnt Umber, Ultramarine Blue, Cadmium Red Light",
        timeEstimate: "20 min"
      },
      {
        name: "Extended Neutral Set",
        description: "Work with: White, Black, Yellow Ochre, Burnt Sienna, Ultramarine Blue",
        timeEstimate: "25 min"
      },
      {
        name: "Interior Colors",
        description: "Mix colors typically found in interior scenes using a limited palette",
        timeEstimate: "30 min"
      }
    ]
  }
}

const ArtExercises = () => {
  const [selectedCategory, setSelectedCategory] = useState('fundamentals')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Daily Art Practice Guide</h1>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {Object.entries(exerciseData).map(([key, category]) => {
          const Icon = category.icon
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${selectedCategory === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Icon size={20} />
              {category.title}
            </button>
          )
        })}
      </div>

      {/* Exercise Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {exerciseData[selectedCategory].exercises.map((exercise, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {exercise.name}
              </CardTitle>
              <div className="text-sm text-gray-500">
                Estimated time: {exercise.timeEstimate}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                {exercise.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Compass size={24} />
          Tips for Practice
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li>• Start with shorter sessions (15-20 minutes) and gradually increase duration</li>
          <li>• Focus on one category per day, rotating through them weekly</li>
          <li>• Keep a small sketchbook for daily practice</li>
          <li>• Take photos of your progress to track improvement</li>
          <li>• Don't worry about perfection - focus on consistent practice</li>
        </ul>
      </div>
    </div>
  )
}

export default ArtExercises