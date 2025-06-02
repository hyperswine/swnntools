'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Plus, X, ArrowRight, Eye, Edit3 } from 'lucide-react'

interface Morphism {
  id: string
  from: string
  to: string
  name: string
}

interface Category {
  id: string
  name: string
  objects: string[]
  morphisms: Morphism[]
}

interface Functor {
  id: string
  name: string
  source: string
  target: string
  objectMap: Record<string, string>
  morphismMap: Record<string, string>
}

const CategoryVisualizer = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'set',
      name: 'Set',
      objects: ['A', 'B', 'C'],
      morphisms: [
        { id: 'f', from: 'A', to: 'B', name: 'f' },
        { id: 'g', from: 'B', to: 'C', name: 'g' },
        { id: 'gf', from: 'A', to: 'C', name: 'g∘f' }
      ]
    },
    {
      id: 'group',
      name: 'Group',
      objects: ['G', 'H'],
      morphisms: [
        { id: 'phi', from: 'G', to: 'H', name: 'φ' }
      ]
    }
  ])

  const [functors, setFunctors] = useState<Functor[]>([
    {
      id: 'forgetful',
      name: 'Forgetful Functor',
      source: 'group',
      target: 'set',
      objectMap: { 'G': 'A', 'H': 'B' },
      morphismMap: { 'phi': 'f' }
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('set')
  const [selectedFunctor, setSelectedFunctor] = useState('forgetful')
  const [editMode, setEditMode] = useState(null)
  const [newCategory, setNewCategory] = useState({ name: '', objects: '', morphisms: '' })
  const [newFunctor, setNewFunctor] = useState({ name: '', source: '', target: '', objectMap: '', morphismMap: '' })

  const addCategory = () => {
    if (!newCategory.name) return

    const objects = newCategory.objects.split(',').map(s => s.trim()).filter(Boolean)
    const morphisms = newCategory.morphisms.split(',').map(m => {
      const parts = m.trim().split(':')
      if (parts.length === 2) {
        const [name, arrow] = parts
        const [from, to] = arrow.split('->').map(s => s.trim())
        return { id: name.trim(), from, to, name: name.trim() }
      }
      return null
    }).filter(Boolean) as Morphism[]

    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      objects,
      morphisms
    }

    setCategories([...categories, category])
    setNewCategory({ name: '', objects: '', morphisms: '' })
    setEditMode(null)
  }

  const addFunctor = () => {
    if (!newFunctor.name || !newFunctor.source || !newFunctor.target) return

    const objectMap: Record<string, string> = {}
    newFunctor.objectMap.split(',').forEach(mapping => {
      const [from, to] = mapping.split('->').map(s => s.trim())
      if (from && to) objectMap[from] = to
    })

    const morphismMap: Record<string, string> = {}
    newFunctor.morphismMap.split(',').forEach(mapping => {
      const [from, to] = mapping.split('->').map(s => s.trim())
      if (from && to) morphismMap[from] = to
    })

    const functor: Functor = {
      id: Date.now().toString(),
      name: newFunctor.name,
      source: newFunctor.source,
      target: newFunctor.target,
      objectMap,
      morphismMap
    }

    setFunctors([...functors, functor])
    setNewFunctor({ name: '', source: '', target: '', objectMap: '', morphismMap: '' })
    setEditMode(null)
  }

  const CategoryDiagram = ({ category }: { category: Category | null }) => {
    if (!category) return null

    const svgWidth = 400
    const svgHeight = 300
    const centerX = svgWidth / 2
    const centerY = svgHeight / 2
    const radius = 80

    // Position objects in a circle
    const objectPositions = {}
    category.objects.forEach((obj, i) => {
      const angle = (i * 2 * Math.PI) / category.objects.length
      objectPositions[obj] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      }
    })

    return (
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
        <svg width={svgWidth} height={svgHeight} className="border">
          {/* Render morphisms as arrows */}
          {category.morphisms.map(morphism => {
            const fromPos = objectPositions[morphism.from]
            const toPos = objectPositions[morphism.to]
            if (!fromPos || !toPos) return null

            const dx = toPos.x - fromPos.x
            const dy = toPos.y - fromPos.y
            const length = Math.sqrt(dx * dx + dy * dy)
            const unitX = dx / length
            const unitY = dy / length

            // Adjust start and end points to not overlap with circles
            const startX = fromPos.x + unitX * 20
            const startY = fromPos.y + unitY * 20
            const endX = toPos.x - unitX * 20
            const endY = toPos.y - unitY * 20

            // Self-loops
            if (morphism.from === morphism.to) {
              const loopRadius = 25
              const cx = fromPos.x + loopRadius
              const cy = fromPos.y - loopRadius

              return (
                <g key={morphism.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={loopRadius}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <polygon
                    points={`${cx + loopRadius - 5},${cy} ${cx + loopRadius + 5},${cy - 5} ${cx + loopRadius + 5},${cy + 5}`}
                    fill="#3b82f6"
                  />
                  <text x={cx} y={cy - loopRadius - 10} textAnchor="middle" className="text-sm font-medium">
                    {morphism.name}
                  </text>
                </g>
              )
            }

            return (
              <g key={morphism.id}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(startX + endX) / 2}
                  y={(startY + endY) / 2 - 10}
                  textAnchor="middle"
                  className="text-sm font-medium"
                >
                  {morphism.name}
                </text>
              </g>
            )
          })}

          {/* Render objects as circles */}
          {category.objects.map(obj => {
            const pos = objectPositions[obj]
            return (
              <g key={obj}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill="#fbbf24"
                  stroke="#d97706"
                  strokeWidth="2"
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  className="text-sm font-semibold"
                >
                  {obj}
                </text>
              </g>
            )
          })}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      </div>
    )
  }

  const FunctorDiagram = ({ functor }: { functor: Functor | null }) => {
    if (!functor) return null

    const sourceCategory = categories.find(cat => cat.id === functor.source)
    const targetCategory = categories.find(cat => cat.id === functor.target)

    if (!sourceCategory || !targetCategory) return null

    return (
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">{functor.name}</h3>
        <div className="flex items-center space-x-8">
          <div className="flex-1">
            <h4 className="text-md font-medium mb-2">Source: {sourceCategory.name}</h4>
            <CategoryDiagram category={sourceCategory} />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <ArrowRight size={32} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">F</span>
          </div>

          <div className="flex-1">
            <h4 className="text-md font-medium mb-2">Target: {targetCategory.name}</h4>
            <CategoryDiagram category={targetCategory} />
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <h5 className="font-medium mb-2">Mappings:</h5>
          <div className="text-sm space-y-1">
            <div><strong>Objects:</strong> {Object.entries(functor.objectMap).map(([k, v]) => `${k}→${v}`).join(', ')}</div>
            <div><strong>Morphisms:</strong> {Object.entries(functor.morphismMap).map(([k, v]) => `${k}→${v}`).join(', ')}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Category Theory Visualizer</h1>

      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button
            onClick={() => setEditMode('category')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {categories.map(category => (
            <div key={category.id} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-2 rounded ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <Eye size={16} />
                </button>
              </div>
              <div className="text-sm text-gray-600">
                <div>Objects: {category.objects.join(', ')}</div>
                <div>Morphisms: {category.morphisms.map(m => m.name).join(', ')}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Diagram Display */}
        {selectedCategory && (
          <CategoryDiagram category={categories.find(cat => cat.id === selectedCategory)} />
        )}
      </div>

      {/* Functors Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Functors</h2>
          <button
            onClick={() => setEditMode('functor')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Plus size={20} />
            <span>Add Functor</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {functors.map(functor => (
            <div key={functor.id} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{functor.name}</h3>
                <button
                  onClick={() => setSelectedFunctor(functor.id)}
                  className={`p-2 rounded ${selectedFunctor === functor.id ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <Eye size={16} />
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {categories.find(cat => cat.id === functor.source)?.name} → {categories.find(cat => cat.id === functor.target)?.name}
              </div>
            </div>
          ))}
        </div>

        {/* Functor Diagram Display */}
        {selectedFunctor && (
          <FunctorDiagram functor={functors.find(f => f.id === selectedFunctor)} />
        )}
      </div>

      {/* Add Category Modal */}
      {editMode === 'category' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Category</h3>
              <button onClick={() => setEditMode(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Objects (comma-separated): A, B, C"
                value={newCategory.objects}
                onChange={(e) => setNewCategory({ ...newCategory, objects: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Morphisms: f: A->B, g: B->C, gf: A->C"
                value={newCategory.morphisms}
                onChange={(e) => setNewCategory({ ...newCategory, morphisms: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={addCategory}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Functor Modal */}
      {editMode === 'functor' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Functor</h3>
              <button onClick={() => setEditMode(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Functor name"
                value={newFunctor.name}
                onChange={(e) => setNewFunctor({ ...newFunctor, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={newFunctor.source}
                onChange={(e) => setNewFunctor({ ...newFunctor, source: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select source category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={newFunctor.target}
                onChange={(e) => setNewFunctor({ ...newFunctor, target: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select target category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Object mappings: G->A, H->B"
                value={newFunctor.objectMap}
                onChange={(e) => setNewFunctor({ ...newFunctor, objectMap: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Morphism mappings: phi->f"
                value={newFunctor.morphismMap}
                onChange={(e) => setNewFunctor({ ...newFunctor, morphismMap: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={addFunctor}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Functor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryVisualizer