'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function BackButton() {
  const pathname = usePathname()

  // Don't show back button on home page
  if (pathname === '/') {
    return null
  }

  return (
    <div className="fixed top-6 left-6 z-50">
      <Link
        href="/"
        className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-gray-300 group"
      >
        <FaArrowLeft className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-300" />
      </Link>
    </div>
  )
}
