'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Timer, Eye, EyeOff, X, Clock } from 'lucide-react'

const PomodoroTimer = () => {
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState('default')
  const [showTime, setShowTime] = useState(false)
  const [history, setHistory] = useState([])
  const audioRef = useRef(null)

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]')
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const filteredHistory = storedHistory.filter(item => item.timestamp > oneWeekAgo)
    setHistory(filteredHistory)
  }, [])

  useEffect(() => {
    localStorage.setItem('pomodoroHistory', JSON.stringify(history))
  }, [history])

  const getRandomTime = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) * 60

  const startTimer = (timerMode) => {
    setMode(timerMode)
    let duration
    switch (timerMode) {
      case 'default':
        duration = Math.random() < 0.5 ? 15 * 60 : 30 * 60
        break
      case 'green':
        duration = getRandomTime(30, 45)
        break
      case 'red':
        duration = getRandomTime(15, 25)
        break
      default:
        duration = 25 * 60
    }
    setTime(duration)
    setIsActive(true)
  }

  const cancelTimer = () => {
    if (isActive) {
      setHistory(prev => [...prev, { mode, duration: time, timestamp: Date.now() }])
      setIsActive(false)
      setTime(0)
    }
  }

  useEffect(() => {
    let interval = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (time === 0 && isActive) {
      setIsActive(false)
      setHistory(prev => [...prev, { mode, duration: time, timestamp: Date.now() }])
      audioRef.current.play()
      setTimeout(() => {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isActive, time, mode])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const buttonStyle = "px-4 py-2 rounded font-bold text-white"

  const statusColor = isActive
    ? mode === 'default'
      ? 'bg-blue-500'
      : mode === 'green'
        ? 'bg-green-500'
        : 'bg-red-500'
    : 'bg-gray-300'

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <div className={`w-4 h-4 rounded-full ${statusColor} ${isActive ? 'animate-pulse' : ''}`} />
        <div className="text-4xl font-bold relative">
          {showTime ? formatTime(time) : '??:??'}
          <Button
            onClick={() => setShowTime(!showTime)}
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 p-1"
          >
            {showTime ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => startTimer('default')} className={`${buttonStyle} bg-blue-500`}>
          <Timer className="mr-2" />
          Random
        </Button>
        <Button onClick={() => startTimer('green')} className={`${buttonStyle} bg-green-500`}>
          <Timer className="mr-2" />
          Focus
        </Button>
        <Button onClick={() => startTimer('red')} className={`${buttonStyle} bg-red-500`}>
          <Timer className="mr-2" />
          Break
        </Button>
        {isActive && (
          <Button onClick={cancelTimer} className={`${buttonStyle} bg-gray-500`}>
            <X className="mr-2" />
            Cancel
          </Button>
        )}
      </div>
      <div className={`text-sm ${isActive ? (mode === 'default' ? 'text-blue-500' : mode === 'green' ? 'text-green-500' : 'text-red-500') : 'text-gray-500'}`}>
        {isActive ? `${mode.charAt(0).toUpperCase() + mode.slice(1)} Timer Active` : 'Timer Inactive'}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Recent Timers</h3>
        <ul className="space-y-2">
          {history.slice(-5).reverse().map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Clock size={16} className={item.mode === 'default' ? 'text-blue-500' : item.mode === 'green' ? 'text-green-500' : 'text-red-500'} />
              <span>{item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}</span>
              <span>{formatTime(item.duration)}</span>
              <span className="text-gray-500 text-sm">
                {new Date(item.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <audio ref={audioRef}>
        <source src="alarm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default PomodoroTimer