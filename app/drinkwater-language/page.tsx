'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LanguageEntry {
  name: string
  description: string
  code?: string
  category: string
}

const languages: LanguageEntry[] = [
  {
    name: "Java",
    category: "Enterprise",
    description: "You drank the water. But only after creating a Cup, a Hand, and a WaterDrinkingServiceImplFactory. 45 lines later and 4.5GB RAM usage, you're hydrated... in enterprise.",
  },
  {
    name: "Python",
    category: "Scripting",
    description: "You drank the water. Short, sweet, and your virtualenv broke 5 minutes later.",
    code: `print("Drinking water.")`,
  },
  {
    name: "Haskell",
    category: "Functional",
    description: "You didn't drink the water. You wrote: Then spent the next 2 hours reasoning about monads. You're spiritually quenched, physically thirsty.",
    code: `drink :: Monad m => m Water -> m HydratedYou`,
  },
  {
    name: "Rust",
    category: "Systems",
    description: "You wanted to drink the water. First you had to: • Prove ownership • Handle lifetimes • Borrow &mut water Then finally: Ok(()). You drank safely. You also passed out from exhaustion.",
  },
  {
    name: "C++",
    category: "Systems",
    description: "You're thirsty as hell. So you open a CMake project. You wrap your water in std::shared_ptr, add templates, Boost, and 100 lines of code for zero-overhead hydration. Then it segfaults. You haven't drunk anything in 24 hours.",
  },
  {
    name: "Go",
    category: "Systems",
    description: "You define a goroutine to fetch water. You drink happily. Then stare at others with their abstract typeclass monads and shed a single productive tear.",
    code: `go drink(water)`,
  },
  {
    name: "TypeScript",
    category: "Web",
    description: "You drank the water. But only after compiling it to JavaScript. Neat! Except the types were optional, and you drank null.",
  },
  {
    name: "C",
    category: "Systems",
    description: "You drank the water. Then segfaulted. You forgot to check if the water pointer was NULL. Also forgot to free(water). Oh well. The OS will clean it up.",
  },
  {
    name: "Erlang",
    category: "Functional",
    description: "You define a water_server and send a message: water ! drink. It works beautifully. Until water crashes and brings down the entire node. But it restarts instantly. Magic?",
  },
  {
    name: "SML",
    category: "Functional",
    description: "You drank the water. It was elegant. It was pure. But now you sit in silence, wondering if anyone else remembers you.",
  },
  {
    name: "F#",
    category: "Functional",
    description: "You drank the water. It felt good. Then you wondered why you needed to install the entire .NET stack just to hydrate. And started eyeing C# again.",
  },
  {
    name: "Idris / Coq / Lean / Agda / Isabelle",
    category: "Theorem Provers",
    description: "You drank the water... eventually. But first you had to: • Prove the cup exists • Prove the water is drinkable • Use 10 rewrite tactics in the wrong order But you know it's correct.",
  },
  {
    name: "MATLAB",
    category: "Scientific",
    description: "You drank the water. But only at school, because your engineering department said so. Took an hour to install and 10GB of memory just to idle.",
  },
  {
    name: "Maple",
    category: "Scientific",
    description: "You drank the water by making a matrix: [drink 0] [0 drink] Then multiplied it with a you vector. Just because.",
  },
  {
    name: "Mathematica",
    category: "Scientific",
    description: "You would have drank the water. But you couldn't afford the license.",
  },
  {
    name: "Brainfuck",
    category: "Esoteric",
    description: "You drank the water... you think.",
    code: `>+++++[<++++++++>-]<.>+++++++[<++++>-]<+.`,
  },
  {
    name: "Bash",
    category: "Shell",
    description: "You drank the water by doing: Then accidentally overwrote your home directory.",
    code: `cat water.txt | grep drink > mouth`,
  },
  {
    name: "SQL",
    category: "Database",
    description: "You queried the water: ...forgot the WHERE clause. Flooded the database.",
    code: `SELECT * FROM cups WHERE state = 'full';`,
  },
  {
    name: "Regex",
    category: "Pattern Matching",
    description: "You drank the water. But only if it matched: ^\\s*water\\s*\\(drink\\)?\\s*$ And even then it may have matched 'wart'.",
  },
  {
    name: "Excel",
    category: "Spreadsheet",
    description: "You drank the water by typing =DRINK(A1) and dragging it down 10,000 cells. Now the office printer is out of paper and your chart has clipart.",
  },
  {
    name: "Assembly",
    category: "Low-level",
    description: "You assembled water: You forgot to push the cup to the stack. Now your esophagus is overwritten.",
    code: `MOV AX, [water]
CALL drink`,
  },
  {
    name: "Racket",
    category: "Functional",
    description: "You drank the water. But only after: Then made your own language for soup.",
    code: `#lang drink-water
(drink 'cup)`,
  },
  {
    name: "COBOL",
    category: "Legacy",
    description: "YOU DRANK THE WATER. BUT FIRST YOU IDENTIFICATION DIVISION. ENVIRONMENT DIVISION. DATA DIVISION. PROCEDURE DIVISION. THEN WROTE A NOVEL ABOUT IT.",
  },
  {
    name: "Elixir",
    category: "Functional",
    description: "You spawned a process WaterDrinker under a HydrationSupervisor. It drank the water and logged to LiveView in real time. When it crashed, Phoenix just restarted it.",
  },
  {
    name: "Perl",
    category: "Scripting",
    description: "You drank the water. The line was 1 character long. Nobody knows how. Not even you.",
  },
  {
    name: "LaTeX",
    category: "Typesetting",
    description: "You tried to drink water. You ended up typesetting a beautiful 15-page paper about water, hydration, and fluid mechanics. Had to compile it three times.",
  },
  {
    name: "VHDL / Verilog",
    category: "Hardware",
    description: "You didn't drink the water. You designed a circuit that would drink it at 50MHz... in simulation.",
  },
  {
    name: "HTML/CSS",
    category: "Web",
    description: "You wrote <div class=\"cup\">water</div> and styled it beautifully. But you still need JavaScript to actually drink it.",
  },
]

const categories = Array.from(new Set(languages.map(lang => lang.category)))

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Enterprise": "bg-blue-100 text-blue-800",
    "Scripting": "bg-green-100 text-green-800",
    "Functional": "bg-purple-100 text-purple-800",
    "Systems": "bg-red-100 text-red-800",
    "Web": "bg-yellow-100 text-yellow-800",
    "Scientific": "bg-orange-100 text-orange-800",
    "Esoteric": "bg-pink-100 text-pink-800",
    "Shell": "bg-gray-100 text-gray-800",
    "Database": "bg-cyan-100 text-cyan-800",
    "Pattern Matching": "bg-indigo-100 text-indigo-800",
    "Spreadsheet": "bg-lime-100 text-lime-800",
    "Low-level": "bg-rose-100 text-rose-800",
    "Legacy": "bg-amber-100 text-amber-800",
    "Typesetting": "bg-violet-100 text-violet-800",
    "Hardware": "bg-emerald-100 text-emerald-800",
    "Theorem Provers": "bg-fuchsia-100 text-fuchsia-800",
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

export default function DrinkWaterLanguagePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredLanguages = selectedCategory
    ? languages.filter(lang => lang.category === selectedCategory)
    : languages

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            💧 Drinking Water in Different Programming Languages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A cursed compendium of hydration across syntaxes, paradigms, and suffering.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border"
              }`}
            >
              All Languages
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((language, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {language.name}
                  </CardTitle>
                  <Badge className={getCategoryColor(language.category)}>
                    {language.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {language.description.split('•').map((part, i) => (
                    <span key={i}>
                      {i > 0 && <span className="block mt-1">• {part}</span>}
                      {i === 0 && part}
                    </span>
                  ))}
                </p>
                {language.code && (
                  <div className="bg-gray-900 rounded-lg p-3 mt-3">
                    <code className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                      {language.code}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500 italic">
            Want more? Turing Machine edition coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}
