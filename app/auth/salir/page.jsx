'use client'
import { signOut } from 'next-auth/react'
import { useSelector } from 'react-redux';
import { selectDarkMode } from '@/redux/features/darkModeSlice';
export default function Page() {
  const modeSelector = useSelector(selectDarkMode);
  return (
    <div className={`${modeSelector} dark:bg-black h-screen flex items-center justify-center flex-col`}>
        <p>quieres cerrar session</p>
        <button onClick={ () => {signOut({callbackUrl:'/'})}}>Sign out</button>

    </div>
  )
}
