"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [task, setTask] = useState("")
  const [todoList, setTodoList] = useState<{ id: number, text: string, completed: boolean }[]>([])

  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    }

    setTodoList([...todoList, newTodo])
    setTask("")
  }

  const handleDeleteTask = (idToDelete: number) => {
    setTodoList(todoList.filter(t => t.id !== idToDelete))
  }

  const toggleTodo = (id: number) => {
    setTodoList(todoList.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const completedList = () => todoList.filter(t => t.completed)

  const notCompletedList = () => todoList.filter(t => !t.completed);

  useEffect(() => {
    const saved = localStorage.getItem('my-todos')
    if (saved) {
      setTodoList(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todoList));
  }, [todoList])

  return (
    <div className="flex h-screen bg-[#181820] text-white font-sans">
      <aside className="w-64 bg-[#1e1e26] p-6 flex flex-col border-r border-gray-800">
        <div className="text-xl font-bold mb-10">Aokigahara</div>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
            <span>🔍</span> Поиск
          </div>
          <div className="flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer">
            <span>📅</span> Сегодня
          </div>
          <div className="p-2 bg-[#2a2a35] rounded-lg border-l-4 border-pink-500">
            📚 Школа
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-8 block">Школа</h2>
        <div className="grid grid-cols-2 gap-10">
          {/* Колонка активных задач */}
          <div>
            <h3 className="text-gray-400 mb-4 font-medium">Дела по учебе</h3>
            <input
              className='className="bg-[#1e1e26] border border-gray-700 text-white p-2 mr-2 rounded outline-none focus:border-pink-500 transition-colors"'
              placeholder='Что нужно сделать?'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button
              className='bg-blue-500 text-white p-2 px-4 rounded'
              onClick={handleAddTask}
            >Добавить</button>
            <ul>
              {notCompletedList()
                .map((item) => (
                  <li key={item.id} className="bg-[#1e1e26]/50 p-4 rounded-xl flex items-center gap-3 border border-gray-800">
                    <button
                      onClick={() => toggleTodo(item.id)}
                      className="w-6 h-6 rounded-full border border-pink-500 flex items-center justify-center text-white text-xs"
                    >
                    </button>
                    <span
                      onClick={() => toggleTodo(item.id)}
                      className={item.completed === true ? "line-through text-gray-400" : ""}
                    >
                      {item.text}
                    </span>
                    <button onClick={() => handleDeleteTask(item.id)}>❌</button>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-4 font-medium">Выполненных задач — {todoList.filter(t => t.completed).length}</h3>
            <ul>
              {completedList()
                .map((item) => (
                  <li key={item.id} className="bg-[#1e1e26]/50 p-4 rounded-xl flex items-center gap-3 border border-gray-800 opacity-60">
                    <button
                      onClick={() => toggleTodo(item.id)}
                      className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs"
                    >
                      ✓
                    </button>
                    <span className="flex-1 line-through text-gray-400">{item.text}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}