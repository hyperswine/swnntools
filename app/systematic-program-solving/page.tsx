'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronRight, BookOpen, Code, GitBranch, Box, Layers, Bug } from 'lucide-react'

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
    </div>
  )
}

export default ProblemSolvingGuide