'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DataViewer = ({ data }) => {
  const [expandedCells, setExpandedCells] = useState({})

  const toggleCell = (rowIndex, colName) => {
    setExpandedCells(prev => ({
      ...prev,
      [`${rowIndex}-${colName}`]: !prev[`${rowIndex}-${colName}`]
    }))
  }

  const truncate = (str, n) => {
    if (typeof str !== 'string') str = JSON.stringify(str)
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str
  }

  if (!data || data.length === 0) {
    return <div className="text-center p-4">No data available</div>
  }

  const columns = Object.keys(data[0])

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {columns.map((key) => (
            <TableHead key={key} className="font-bold">{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((key) => {
              const cellKey = `${rowIndex}-${key}`
              const isExpanded = expandedCells[cellKey]
              const value = row[key]
              const cellContent = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
              return (
                <TableCell key={cellKey} className="p-2">
                  <div className="max-w-xs overflow-hidden">
                    {isExpanded ? (
                      <pre className="whitespace-pre-wrap break-words">{cellContent}</pre>
                    ) : (
                      truncate(cellContent, 50)
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCell(rowIndex, key)}
                    className="mt-2"
                  >
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </Button>
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function DataViewPage() {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      bio: 'John is a software engineer with over 10 years of experience in web development. He specializes in React and Node.js, and loves building scalable applications.',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Docker'],
      contact: { email: 'john@example.com', phone: '123-456-7890' }
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 28,
      bio: 'Jane is a data scientist passionate about machine learning and AI. She has a Ph.D. in Computer Science and has published several papers on natural language processing.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'R'],
      contact: { email: 'jane@example.com', phone: '098-765-4321' }
    },
    {
      id: 3,
      name: 'Bob Johnson',
      age: 35,
      bio: 'Bob is a UI/UX designer with a keen eye for creating beautiful and intuitive user interfaces. He has worked with numerous startups to improve their product designs.',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'HTML', 'CSS'],
      contact: { email: 'bob@example.com', phone: '555-123-4567' }
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Employee Data Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <DataViewer data={data} />
        </CardContent>
      </Card>
    </div>
  )
}