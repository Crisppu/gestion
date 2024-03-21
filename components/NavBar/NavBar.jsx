'use client'
import { useSelector } from "react-redux";
import { selectDarkMode } from "@/redux/features/darkModeSlice";
import {signIn} from 'next-auth/react';
import ButtonDarkMode from "@/components/ui/buttonDarkMode";

export default function NavBar() {
    const modeSelector = useSelector(selectDarkMode);

    return (
        <div className={`flex justify-end items-center  h-20 pr-2 shrink-0  bg-green-400  md:h-[100px] ${modeSelector}`}>
            <div className="flex items-center space-x-1">
                <button onClick={()=>signIn()}
                    className="dark:bg-slate-600 bg-gray-200 border-2 dark:border-slate-700 border-gray-300 rounded-lg dark:text-white text-black px-6 py-3 text-base dark:hover:border-white hover:border-black cursor-pointer transition">
                    Sign In
                </button>
                <ButtonDarkMode></ButtonDarkMode>
            </div>
        </div>
    )
}
