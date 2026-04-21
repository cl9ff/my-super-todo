"use client"
import { useState } from "react";
import Image from "next/image";
import PlusSvg from "@/public/plus.svg"

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [localTask, setLocalTask] = useState("")
  
  const handleAdd = () => {
    if (localTask.trim() === "") return;
    onAddTask(localTask);
    setLocalTask("");
  }
  
  return (
    <div className="mb-3 p-4 border-3 border-elements rounded-3xl bg-[#3D2A34] flex justify-between gap-4">
      <input
        className="w-full focus:outline-none"
        value={localTask}
        onChange={(e) => setLocalTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button 
        className="bg-accent p-2 rounded-xl"
        onClick={handleAdd}>
          <Image
            src={PlusSvg}
            alt="PlusSvg"
          />
      </button>
    </div>
  )
}