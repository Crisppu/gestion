'use client'
import { signOut } from 'next-auth/react'
import { useSelector } from 'react-redux';
import { selectDarkMode } from '@/redux/features/darkModeSlice';
import Link from "next/link";

export default function Page() {
  const modeSelector = useSelector(selectDarkMode);
    return (
        <div className={`${modeSelector} dark:bg-black h-screen flex items-center justify-center flex-col gap-2`}>
            <Link href={'/'}><img src='/logoSantaAna.png' alt='logo Santa Ana' className={'w-40 h-24'}></img></Link>
            <p className='text-black dark:text-white text-xl'>¿Quieres cerrar session?</p>
            <button onClick={ () => {signOut({callbackUrl:'/'})}} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
                logout
            </button>
        </div>
    )
}
