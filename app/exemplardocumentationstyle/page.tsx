'use client'

import React, { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react'

// Sample documentation data
const docData = {
  widgets: {
    title: "Widgets",
    content: "Widgets are the core building blocks of our system. They provide modular, reusable functionality that can be combined to create complex interfaces.",
    tags: ["core", "components"]
  },
  installation: {
    title: "Installation",
    content: "To install our system, use npm install @ourlib/widgets. This will download all necessary dependencies.",
    tags: ["setup", "getting-started"]
  }
}

// Search functionality
const searchDocs = (query) => {
  if (!query) return []
  query = query.toLowerCase()
  return Object.entries(docData)
    .filter(([key, data]) => {
      return data.title.toLowerCase().includes(query) ||
        data.content.toLowerCase().includes(query) ||
        data.tags.some(tag => tag.toLowerCase().includes(query))
    })
    .map(([key, data]) => ({
      id: key,
      ...data,
      excerpt: data.content.slice(0, 100) + '...'
    }))
}

const ExpandableSection = ({ title, children, isOpen, onToggle }) => (
  <div className="border rounded-md mb-4">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
    >
      <span className="font-medium">{title}</span>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <div className="p-4 border-t">
        {children}
      </div>
    )}
  </div>
)

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    const searchResults = searchDocs(query)
    setResults(searchResults)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Search Documentation</h2>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSearch} className="mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md"
            />
          </form>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div key={result.id} className="mb-4 p-4 border rounded-lg">
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-sm mt-2">{result.excerpt}</p>
              <div className="mt-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {results.length === 0 && query && (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </div>
      </div>
    </div>
  )
}

const DocumentationPage = () => {
  const [expandedSections, setExpandedSections] = useState({})
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen(true)
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Documentation</h1>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Search size={20} />
          <span className="hidden sm:inline">Search (⌘K)</span>
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <ExpandableSection
            title="Quick Start Guide"
            isOpen={expandedSections['quickstart']}
            onToggle={() => toggleSection('quickstart')}
          >
            <p>Follow these steps to get started with our system:</p>
            <ol className="list-decimal ml-6 mt-2 space-y-2">
              <li>Install the package using npm or yarn</li>
              <li>Import the necessary components</li>
              <li>Start building your application</li>
            </ol>
          </ExpandableSection>

          <ExpandableSection
            title="Installation"
            isOpen={expandedSections['installation']}
            onToggle={() => toggleSection('installation')}
          >
            <p>{docData.installation.content}</p>
            <pre className="bg-gray-100 p-4 rounded-md mt-4">
              npm install @ourlib/widgets
            </pre>
          </ExpandableSection>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Core Concepts</h2>
          <ExpandableSection
            title="Understanding Widgets"
            isOpen={expandedSections['widgets']}
            onToggle={() => toggleSection('widgets')}
          >
            <p>{docData.widgets.content}</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Widgets can be composed together to create more complex components.
              </p>
            </div>
          </ExpandableSection>
        </section>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={searchDocs}
      />
    </div>
  )
}

export default DocumentationPage