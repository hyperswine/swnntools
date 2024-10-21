import Link from "next/link"
import { FaTasks, FaCalendarAlt, FaRandom, FaChartBar } from "react-icons/fa" // Importing a new icon

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Various Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="taskswitcher2">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaTasks className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Check out TaskSwitcher here</span>
          </div>
        </Link>
        <Link href="timetable">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaCalendarAlt className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Check out Timetable here</span>
          </div>
        </Link>
        <Link href="randstuff">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaRandom className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Check out RandStuff here</span>
          </div>
        </Link>
        <Link href="data-view"> {/* New entry */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaChartBar className="text-red-500 text-2xl" /> {/* New icon */}
            <span className="text-xl text-red-500">Check out DataView here</span>
          </div>
        </Link>
      </div>
    </div>
  )
}