import { FaSpinner } from "react-icons/fa";


export default function Loading() {
  return (
   <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <FaSpinner className="fa-solid fa-spinner animate-spin text-4xl sm:text-5xl text-indigo-500" />
    </div>
  )
}
