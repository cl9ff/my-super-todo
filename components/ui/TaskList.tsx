"use client"
import Image from "next/image";
import CheckSvg from "@/public/check.svg"

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  title: string;
  isCompletedList?: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  tasks,
  isCompletedList = false,
  onToggle,
  onDelete
}: TaskListProps) {
  return (
    <div className='flex-1'>
      <ul className='space-y-3'>
        {tasks.map((item) => (
          <li
            key={item.id}
            className={`h-17 group bg-elements backdrop-blur-sm rounded-3xl p-4 flex items-center gap-3 ${isCompletedList ? 'opacity-75' : ''
              }`}
          >
            <button
              onClick={() => onToggle(item.id)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${isCompletedList
                ? 'border-2 border-accent bg-accent/30 hover:bg-accent/60'
                : 'border-2 border-accent hover:border-accent/70 hover:bg-accent/20'
                }`}
            >
              {isCompletedList && <Image
                src={CheckSvg}
                alt="CheckSvg"
              />}
            </button>

            <span
              onClick={() => onToggle(item.id)}
              className={`flex-1 cursor-pointer transition-all duration-200 ${isCompletedList
                ? 'line-through text-white/50'
                : 'text-white hover:text-accent'
                }`}
            >
              {item.text}
            </span>

            <button
              onClick={() => onDelete(item.id)}
              className="text-white/30 hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}