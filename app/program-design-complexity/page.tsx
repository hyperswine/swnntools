'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, AlertTriangle } from 'lucide-react'

const ComplexityDashboard = () => {
  // Sample component for analysis
  const sampleComponent = {
    name: 'TodoList',
    depth: 4,
    elements: 12,
    stateVars: 5,
    eventHandlers: 8,
    lines: 220
  }

  // Generate complexity curve data
  const complexityData = Array.from({ length: 15 }, (_, i) => ({
    elements: i + 1,
    nestingPenalty: Math.pow(i + 1, 2),
    cognitiveLoad: i + 1 <= 7 ? i + 1 : Math.pow(i - 6, 2) + 7,
    totalComplexity: Math.pow(i + 1, 2) + (i + 1 <= 7 ? i + 1 : Math.pow(i - 6, 2) + 7)
  }))

  // Component depth analysis data
  const depthData = [
    { depth: 1, count: 2, score: 2 },
    { depth: 2, count: 4, score: 16 },
    { depth: 3, count: 6, score: 54 },
    { depth: 4, count: 3, score: 48 },
  ]

  // Calculate complexity scores
  const calculateScores = (component) => {
    const depthScore = Math.pow(component.depth, 2)
    const elementScore = Math.max(0, Math.pow(component.elements - 7, 2))
    const stateScore = component.stateVars * component.eventHandlers
    return {
      depthScore,
      elementScore,
      stateScore,
      total: depthScore + elementScore + stateScore
    }
  }

  const scores = calculateScores(sampleComponent)

  const getComplexityLevel = (score) => {
    if (score < 50) return { level: 'Low', color: 'text-green-600' }
    if (score < 100) return { level: 'Medium', color: 'text-yellow-600' }
    return { level: 'High', color: 'text-red-600' }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">UI Complexity Analysis Dashboard</h1>

      {/* Component Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info size={20} />
            Component Analysis: {sampleComponent.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Structure Metrics</h3>
              <div className="space-y-2">
                <p>Depth: {sampleComponent.depth} levels</p>
                <p>Elements: {sampleComponent.elements}</p>
                <p>Lines: {sampleComponent.lines}</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Interaction Metrics</h3>
              <div className="space-y-2">
                <p>State Variables: {sampleComponent.stateVars}</p>
                <p>Event Handlers: {sampleComponent.eventHandlers}</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Complexity Scores</h3>
              <div className="space-y-2">
                <p>Depth Score: {scores.depthScore}</p>
                <p>Element Score: {scores.elementScore}</p>
                <p>State Score: {scores.stateScore}</p>
                <p className={`font-bold ${getComplexityLevel(scores.total).color}`}>
                  Total: {scores.total} ({getComplexityLevel(scores.total).level})
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complexity Curves */}
      <Card>
        <CardHeader>
          <CardTitle>Complexity Growth Curves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer>
              <LineChart data={complexityData}>
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="elements" label={{ value: 'Number of Elements', position: 'bottom' }} /> */}
                <YAxis label={{ value: 'Complexity Score', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="nestingPenalty" stroke="#8884d8" name="Nesting Penalty" />
                <Line type="monotone" dataKey="cognitiveLoad" stroke="#82ca9d" name="Cognitive Load" />
                <Line type="monotone" dataKey="totalComplexity" stroke="#ff7300" name="Total Complexity" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Depth Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Component Depth Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer >
              <BarChart data={depthData}>
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="depth" label={{ value: 'Nesting Depth', position: 'bottom' }} /> */}
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Component Count', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: 'Complexity Score', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Number of Components" />
                <Bar yAxisId="right" dataKey="score" fill="#82ca9d" name="Complexity Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle size={20} />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scores.depthScore > 16 && (
              <Alert>
                <AlertDescription>
                  Consider breaking down deeply nested structures. Current depth score ({scores.depthScore}) exceeds recommended threshold (16).
                </AlertDescription>
              </Alert>
            )}
            {sampleComponent.elements > 7 && (
              <Alert>
                <AlertDescription>
                  Component exceeds optimal element count (7±2). Consider grouping related elements into sub-components.
                </AlertDescription>
              </Alert>
            )}
            {sampleComponent.lines > 200 && (
              <Alert>
                <AlertDescription>
                  Component exceeds recommended line count (200). Consider splitting into smaller, focused components.
                </AlertDescription>
              </Alert>
            )}
            {scores.stateScore > 25 && (
              <Alert>
                <AlertDescription>
                  High state complexity detected. Consider using state management patterns or breaking down state logic.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComplexityDashboard