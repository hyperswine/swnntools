'use client'

import React, { useState } from 'react'
import { Search, Check, X } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

const ComponentGuide = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const components = {
    'Data Display': {
      'Tables': {
        use: [
          'Data is structured with clear columns and rows',
          'Users need to compare values across rows',
          'Data needs sorting/filtering capabilities',
          'Information density is important'
        ],
        avoid: [
          'Primarily visual content',
          'Mobile interfaces where possible'
        ]
      },
      'Cards': {
        use: [
          'Content contains mixed media (images, text, actions)',
          'Items need equal visual weight',
          'Content is modular and self-contained',
          'Browse-heavy interfaces'
        ],
        avoid: [
          'Dense data comparison needed',
          'Quick scanning of many items is primary goal'
        ]
      },
      'Lists': {
        use: [
          'Sequential or hierarchical information',
          'Text-heavy content',
          'Mobile-first designs',
          'Quick scanning is important'
        ],
        avoid: [
          'Content requiring visual comparison',
          'Items have complex internal structure'
        ]
      }
    },
    'Input Components': {
      'Dropdown Select': {
        use: [
          '5-15 predefined options',
          'Single selection required',
          'Space is limited',
          'Options are familiar to users'
        ],
        avoid: [
          'Fewer than 5 options (use radio instead)',
          'More than 15 options (use combobox/search)'
        ]
      },
      'Radio Buttons': {
        use: [
          '2-5 mutually exclusive options',
          'Options need to be immediately visible',
          'Clear, binary choices'
        ],
        avoid: [
          'More than 5 options',
          'When space is very limited'
        ]
      },
      'Checkboxes': {
        use: [
          'Multiple selections allowed',
          'Independent options',
          'Binary yes/no choices'
        ],
        avoid: [
          'Mutually exclusive options',
          'Single-selection requirements'
        ]
      }
    },
    'Navigation': {
      'Tabs': {
        use: [
          'Clear categories of related content',
          'Limited number of sections (2-7)',
          'Equal hierarchy between sections'
        ],
        avoid: [
          'More than 7 sections',
          'Nested navigation'
        ]
      },
      'Breadcrumbs': {
        use: [
          'Deep hierarchical navigation',
          'Complex site structures',
          'Users need location context'
        ],
        avoid: [
          'Flat site structures',
          'Single-level navigation'
        ]
      },
      'Sidebar Navigation': {
        use: [
          'Complex navigation hierarchies',
          'Persistent navigation needed',
          'Desktop-focused interfaces'
        ],
        avoid: [
          'Simple sites',
          'Mobile-first designs'
        ]
      }
    }
  }

  const filterComponents = (components, searchTerm) => {
    if (!searchTerm) return components

    const filtered = {}
    Object.entries(components).forEach(([category, categoryComponents]) => {
      const filteredCategory = {}
      Object.entries(categoryComponents).forEach(([component, details]) => {
        const matchesSearch =
          component.toLowerCase().includes(searchTerm.toLowerCase()) ||
          details.use.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())) ||
          details.avoid.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))

        if (matchesSearch) {
          filteredCategory[component] = details
        }
      })
      if (Object.keys(filteredCategory).length > 0) {
        filtered[category] = filteredCategory
      }
    })
    return filtered
  }

  const filteredComponents = filterComponents(components, searchTerm)

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <div className="sticky top-0 bg-white p-4 shadow-sm z-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search components, use cases, or considerations..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {Object.entries(filteredComponents).map(([category, categoryComponents]) => (
          <AccordionItem key={category} value={category} className="border rounded-lg p-2">
            <AccordionTrigger className="text-xl font-semibold px-4">
              {category}
            </AccordionTrigger>
            <AccordionContent className="space-y-6 px-4">
              {Object.entries(categoryComponents).map(([component, details]) => (
                <div key={component} className="space-y-4 border-b pb-4 last:border-b-0">
                  <h3 className="text-lg font-medium">{component}</h3>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-600 flex items-center gap-2">
                      <Check className="h-4 w-4" /> When to use:
                    </h4>
                    <ul className="list-disc pl-8 space-y-1">
                      {details.use.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-red-600 flex items-center gap-2">
                      <X className="h-4 w-4" /> When to avoid:
                    </h4>
                    <ul className="list-disc pl-8 space-y-1">
                      {details.avoid.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ComponentGuide