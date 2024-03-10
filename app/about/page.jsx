'use client'
import { selectDarkMode } from '@/redux/features/darkModeSlice';
import React from 'react'
import { useSelector } from 'react-redux';

export default function Page() {
  const modeSelector = useSelector(selectDarkMode);
  return (
    <div className={`bg-red-300 dark:bg-black min-h-screen ${modeSelector}`}>page about</div>
  )
}
