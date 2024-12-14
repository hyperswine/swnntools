'use client'

import 'katex/dist/katex.min.css'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Info, Code, GitBranch, Box, Activity } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import Latex from 'react-latex-next'

// Formula component for displaying mathematical formulas
const Formula = ({ children }) => (
  <div className="p-2 bg-slate-100 rounded my-2 font-mono text-sm">
    <Latex>{`$${children}$`}</Latex>
  </div>
)

// Design intent badges
const IntentBadge = ({ type }) => {
  const colors = {
    common: "bg-blue-100 text-blue-800",
    experimental: "bg-purple-100 text-purple-800",
    temporary: "bg-yellow-100 text-yellow-800",
    cached: "bg-green-100 text-green-800"
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors[type]} mr-2`}>
      @{type}
    </span>
  )
}

const APIDesignGuide = () => {
  // Data for the optimal function count chart
  const functionCountData = Array.from({ length: 10 }, (_, i) => ({
    loc: Math.pow(10, i + 2), // 100 to 1M LOC
    optimalFunctions: Math.round(10 * Math.log(Math.pow(10, i + 2))),
    upperBound: Math.round(10 * Math.log(Math.pow(10, i + 2)) * 1.5),
    lowerBound: Math.round(10 * Math.log(Math.pow(10, i + 2)) * 0.5)
  }))

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">API Design Metrics Guide</h1>

      {/* Core Formula Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="mr-2" />
            Core API Size Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The optimal number of exposed functions can be calculated using:</p>
          <Formula>{`F_{optimal} = k \\cdot \\log(C)`}</Formula>
          <p className="mt-2">Where:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><Latex>{`$F_{optimal}$`}</Latex>: Optimal number of exposed functions</li>
            <li><Latex>{`$k$`}</Latex>: Domain-specific constant (typically 5-15)</li>
            <li><Latex>{`$C$`}</Latex>: Total lines of code</li>
          </ul>

          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={functionCountData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="loc"
                  tickFormatter={(value) => `${value.toLocaleString()} LOC`}
                />
                <YAxis label={{ value: 'Functions', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  formatter={(value) => Math.round(Number(value))}
                  labelFormatter={(value) => `${value.toLocaleString()} LOC`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="optimalFunctions"
                  name="Optimal"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  name="Upper Bound"
                  stroke="#dc2626"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  name="Lower Bound"
                  stroke="#16a34a"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Orthogonality Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitBranch className="mr-2" />
            Function Orthogonality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Orthogonality measures how independent and focused each function is.</p>
          <Formula>{`O_f = 1 - \\frac{overlapping\\_functionality}{total\\_functionality}`}</Formula>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Target Metrics</AlertTitle>
            <AlertDescription>
              Aim for <Latex>{`$O_f \\geq 0.8$`}</Latex> (80% unique functionality)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Coverage Ratio Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Box className="mr-2" />
            Coverage Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Coverage ratio indicates how much unique functionality each API function provides:</p>
          <Formula>{`C_f = \\frac{LOC_{influenced}}{total\\_LOC}`}</Formula>

          <p className="mt-4">Ideal range: <Latex>{`$0.01 \\leq C_f \\leq 0.05$`}</Latex></p>
          <p className="text-sm text-gray-600">Each function should influence 1-5% of the codebase</p>
        </CardContent>
      </Card>

      {/* Design Intent Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2" />
            Design Intent Annotations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Use annotations to indicate special function purposes:</p>

          <div className="space-y-4">
            <div>
              <IntentBadge type="common" />
              <code className="bg-slate-100 p-1 rounded">
                fact12 = factorial(12)
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Frequently used value, relaxed orthogonality requirements
              </p>
            </div>

            <div>
              <IntentBadge type="experimental" />
              <code className="bg-slate-100 p-1 rounded">
                newParser = experimental_implementation()
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Under development, higher complexity tolerance
              </p>
            </div>

            <div>
              <IntentBadge type="temporary" />
              <code className="bg-slate-100 p-1 rounded">
                debugLog = console.log
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Diagnostic purposes, minimal metric requirements
              </p>
            </div>

            <div>
              <IntentBadge type="cached" />
              <code className="bg-slate-100 p-1 rounded">
                commonTransform = memoize(heavyTransform)
              </code>
              <p className="text-sm text-gray-600 mt-1">
                Performance optimization, relaxed coverage requirements
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default APIDesignGuide