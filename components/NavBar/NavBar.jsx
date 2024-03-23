'use client'
import { useSelector } from "react-redux";
import { selectDarkMode } from "@/redux/features/darkModeSlice";
import {signIn,useSession,signOut} from 'next-auth/react';
import ButtonDarkMode from "@/components/ui/buttonDarkMode";

export default function NavBar() {
    const modeSelector = useSelector(selectDarkMode);
    const {data:session}= useSession();
    // console.log(session.user.image)
    
    return (
        <div className={`flex justify-end items-center h-full pr-2 shrink-0  bg-green-400   ${modeSelector}`}>
            <div className="flex items-center space-x-1">
                {
                    session?.user ? (
                        <div className="flex gap-x-2 items-center">
                            <p>{session.user.name} {session.user.email}</p>
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                                <img src={session.user.image} alt="Avatar"  className="w-12 h-12 rounded-full" />
                            </div>
                            <button onClick={async()=> await signOut({callbackUrl:'/'})} className="dark:bg-slate-600 bg-gray-200 border-2 dark:border-slate-700 border-gray-300 rounded-lg dark:text-white text-black px-6 py-3 text-base dark:hover:border-white hover:border-black cursor-pointer transition">
                                Sing out
                            </button>
                        </div>
                    )
                    :(
                        <button onClick={()=>signIn()} className="dark:bg-slate-600 bg-gray-200 border-2 dark:border-slate-700 border-gray-300 rounded-lg dark:text-white text-black px-6 py-3 text-base dark:hover:border-white hover:border-black cursor-pointer transition">
                            Sign In
                        </button>
                    )

                }
                <ButtonDarkMode></ButtonDarkMode>
            </div>
        </div>
    )
}
