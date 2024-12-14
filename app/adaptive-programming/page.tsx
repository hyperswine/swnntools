import React from 'react'
import { Book, FileSearch, Beaker, GitBranch, Users, Clock, ArrowRight } from 'lucide-react'

const AdaptiveProgrammingGuide = () => {
  const coreComponents = [
    {
      title: "The Compilation",
      icon: <Book className="w-8 h-8 text-blue-600" />,
      description: "A central knowledge base containing observations, experiments, and insights about your domain.",
      features: [
        "Markdown-based documentation",
        "Easy search functionality",
        "Tag-based organization",
        "Time-based context"
      ]
    },
    {
      title: "Experiments & Models",
      icon: <Beaker className="w-8 h-8 text-green-600" />,
      description: "Build and test simplified representations of system components to understand behavior and patterns.",
      features: [
        "Focus on abstraction",
        "Observable running states",
        "Document insights and projections",
        "Experiment tracking"
      ]
    },
    {
      title: "Search & Discovery",
      icon: <FileSearch className="w-8 h-8 text-purple-600" />,
      description: "Efficiently find and retrieve information across your project's knowledge base.",
      features: [
        "Keyword search",
        "Tag filtering",
        "Temporal search",
        "Related content discovery"
      ]
    },
    {
      title: "Team Collaboration",
      icon: <Users className="w-8 h-8 text-orange-600" />,
      description: "Foster open communication and knowledge sharing among team members.",
      features: [
        "Discussion threads",
        "Async updates",
        "Question answering",
        "Knowledge sharing"
      ]
    }
  ]

  const implementationSteps = [
    {
      step: 1,
      title: "Set Up Your Knowledge Base",
      description: "Create a Docusaurus-based web app to serve as your team's knowledge repository."
    },
    {
      step: 2,
      title: "Define Core Processes",
      description: "Establish basic workflows while maintaining flexibility for adaptation."
    },
    {
      step: 3,
      title: "Implement Tools",
      description: "Set up necessary components for experimentation, documentation, and collaboration."
    },
    {
      step: 4,
      title: "Begin Documentation",
      description: "Start recording observations and insights about your domain."
    },
    {
      step: 5,
      title: "Iterate and Adapt",
      description: "Continuously refine your processes based on team feedback and needs."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Implementing Adaptive Programming</h1>
        <p className="text-xl text-gray-600">
          A flexible, knowledge-driven approach to software development
        </p>
      </div>

      {/* Core Components */}
      <h2 className="text-2xl font-bold mb-8">Core Components</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {coreComponents.map((component, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              {component.icon}
              <h3 className="text-xl font-semibold ml-3">{component.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{component.description}</p>
            <ul className="space-y-2">
              {component.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Implementation Steps */}
      <h2 className="text-2xl font-bold mb-8">Implementation Steps</h2>
      <div className="space-y-6 mb-16">
        {implementationSteps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              {step.step}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology Note */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start">
          <GitBranch className="w-8 h-8 text-gray-600 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Methodology Flexibility</h3>
            <p className="text-gray-600">
              While Adaptive Programming provides a structured approach, it's designed to be flexible.
              Teams can modify and extend the methodology based on their specific needs. Just remember to:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                <span>Document any modifications clearly</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                <span>Communicate changes to all team members</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                <span>Track the evolution of your process</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Time Context Note */}
      <div className="mt-8 p-6 border rounded-lg">
        <div className="flex items-start">
          <Clock className="w-8 h-8 text-gray-600 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Temporal Context</h3>
            <p className="text-gray-600">
              Time is a first-class citizen in Adaptive Programming. Use temporal context to:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                <span>Track the evolution of ideas and solutions</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                <span>Search and filter observations by time period</span>
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                <span>Understand the context of past decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdaptiveProgrammingGuide