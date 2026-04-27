"use client"
import { useEffect, useState } from 'react';
import TaskList from '@/components/ui/TaskList';
import TaskInput from '@/components/ui/TaskInput';
import Sidebar from '@/components/ui/Sidebar';
import PageHeader from '@/components/ui/PageHeader';

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
  children: SubTask[];
}

export default function Home() {
  const [todoList, setTodoList] = useState<Task[]>([])

  const handleAddTask = (taskText: string) => {
    if (taskText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: taskText,
      completed: false,
      children: []
    }

    setTodoList([...todoList, newTodo])
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
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className='flex-1 p-8'>
        <PageHeader
          title="Школа"
          activeCount={notCompletedList().length}
          completedCount={completedList().length}
        />
        <div className='grid grid-cols-2 gap-8 mt-8'>
          {/* Колонка активных задач */}
          <div>
            <TaskInput onAddTask={handleAddTask} />
            <TaskList
              tasks={notCompletedList()}
              title="Активные задачи"
              isCompletedList={false}
              onToggle={toggleTodo}
              onDelete={handleDeleteTask}
            />
          </div>
          {/* Колонка выполненных задач */}
          <div>
            <TaskList
              tasks={completedList()}
              title="Выполненных задач"
              isCompletedList={true}
              onToggle={toggleTodo}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}