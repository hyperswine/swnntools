import Link from "next/link"

export default function Page() {
  return <center>
    <h1>
      Various Tools.
    </h1>

    <Link href='taskswitcher2'>
      <div className="text-red-500">Check out TaskSwitcher here</div>
    </Link>

    <Link href='timetable'>
      <div className="text-red-500">Check out Timetable here</div>
    </Link>
  </center>
}