'use client'

import Link from "next/link"
import { useState } from "react"
import { FaTasks, FaCalendarAlt, FaRandom, FaChartBar, FaPalette, FaBook, FaPaintBrush, FaMusic, FaCode, FaCogs, FaBrain, FaProjectDiagram, FaGuitar, FaClipboardList, FaCubes, FaSitemap, FaShareAlt } from "react-icons/fa"

interface Tool {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const tools: Tool[] = [
  {
    href: "taskswitcher2",
    icon: FaTasks,
    title: "TaskSwitcher",
    description: "Manage and switch between multiple tasks efficiently"
  },
  {
    href: "timetable",
    icon: FaCalendarAlt,
    title: "Timetable",
    description: "Plan and organize your schedule with ease"
  },
  {
    href: "randstuff",
    icon: FaRandom,
    title: "RandStuff",
    description: "Generate random content and explore possibilities"
  },
  {
    href: "data-view",
    icon: FaChartBar,
    title: "DataView",
    description: "Visualize and analyze your data effectively"
  },
  {
    href: "ui-chooser",
    icon: FaPalette,
    title: "UICooser",
    description: "Select and customize UI components and themes"
  },
  {
    href: "exemplardocumentationstyle",
    icon: FaBook,
    title: "Exemplar Documentation",
    description: "Create comprehensive and well-structured documentation"
  },
  {
    href: "painting-practice",
    icon: FaPaintBrush,
    title: "Painting Practice",
    description: "Improve your artistic skills with guided exercises"
  },
  {
    href: "piano-practice",
    icon: FaMusic,
    title: "Piano Practice",
    description: "Enhance your musical abilities with structured lessons"
  },
  {
    href: "program-metrics",
    icon: FaCode,
    title: "Program Metrics",
    description: "Analyze code quality and performance metrics"
  },
  {
    href: "program-design-complexity",
    icon: FaCogs,
    title: "Program Design Complexity",
    description: "Evaluate and optimize software design patterns"
  },
  {
    href: "systematic-program-solving",
    icon: FaBrain,
    title: "Systematic Program Solving",
    description: "Approach complex problems with structured methodologies"
  },
  {
    href: "adaptive-programming",
    icon: FaProjectDiagram,
    title: "Adaptive Programming",
    description: "Build flexible and maintainable software solutions"
  },
  {
    href: "ukulele-practice",
    icon: FaGuitar,
    title: "Ukulele Practice",
    description: "Learn and master ukulele with interactive exercises"
  },
  {
    href: "daily-checklist",
    icon: FaClipboardList,
    title: "Daily Checklist",
    description: "Track daily tasks and maintain productive habits"
  },
  {
    href: "lego",
    icon: FaCubes,
    title: "Lego Templates",
    description: "Design and share creative LEGO building instructions"
  },
  {
    href: "category-theory",
    icon: FaSitemap,
    title: "Category Theory",
    description: "Explore mathematical structures and relationships"
  },
  {
    href: "algo-visual",
    icon: FaShareAlt,
    title: "Algorithm Visualizer",
    description: "Convert functional code into interactive flow charts"
  }
]

export default function Page() {
  const [clickedCard, setClickedCard] = useState<string | null>(null)

  const handleCardClick = (href: string) => {
    setClickedCard(href)
    // Small delay to show the animation before navigation
    setTimeout(() => {
      window.location.href = href
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Developer Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of utilities and applications to enhance productivity and learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon
            const isClicked = clickedCard === tool.href

            return (
              <div
                key={tool.href}
                onClick={() => handleCardClick(tool.href)}
                className={`
                  bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
                  border border-gray-200 hover:border-green-400 group overflow-hidden
                  transform hover:-translate-y-2 hover:scale-105
                  ${isClicked ? 'scale-95 opacity-75' : ''}
                `}
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <IconComponent className="text-white text-2xl" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-green-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-green-300 transition-colors duration-300"></div>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-500 group-hover:text-green-600 transition-colors duration-300">
                      Click to explore →
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}