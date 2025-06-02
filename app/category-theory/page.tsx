'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Plus, X, ArrowRight, Eye, Edit3, Download, Upload, Trash2 } from 'lucide-react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Position,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import {
  saveCategory,
  saveFunctor,
  getAllCategories,
  getAllFunctors,
  deleteCategory,
  deleteFunctor,
  loadAllData,
  saveAllData
} from '../../lib/categoryPersistence'

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
  const [editMode, setEditMode] = useState<'category' | 'functor' | null>(null)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: '', objects: '', morphisms: '' })
  const [newFunctor, setNewFunctor] = useState({ name: '', source: '', target: '', objectMap: '', morphismMap: '' })
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null)

  // Load data from Firebase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const { categories: loadedCategories, functors: loadedFunctors } = await loadAllData()

        if (loadedCategories.length > 0) {
          setCategories(loadedCategories)
        }
        if (loadedFunctors.length > 0) {
          setFunctors(loadedFunctors)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Show save status temporarily
  const showSaveStatus = (status: 'saved' | 'saving' | 'error') => {
    setSaveStatus(status)
    if (status !== 'saving') {
      setTimeout(() => setSaveStatus(null), 2000)
    }
  }

  // Delete category with persistence
  const handleDeleteCategory = async (categoryId: string) => {
    try {
      showSaveStatus('saving')
      await deleteCategory(categoryId)
      setCategories(categories.filter(cat => cat.id !== categoryId))
      if (selectedCategory === categoryId) {
        setSelectedCategory(categories.find(cat => cat.id !== categoryId)?.id || '')
      }
      showSaveStatus('saved')
    } catch (error) {
      console.error('Error deleting category:', error)
      showSaveStatus('error')
    }
  }

  // Delete functor with persistence
  const handleDeleteFunctor = async (functorId: string) => {
    try {
      showSaveStatus('saving')
      await deleteFunctor(functorId)
      setFunctors(functors.filter(f => f.id !== functorId))
      if (selectedFunctor === functorId) {
        setSelectedFunctor(functors.find(f => f.id !== functorId)?.id || '')
      }
      showSaveStatus('saved')
    } catch (error) {
      console.error('Error deleting functor:', error)
      showSaveStatus('error')
    }
  }

  // Edit category
  const handleEditCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    if (category) {
      setNewCategory({
        name: category.name,
        objects: category.objects.join(', '),
        morphisms: category.morphisms.map(m => `${m.name}: ${m.from}->${m.to}`).join(', ')
      })
      setEditingItem(categoryId)
      setEditMode('category')
    }
  }

  // Edit functor
  const handleEditFunctor = (functorId: string) => {
    const functor = functors.find(f => f.id === functorId)
    if (functor) {
      setNewFunctor({
        name: functor.name,
        source: functor.source,
        target: functor.target,
        objectMap: Object.entries(functor.objectMap).map(([k, v]) => `${k}->${v}`).join(', '),
        morphismMap: Object.entries(functor.morphismMap).map(([k, v]) => `${k}->${v}`).join(', ')
      })
      setEditingItem(functorId)
      setEditMode('functor')
    }
  }

  const addCategory = async () => {
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

    try {
      showSaveStatus('saving')

      if (editingItem) {
        // Update existing category
        const updatedCategory: Category = {
          id: editingItem,
          name: newCategory.name,
          objects,
          morphisms
        }
        await saveCategory(updatedCategory)
        setCategories(categories.map(cat => cat.id === editingItem ? updatedCategory : cat))
      } else {
        // Add new category
        const category: Category = {
          id: Date.now().toString(),
          name: newCategory.name,
          objects,
          morphisms
        }
        await saveCategory(category)
        setCategories([...categories, category])
      }

      setNewCategory({ name: '', objects: '', morphisms: '' })
      setEditMode(null)
      setEditingItem(null)
      showSaveStatus('saved')
    } catch (error) {
      console.error('Error saving category:', error)
      showSaveStatus('error')
    }
  }

  const addFunctor = async () => {
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

    try {
      showSaveStatus('saving')

      if (editingItem) {
        // Update existing functor
        const updatedFunctor: Functor = {
          id: editingItem,
          name: newFunctor.name,
          source: newFunctor.source,
          target: newFunctor.target,
          objectMap,
          morphismMap
        }
        await saveFunctor(updatedFunctor)
        setFunctors(functors.map(f => f.id === editingItem ? updatedFunctor : f))
      } else {
        // Add new functor
        const functor: Functor = {
          id: Date.now().toString(),
          name: newFunctor.name,
          source: newFunctor.source,
          target: newFunctor.target,
          objectMap,
          morphismMap
        }
        await saveFunctor(functor)
        setFunctors([...functors, functor])
      }

      setNewFunctor({ name: '', source: '', target: '', objectMap: '', morphismMap: '' })
      setEditMode(null)
      setEditingItem(null)
      showSaveStatus('saved')
    } catch (error) {
      console.error('Error saving functor:', error)
      showSaveStatus('error')
    }
  }

  const CategoryDiagram = ({ category }: { category: Category | null }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    // Convert category data to React Flow nodes and edges
    useEffect(() => {
      if (!category) {
        setNodes([])
        setEdges([])
        return
      }

      // Create nodes for objects
      const initialNodes: Node[] = category.objects.map((obj, index) => {
        // Position objects in a circle for initial layout
        const angle = (index * 2 * Math.PI) / category.objects.length
        const radius = Math.max(100, category.objects.length * 20)
        const x = 200 + radius * Math.cos(angle)
        const y = 200 + radius * Math.sin(angle)

        return {
          id: obj,
          type: 'default',
          position: { x, y },
          data: {
            label: (
              <div className="text-center font-semibold text-sm px-2 py-1">
                {obj}
              </div>
            )
          },
          style: {
            background: '#fbbf24',
            border: '2px solid #d97706',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        }
      })

      // Create edges for morphisms
      const initialEdges: Edge[] = category.morphisms.map((morphism) => {
        const isSelfLoop = morphism.from === morphism.to

        return {
          id: morphism.id,
          source: morphism.from,
          target: morphism.to,
          type: isSelfLoop ? 'smoothstep' : 'smoothstep',
          animated: false,
          style: {
            stroke: '#3b82f6',
            strokeWidth: 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#3b82f6',
          },
          label: morphism.name,
          labelStyle: {
            fontSize: '12px',
            fontWeight: 'bold',
            fill: '#1e40af',
          },
          labelBgStyle: {
            fill: 'white',
            fillOpacity: 0.8,
          },
          // For self-loops, add some curvature
          ...(isSelfLoop && {
            style: {
              stroke: '#3b82f6',
              strokeWidth: 2,
            },
            sourceHandle: 'top',
            targetHandle: 'bottom',
          }),
        }
      })

      setNodes(initialNodes)
      setEdges(initialEdges)
    }, [category, setNodes, setEdges])

    const onConnect = useCallback((params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    }, [setEdges])

    if (!category) {
      return (
        <div className="border rounded-lg p-4 bg-gray-50 h-96">
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a category to view its diagram
          </div>
        </div>
      )
    }

    return (
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
        <div className="h-96 w-full border rounded">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={{
              padding: 0.2,
              includeHiddenNodes: false,
            }}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            selectNodesOnDrag={false}
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            panOnScrollMode={undefined}
            className="bg-gray-50"
          >
            <Background color="#e5e7eb" gap={20} />
            <Controls />
            <MiniMap
              nodeColor="#fbbf24"
              nodeStrokeColor="#d97706"
              nodeStrokeWidth={2}
              zoomable
              pannable
              className="bg-white border"
            />
          </ReactFlow>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          💡 Drag objects to rearrange the diagram. Use mouse wheel to zoom and drag to pan.
        </div>
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

        {/* Desktop layout: horizontal */}
        <div className="hidden lg:flex items-center space-x-8">
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

        {/* Mobile/Tablet layout: vertical */}
        <div className="lg:hidden space-y-6">
          <div>
            <h4 className="text-md font-medium mb-2">Source: {sourceCategory.name}</h4>
            <CategoryDiagram category={sourceCategory} />
          </div>

          <div className="flex items-center justify-center space-x-2">
            <ArrowRight size={24} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">F</span>
          </div>

          <div>
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-center lg:text-left flex-1">Category Theory Visualizer</h1>
        <div className="flex items-center space-x-4">
          {loading && <span className="text-gray-600">Loading...</span>}
          {saveStatus === 'saving' && <span className="text-blue-600">Saving...</span>}
          {saveStatus === 'saved' && <span className="text-green-600">Saved!</span>}
          {saveStatus === 'error' && <span className="text-red-600">Save failed</span>}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button
            onClick={() => {
              setEditingItem(null)
              setNewCategory({ name: '', objects: '', morphisms: '' })
              setEditMode('category')
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {loading ? (
            <div className="col-span-full text-center py-8 text-gray-600">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-600">
              No categories yet. Click "Add Category" to create your first category.
            </div>
          ) : (
            categories.map(category => (
              <div key={category.id} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-2 rounded ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      title="View category"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditCategory(category.id)}
                      className="p-2 rounded bg-yellow-200 hover:bg-yellow-300 text-yellow-600"
                      title="Edit category"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 rounded bg-red-200 hover:bg-red-300 text-red-600"
                      title="Delete category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Objects: {category.objects.join(', ')}</div>
                  <div>Morphisms: {category.morphisms.map(m => m.name).join(', ')}</div>
                </div>
              </div>
            ))
          )}
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
            onClick={() => {
              setEditingItem(null)
              setNewFunctor({ name: '', source: '', target: '', objectMap: '', morphismMap: '' })
              setEditMode('functor')
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Plus size={20} />
            <span>Add Functor</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {loading ? (
            <div className="text-center py-8 text-gray-600">
              Loading functors...
            </div>
          ) : functors.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No functors yet. Click "Add Functor" to create your first functor.
            </div>
          ) : (
            functors.map(functor => (
              <div key={functor.id} className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{functor.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedFunctor(functor.id)}
                      className={`p-2 rounded ${selectedFunctor === functor.id ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      title="View functor"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEditFunctor(functor.id)}
                      className="p-2 rounded bg-yellow-200 hover:bg-yellow-300 text-yellow-600"
                      title="Edit functor"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteFunctor(functor.id)}
                      className="p-2 rounded bg-red-200 hover:bg-red-300 text-red-600"
                      title="Delete functor"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {categories.find(cat => cat.id === functor.source)?.name} → {categories.find(cat => cat.id === functor.target)?.name}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Functor Diagram Display */}
        {selectedFunctor && (
          <FunctorDiagram functor={functors.find(f => f.id === selectedFunctor)} />
        )}
      </div>

      {/* Add/Edit Category Modal */}
      {editMode === 'category' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingItem ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => {
                setEditMode(null)
                setEditingItem(null)
                setNewCategory({ name: '', objects: '', morphisms: '' })
              }}>
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
                {editingItem ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Functor Modal */}
      {editMode === 'functor' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingItem ? 'Edit Functor' : 'Add Functor'}</h3>
              <button onClick={() => {
                setEditMode(null)
                setEditingItem(null)
                setNewFunctor({ name: '', source: '', target: '', objectMap: '', morphismMap: '' })
              }}>
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
                {editingItem ? 'Update Functor' : 'Add Functor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryVisualizer