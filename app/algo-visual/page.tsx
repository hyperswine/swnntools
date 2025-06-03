'use client'

import React, { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'

// Types for our functional language AST
interface Pattern {
  type: 'constructor' | 'variable'
  name: string
  args?: Pattern[]
}

interface Term {
  type: 'variable' | 'application' | 'literal'
  name?: string
  function?: Term
  arguments?: Term[]
  value?: string | number
}

interface FunctionDefinition {
  name: string
  patterns: Pattern[]
  body: Term
}

// Simple parser for functional pseudo code
class FunctionalParser {
  private tokens: string[] = []
  private position = 0
  parse(code: string): FunctionDefinition[] {
    // Split into lines and process each line as a function definition
    const lines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0)
    const definitions: FunctionDefinition[] = []

    for (const line of lines) {
      // Simple tokenization for each line
      this.tokens = line
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/=/g, ' = ')
        .split(/\s+/)
        .filter(token => token.length > 0)

      this.position = 0
      const def = this.parseDefinition()
      if (def) definitions.push(def)
    }

    return definitions
  }

  private parseDefinition(): FunctionDefinition | null {
    if (this.position >= this.tokens.length) return null

    const name = this.tokens[this.position++]
    const patterns: Pattern[] = []

    // Parse patterns until we hit '='
    while (this.position < this.tokens.length && this.tokens[this.position] !== '=') {
      const pattern = this.parsePattern()
      if (pattern) patterns.push(pattern)
    }

    if (this.position >= this.tokens.length || this.tokens[this.position] !== '=') {
      return null
    }

    this.position++ // consume '='

    const body = this.parseTerm()
    if (!body) return null

    return { name, patterns, body }
  }

  private parsePattern(): Pattern | null {
    if (this.position >= this.tokens.length) return null

    const token = this.tokens[this.position]

    // Handle parenthesized patterns like (S n)
    if (token === '(') {
      this.position++ // consume '('

      if (this.position >= this.tokens.length) return null

      const constructorName = this.tokens[this.position++]
      const args: Pattern[] = []

      // Parse arguments until we hit ')'
      while (this.position < this.tokens.length && this.tokens[this.position] !== ')') {
        const arg = this.parsePattern()
        if (arg) args.push(arg)
      }

      if (this.position < this.tokens.length) this.position++ // consume ')'

      return {
        type: 'constructor',
        name: constructorName,
        args
      }
    }

    // Regular token
    this.position++

    // Check if this is a constructor with arguments (without parentheses)
    if (this.position < this.tokens.length && this.tokens[this.position] === '(') {
      this.position++ // consume '('
      const args: Pattern[] = []

      while (this.position < this.tokens.length && this.tokens[this.position] !== ')') {
        const arg = this.parsePattern()
        if (arg) args.push(arg)
      }

      if (this.position < this.tokens.length) this.position++ // consume ')'

      return {
        type: 'constructor',
        name: token,
        args
      }
    }

    // Simple pattern (variable or zero-arg constructor)
    return {
      type: token === 'Z' || token[0].toUpperCase() === token[0] ? 'constructor' : 'variable',
      name: token
    }
  }

  private parseTerm(): Term | null {
    if (this.position >= this.tokens.length) return null

    return this.parseApplication()
  }

  private parseApplication(): Term | null {
    let left = this.parseAtom()
    if (!left) return null

    // Parse arguments for function application
    const args: Term[] = []

    while (this.position < this.tokens.length && this.tokens[this.position] !== ')') {
      const arg = this.parseAtom()
      if (!arg) break
      args.push(arg)
    }

    if (args.length > 0) {
      return {
        type: 'application',
        function: left,
        arguments: args
      }
    }

    return left
  }

  private parseAtom(): Term | null {
    if (this.position >= this.tokens.length) return null

    const token = this.tokens[this.position]

    // Handle parenthesized expressions
    if (token === '(') {
      this.position++ // consume '('
      const term = this.parseApplication()
      if (this.position < this.tokens.length && this.tokens[this.position] === ')') {
        this.position++ // consume ')'
      }
      return term
    }

    this.position++

    // Check if it's a number
    if (!isNaN(Number(token))) {
      return {
        type: 'literal',
        value: Number(token)
      }
    }

    // Variable or function name
    return {
      type: 'variable',
      name: token
    }
  }
}

// Convert AST to React Flow nodes and edges
class FlowChartGenerator {
  private nodeId = 0;
  private nodes: Node[] = [];
  private edges: Edge[] = [];

  generateFlowChart(definitions: FunctionDefinition[]): { nodes: Node[], edges: Edge[] } {
    this.nodeId = 0
    this.nodes = []
    this.edges = []

    // Group definitions by function name
    const functionGroups = new Map<string, FunctionDefinition[]>()
    definitions.forEach(def => {
      if (!functionGroups.has(def.name)) {
        functionGroups.set(def.name, [])
      }
      functionGroups.get(def.name)!.push(def)
    })

    let yOffset = 0
    functionGroups.forEach((defGroup, functionName) => {
      this.generateFunctionFlow(functionName, defGroup, yOffset)
      yOffset += 300 // Space between different functions
    })

    return { nodes: this.nodes, edges: this.edges }
  } private generateFunctionFlow(functionName: string, definitions: FunctionDefinition[], yOffset: number) {
    // Create entry node for function
    const entryId = `entry-${this.nodeId++}`
    this.nodes.push({
      id: entryId,
      type: 'input',
      position: { x: 0, y: yOffset },
      data: { label: functionName },
      style: { background: '#e1f5fe', border: '2px solid #0277bd' }
    })

    let currentY = yOffset + 80

    // Create pattern matching branches for each definition
    definitions.forEach((def, index) => {
      const patternId = `pattern-${this.nodeId++}`
      const bodyId = `body-${this.nodeId++}`

      // Pattern node
      const patternLabel = def.patterns.length > 0
        ? def.patterns.map(p => this.formatPattern(p)).join(' ')
        : 'default'

      this.nodes.push({
        id: patternId,
        position: { x: 100 + index * 250, y: currentY },
        data: { label: patternLabel },
        style: { background: '#fff3e0', border: '2px solid #f57c00' }
      })

      // Edge from entry to pattern
      this.edges.push({
        id: `${entryId}-${patternId}`,
        source: entryId,
        target: patternId,
        label: `case ${index + 1}`
      })

      // Generate body flow
      const bodyNodes = this.generateTermFlow(def.body, bodyId, 100 + index * 250, currentY + 80)

      // Edge from pattern to body
      if (bodyNodes.length > 0) {
        this.edges.push({
          id: `${patternId}-${bodyNodes[0].id}`,
          source: patternId,
          target: bodyNodes[0].id
        })
      }
    })
  }

  private generateTermFlow(term: Term, nodeId: string, x: number, y: number): Node[] {
    const nodes: Node[] = []

    if (term.type === 'literal') {
      nodes.push({
        id: nodeId,
        position: { x, y },
        data: { label: String(term.value) },
        style: { background: '#e8f5e8', border: '2px solid #4caf50' }
      })
    } else if (term.type === 'variable') {
      nodes.push({
        id: nodeId,
        position: { x, y },
        data: { label: term.name || 'var' },
        style: { background: '#f3e5f5', border: '2px solid #9c27b0' }
      })
    } else if (term.type === 'application' && term.function && term.arguments) {
      // Function application node
      nodes.push({
        id: nodeId,
        position: { x, y },
        data: { label: term.function.name || 'apply' },
        style: { background: '#fff8e1', border: '2px solid #ff9800' }
      })

      // Create nodes for arguments
      term.arguments.forEach((arg, index) => {
        const argId = `${nodeId}-arg-${index}`
        const argNodes = this.generateTermFlow(arg, argId, x + (index - term.arguments!.length / 2 + 0.5) * 150, y + 100)
        nodes.push(...argNodes)

        // Connect function to arguments
        if (argNodes.length > 0) {
          this.edges.push({
            id: `${nodeId}-${argNodes[0].id}`,
            source: nodeId,
            target: argNodes[0].id,
            label: `arg ${index + 1}`
          })
        }
      })
    }

    this.nodes.push(...nodes)
    return nodes
  }

  private formatPattern(pattern: Pattern): string {
    if (pattern.args && pattern.args.length > 0) {
      const args = pattern.args.map(arg => this.formatPattern(arg)).join(' ')
      return `${pattern.name} ${args}`
    }
    return pattern.name
  }
}

export default function AlgorithmVisualizer() {
  const [code, setCode] = useState(`factorial Z = 1
factorial (S n) = mult (S n) (factorial n)
add Z m = m
add (S n) m = S (add n m)`)

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const compileToFlowChart = () => {
    try {
      const parser = new FunctionalParser()
      const definitions = parser.parse(code)

      if (definitions.length === 0) {
        alert('No valid function definitions found. Please check your syntax.')
        return
      }

      const generator = new FlowChartGenerator()
      const { nodes: newNodes, edges: newEdges } = generator.generateFlowChart(definitions)

      setNodes(newNodes)
      setEdges(newEdges)
    } catch (error) {
      alert(`Parsing error: ${error}`)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b bg-background">
        <h1 className="text-2xl font-bold mb-4">Algorithm Visualizer</h1>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Functional Pseudo Code:
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-32 p-3 border rounded-md font-mono text-sm"
              placeholder="Enter your functional pseudo code here..."
            />
          </div>
          <div className="flex flex-col justify-end">
            <Button onClick={compileToFlowChart} className="mb-2">
              Compile to Flow Chart
            </Button>
            <div className="text-xs text-muted-foreground">
              <p>Syntax examples:</p>
              <p>• <code>func Z = 1</code></p>
              <p>• <code>func (S n) = add 1 n</code></p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
          <Panel position="top-right">
            <div className="bg-background p-2 rounded border text-xs">
              <div className="mb-1"><span className="inline-block w-3 h-3 bg-blue-100 border-2 border-blue-600 mr-1"></span>Function Entry</div>
              <div className="mb-1"><span className="inline-block w-3 h-3 bg-orange-100 border-2 border-orange-600 mr-1"></span>Pattern Match</div>
              <div className="mb-1"><span className="inline-block w-3 h-3 bg-yellow-100 border-2 border-orange-500 mr-1"></span>Function Call</div>
              <div className="mb-1"><span className="inline-block w-3 h-3 bg-green-100 border-2 border-green-600 mr-1"></span>Literal</div>
              <div><span className="inline-block w-3 h-3 bg-purple-100 border-2 border-purple-600 mr-1"></span>Variable</div>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}