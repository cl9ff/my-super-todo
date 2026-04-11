"use client" // Это важно для интерактивности
import { useState } from 'react';

export default function Home() {
  return (
    <div>
      <h1 className='text-2xl mb-4'>🚀 My Future App</h1>
      <input
        className='border p-2 mr-2 text-black'
        placeholder='Что нужно сделать?'
      />
      <button className='bg-blue-500 text-white p-2 px-4 rounded'>Добавить</button>
    </div>
  );
}