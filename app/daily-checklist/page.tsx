'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const DailySchedule = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editText, setEditText] = useState('')

  // Load tasks from localStorage and check if we need to reset
  useEffect(() => {
    const storedData = localStorage.getItem('dailySchedule')
    if (storedData) {
      const { tasks: storedTasks, lastUpdate } = JSON.parse(storedData)
      const today = new Date().toDateString()

      if (lastUpdate === today) {
        setTasks(storedTasks)
      } else {
        // Reset checkboxes for a new day
        const resetTasks = storedTasks.map(task => ({
          ...task,
          completed: false
        }))
        setTasks(resetTasks)
        saveToLocalStorage(resetTasks)
      }
    }
  }, [])

  // Save tasks to localStorage
  const saveToLocalStorage = (updatedTasks) => {
    const data = {
      tasks: updatedTasks,
      lastUpdate: new Date().toDateString()
    }
    localStorage.setItem('dailySchedule', JSON.stringify(data))
  }

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask.trim(), completed: false }]
      setTasks(updatedTasks)
      saveToLocalStorage(updatedTasks)
      setNewTask('')
    }
  }

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(updatedTasks)
    saveToLocalStorage(updatedTasks)
  }

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
    saveToLocalStorage(updatedTasks)
  }

  // Start editing task
  const startEdit = (index) => {
    setEditingIndex(index)
    setEditText(tasks[index].text)
  }

  // Save edited task
  const saveEdit = () => {
    if (editText.trim()) {
      const updatedTasks = tasks.map((task, i) =>
        i === editingIndex ? { ...task, text: editText.trim() } : task
      )
      setTasks(updatedTasks)
      saveToLocalStorage(updatedTasks)
      setEditingIndex(null)
      setEditText('')
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-16">
      <CardHeader>
        <CardTitle>Daily Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Add new task..."
            className="flex-1"
          />
          <Button onClick={handleAddTask}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className="w-4 h-4"
              />

              {editingIndex === index ? (
                <div className="flex-1 flex gap-2">
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={saveEdit}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingIndex(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEdit(index)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTask(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default DailySchedule