'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronRight, BookOpen, Code, GitBranch, Box, Layers, Bug, Brain, GitMerge, Layout, Binary } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ProblemSolvingGuide = () => {
  const [expandedSection, setExpandedSection] = useState('parse')

  const sections = [
    {
      id: 'parse',
      title: '1. Problem Analysis',
      icon: BookOpen,
      content: [
        {
          subtitle: 'Fact Extraction',
          points: [
            'List all given facts and initial conditions',
            'Identify input parameters and their types',
            'Document expected outputs and return types',
            'Note any explicit constraints or limitations'
          ]
        },
        {
          subtitle: 'Domain Visualization',
          points: [
            'Draw diagrams representing problem concepts',
            'Map relationships between entities',
            'Create visual representations of data structures',
            'Sketch state transitions if applicable'
          ]
        }
      ]
    },
    {
      id: 'decompose',
      title: '2. Problem Decomposition',
      icon: Layers,
      content: [
        {
          subtitle: 'Component Identification',
          points: [
            'Break down complex operations into simpler parts',
            'Identify reusable components or patterns',
            'List independent sub-problems',
            'Consider composition strategies'
          ]
        },
        {
          subtitle: 'Rule Analysis',
          points: [
            'Extract explicit rules from requirements',
            'Identify implicit rules and assumptions',
            'Document operation sequences',
            'Note dependencies between components'
          ]
        }
      ]
    },
    {
      id: 'examples',
      title: '3. Example Construction',
      icon: Code,
      content: [
        {
          subtitle: 'Test Cases',
          points: [
            'Create simple, typical test cases',
            'Identify edge cases and boundary conditions',
            'Consider invalid inputs and error cases',
            'Document expected outputs for each case'
          ]
        },
        {
          subtitle: 'Manual Simulation',
          points: [
            'Walk through examples step by step',
            'Draw state changes at each step',
            'Verify rule applications',
            'Document intermediate results'
          ]
        }
      ]
    },
    {
      id: 'pattern',
      title: '4. Pattern Recognition',
      icon: GitBranch,
      content: [
        {
          subtitle: 'Algorithm Patterns',
          points: [
            'Identify common algorithmic patterns',
            'Consider standard data structures',
            'Look for recursive patterns',
            'Note similar solved problems'
          ]
        },
        {
          subtitle: 'Solution Strategies',
          points: [
            'Consider divide-and-conquer approaches',
            'Evaluate iterative vs recursive solutions',
            'Assess time and space complexity trade-offs',
            'Think about optimization opportunities'
          ]
        }
      ]
    },
    {
      id: 'implementation',
      title: '5. Implementation Planning',
      icon: Box,
      content: [
        {
          subtitle: 'Structure Design',
          points: [
            'Plan function signatures and interfaces',
            'Design data structure representations',
            'Consider error handling strategies',
            'Plan component composition'
          ]
        },
        {
          subtitle: 'Code Organization',
          points: [
            'Outline pseudocode for main components',
            'Plan testing strategy',
            'Consider logging and debugging needs',
            'Document key algorithms'
          ]
        }
      ]
    },
    {
      id: 'verification',
      title: '6. Solution Verification',
      icon: Bug,
      content: [
        {
          subtitle: 'Testing Strategy',
          points: [
            'Implement unit tests for components',
            'Verify edge case handling',
            'Test component integration',
            'Validate performance requirements'
          ]
        },
        {
          subtitle: 'Refinement',
          points: [
            'Review and optimize code',
            'Consider alternative approaches',
            'Document trade-offs and decisions',
            'Plan for maintenance and extensibility'
          ]
        }
      ]
    }
  ]

  const CognitiveMetrics = [
    { name: 'Functions', limit: 7, current: 5 },
    { name: 'Parameters', limit: 7, current: 4 },
    { name: 'Fields', limit: 7, current: 6 },
    { name: 'Operations', limit: 7, current: 5 },
    { name: 'Relationships', limit: 7, current: 4 }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Systematic Problem-Solving Guide</h1>

      <div className="space-y-4">
        {sections.map(section => (
          <Card key={section.id} className="w-full">
            <CardHeader
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <div className="flex items-center space-x-3">
                <section.icon className="w-6 h-6" />
                <CardTitle className="flex-1">{section.title}</CardTitle>
                {expandedSection === section.id ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
            </CardHeader>

            {expandedSection === section.id && (
              <CardContent className="pt-4">
                {section.content.map((subsection, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <h3 className="font-semibold text-lg mb-3">{subsection.subtitle}</h3>
                    <ul className="space-y-2">
                      {subsection.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start">
                          <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Cognitive Limits Section */}
      <section className="mb-8">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Cognitive Limits (7±2)</h2>
          </div>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CognitiveMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 8]} />
                <Tooltip />
                <Bar dataKey="limit" fill="#94a3b8" name="Maximum Limit" />
                <Bar dataKey="current" fill="#3b82f6" name="Recommended" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Binary/Ternary Choices */}
      <section className="mb-8">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Binary className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Binary/Ternary Choices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Layout Options</h3>
              <ul className="list-disc pl-4">
                <li>List View</li>
                <li>Grid View</li>
                <li className="text-gray-500">(Optional) Carousel</li>
              </ul>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Edit Modes</h3>
              <ul className="list-disc pl-4">
                <li>Inline Editing</li>
                <li>Modal Dialog</li>
                <li className="text-gray-500">(Optional) Dedicated Page</li>
              </ul>
            </div>
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Data Display</h3>
              <ul className="list-disc pl-4">
                <li>Cards</li>
                <li>Table Rows</li>
                <li className="text-gray-500">(Optional) Timeline</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Composition Guidelines */}
      <section className="mb-8">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <GitMerge className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Composition Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Function Composition</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm">
                {`// Good: Limited composition
const result = process(
  validate(
    normalize(
      filterData(input)
    )
  )
);`}
              </pre>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Component Composition</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm">
                {`<Page>
  <Header />
  <MainContent>
    <Sidebar />
    <DataDisplay />
  </MainContent>
  <Footer />
</Page>`}
              </pre>
            </div>
          </div>
        </Card>
      </section>

      {/* Implementation Guidelines */}
      <section className="mb-8">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Code className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Implementation Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Simple Data Class Pattern</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm">
                {`interface UserData {
  id: string;      // 1
  name: string;    // 2
  email: string;   // 3
  role: string;    // 4
  status: string;  // 5
}`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">View Composition Pattern</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm">
                {`const DataView = ({ data, viewType }) => {
  switch(viewType) {
    case 'list':
      return <ListView data={data} />;
    case 'grid':
      return <GridView data={data} />;
    default:
      return <DefaultView data={data} />;
  }
};`}
              </pre>
            </div>
          </div>
        </Card>
      </section>

      {/* Layout Patterns */}
      <section>
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Layout className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-semibold">Layout Patterns</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">List View</h3>
              <div className="space-y-2">
                <div className="h-8 bg-blue-100 rounded"></div>
                <div className="h-8 bg-blue-100 rounded"></div>
                <div className="h-8 bg-blue-100 rounded"></div>
              </div>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Grid View</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-blue-100 rounded"></div>
                <div className="h-8 bg-blue-100 rounded"></div>
                <div className="h-8 bg-blue-100 rounded"></div>
                <div className="h-8 bg-blue-100 rounded"></div>
              </div>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Carousel</h3>
              <div className="relative h-16">
                <div className="absolute inset-0 bg-blue-100 rounded"></div>
                <div className="absolute inset-y-0 -right-2 w-8 bg-blue-50 rounded-r opacity-50"></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default ProblemSolvingGuide