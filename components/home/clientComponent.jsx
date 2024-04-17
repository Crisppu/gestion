'use client'

import { selectDarkMode } from "@/redux/features/darkModeSlice";
import { useSelector } from "react-redux";
import Link from "next/link";


export default function ClientComponent({children}) {
    const modeSelector = useSelector(selectDarkMode);
    return (
        <main className={`flex min-h-full flex-col  dark:bg-black transition-colors duration-500 ${modeSelector}  `}>
            <div className={`bg-gradient-over-imgCaneField h-screen bg-cover bg-center `}>
                <div className="flex justify-between h-20 pr-2 shrink-0 items-center  bg-green-400 md:h-[100px]">
                    <div className="pl-2"><img src={'/logoSantaAna.png'} alt='logoSantaAna' width={60} height={60}></img></div>
                    {children}
                </div>
                <div className={'flex flex-col justify-center items-center gap-6 pt-3 w-full h-vh-minus-100px'}>
                    <div className={'flex justify-center items-center'}>
                        <h1 className={'text-4xl font-bold text-center'}>Aplicación para Gestión de Impuesto sobre la Renta(ISR)</h1>
                    </div>
                    <Link href={'/dashboard'}>
                        <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-4 px-6 rounded-full ">
                            Empezar
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
