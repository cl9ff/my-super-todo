"use client"

interface PageHeaderProps {
  title: string;
  activeCount: number;
  completedCount: number;
}

export default function PageHeader({ title, activeCount, completedCount }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-2 justify-between">{title}</h1>
      <p>
        📋 {activeCount} - активных ✅ {completedCount} - выполненно
      </p>
    </div>
  );
}