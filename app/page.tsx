import Link from "next/link"
import { FaTasks, FaCalendarAlt, FaRandom, FaChartBar, FaPalette, FaBook, FaPaintBrush, FaMusic, FaCode, FaCogs, FaBrain, FaProjectDiagram, FaGuitar, FaClipboardList, FaCubes } from "react-icons/fa" // Added FaCubes

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Various Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="taskswitcher2">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaTasks className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">TaskSwitcher</span>
          </div>
        </Link>
        <Link href="timetable">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaCalendarAlt className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Timetable</span>
          </div>
        </Link>
        <Link href="randstuff">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaRandom className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">RandStuff</span>
          </div>
        </Link>
        <Link href="data-view">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaChartBar className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">DataView</span>
          </div>
        </Link>
        <Link href="ui-chooser">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaPalette className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">UICooser</span>
          </div>
        </Link>
        <Link href="exemplardocumentationstyle">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaBook className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Exemplar Documentation</span>
          </div>
        </Link>
        <Link href="painting-practice">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaPaintBrush className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Painting Practice</span>
          </div>
        </Link>
        <Link href="piano-practice">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaMusic className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Piano Practice</span>
          </div>
        </Link>
        <Link href="program-metrics">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaCode className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Program Metrics</span>
          </div>
        </Link>
        <Link href="program-design-complexity">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaCogs className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Program Design Complexity</span>
          </div>
        </Link>
        <Link href="systematic-program-solving">
          <div className="bg-white shadow-lg rounded-l˝g p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaBrain className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Systematic Program Solving</span>
          </div>
        </Link>
        <Link href="adaptive-programming">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaProjectDiagram className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Adaptive Programming</span>
          </div>
        </Link>
        <Link href="ukulele-practice">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaGuitar className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Ukulele Practice</span>
          </div>
        </Link>
        <Link href="daily-checklist">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaClipboardList className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Daily Checklist</span>
          </div>
        </Link>
        <Link href="lego">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-gray-200 transition">
            <FaCubes className="text-red-500 text-2xl" />
            <span className="text-xl text-red-500">Lego Templates</span>
          </div>
        </Link>
      </div>
    </div>
  )
}