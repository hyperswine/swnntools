'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AlertCircle, ChevronDown, ChevronRight } from 'lucide-react'

// Template definitions for common Lego block groups
const templateLibrary = {
  wings: {
    name: 'Aircraft Wings',
    categories: ['aircraft', 'aerodynamic'],
    variants: [
      {
        name: 'Basic Wing',
        parts: [
          { id: '3032', name: 'Plate 4x6', quantity: 2, color: 'Light Gray' },
          { id: '3031', name: 'Plate 4x4', quantity: 2, color: 'Light Gray' },
          { id: '3460', name: 'Plate 1x8', quantity: 4, color: 'Light Gray' }
        ],
        instructions: [
          'Start with 4x6 plate as base',
          'Add 4x4 plates at front for thickness',
          'Use 1x8 plates along edges for detail'
        ],
        connections: ['Attaches to fuselage via 2x2 plate', 'Can stack for larger wings']
      },
      {
        name: 'Swept Wing',
        parts: [
          { id: '3034', name: 'Plate 2x8', quantity: 4, color: 'Light Gray' },
          { id: '3033', name: 'Plate 2x6', quantity: 2, color: 'Light Gray' },
          { id: '3023', name: 'Plate 1x2', quantity: 6, color: 'Light Gray' }
        ],
        instructions: [
          'Layer 2x8 plates at 15-degree angle',
          'Add 2x6 plates for strength',
          'Use 1x2 plates for wing tips'
        ],
        connections: ['Connects to body with 2x4 plate', 'Supports flap modifications']
      }
    ]
  },
  wheels: {
    name: 'Vehicle Wheels',
    categories: ['vehicle', 'mechanical'],
    variants: [
      {
        name: 'Basic Axle System',
        parts: [
          { id: '3706', name: 'Technic Axle 6', quantity: 1, color: 'Black' },
          { id: '4624', name: 'Wheel 8mm', quantity: 2, color: 'Black' },
          { id: '3713', name: 'Technic Bush', quantity: 4, color: 'Light Gray' }
        ],
        instructions: [
          'Insert axle through wheels',
          'Secure with bushings on both sides',
          'Mount to chassis with technic bricks'
        ],
        connections: ['Compatible with standard technic frames', 'Can be motorized']
      }
    ]
  },
  gears: {
    name: 'Technic Gear Systems',
    categories: ['mechanical', 'technic'],
    variants: [
      {
        name: 'Basic Gear Train',
        parts: [
          { id: '3648', name: '8t Gear', quantity: 1, color: 'Light Gray' },
          { id: '3649', name: '24t Gear', quantity: 1, color: 'Light Gray' },
          { id: '3706', name: 'Technic Axle 6', quantity: 2, color: 'Black' }
        ],
        instructions: [
          'Mount 8t gear on drive axle',
          'Mount 24t gear on driven axle',
          'Space axles 3 studs apart'
        ],
        connections: ['Can be chained for further reduction', 'Supports motor input']
      }
    ]
  }
}

const TechnicalDiagram = ({ type }) => {
  const diagrams = {
    wings: (
      <svg viewBox="0 0 200 100" className="w-full h-32">
        {/* Simplified wing diagram */}
        <rect x="20" y="20" width="160" height="40" fill="#e4e4e4" stroke="#666" />
        <rect x="20" y="30" width="120" height="20" fill="#d4d4d4" stroke="#666" />
        <text x="70" y="45" fontSize="8">4x6 Base</text>
        <line x1="10" y1="20" x2="10" y2="60" stroke="#333" strokeWidth="0.5" />
        <text x="5" y="40" fontSize="6">6 studs</text>
      </svg>
    ),
    wheels: (
      <svg viewBox="0 0 200 100" className="w-full h-32">
        {/* Simplified axle diagram */}
        <line x1="20" y1="50" x2="180" y2="50" stroke="#333" strokeWidth="4" />
        <circle cx="60" cy="50" r="30" fill="#333" />
        <circle cx="140" cy="50" r="30" fill="#333" />
        <text x="85" y="90" fontSize="8">6 stud spacing</text>
      </svg>
    ),
    gears: (
      <svg viewBox="0 0 200 100" className="w-full h-32">
        {/* Simplified gear diagram */}
        <circle cx="60" cy="50" r="20" fill="none" stroke="#666" strokeWidth="2" />
        <circle cx="140" cy="50" r="40" fill="none" stroke="#666" strokeWidth="2" />
        <text x="50" y="45" fontSize="8">8t</text>
        <text x="130" y="45" fontSize="8">24t</text>
      </svg>
    )
  }

  return diagrams[type] || null
}

const TemplateGroup = ({ group, groupKey, isOpen, onToggle }) => { // Added groupKey
  return (
    <div className="border rounded-lg mb-4">
      <button
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {isOpen ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
          <span className="font-medium">{group.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          {group.variants.length} variants
        </div>
      </button>

      {isOpen && (
        <div className="p-4 border-t">
          <div className="mb-4">
            <TechnicalDiagram type={groupKey} /> {/* Changed type to groupKey */}
          </div>
          {group.variants.map((variant, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-medium mb-2">{variant.name}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Required Parts:</h4>
                  <ul className="text-sm space-y-1">
                    {variant.parts.map((part, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{part.name} ({part.color})</span>
                        <span className="text-gray-500">×{part.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Assembly Steps:</h4>
                  <ol className="text-sm list-decimal list-inside space-y-1">
                    {variant.instructions.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Connection Points:</h4>
                <ul className="text-sm space-y-1">
                  {variant.connections.map((connection, idx) => (
                    <li key={idx} className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                      {connection}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const LegoTemplateSystem = () => {
  const [openGroups, setOpenGroups] = useState(new Set())

  const toggleGroup = (groupName) => {
    const newOpenGroups = new Set(openGroups)
    if (newOpenGroups.has(groupName)) {
      newOpenGroups.delete(groupName)
    } else {
      newOpenGroups.add(groupName)
    }
    setOpenGroups(newOpenGroups)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Lego Block Group Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(templateLibrary).map(([key, group]) => (
              <TemplateGroup
                key={key}
                group={group}
                groupKey={key} // Added groupKey prop
                isOpen={openGroups.has(key)}
                onToggle={() => toggleGroup(key)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LegoTemplateSystem