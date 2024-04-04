'use client'

import { selectDarkMode } from "@/redux/features/darkModeSlice";
import { useSelector } from "react-redux";

export default function ClientComponent({children}) {
    const modeSelector = useSelector(selectDarkMode);
    return (
        <main className={`flex min-h-screen  flex-col  dark:bg-black transition-colors duration-500 ${modeSelector}`}>
            <div className="flex justify-end my-2 h-20 pr-2 shrink-0 items-center rounded-lg bg-green-400  md:h-[100px] ">
                {children}
            </div>
            <div className={'flex justify-evenly items-center pt-3 '}>
                {/* <FormLogin></FormLogin> */}
                <div className="flex items-center justify-center md:w-3/5 md:px-28 ">
                    {/* *Add Hero Images Here* */}
                    {/* <Image className='hidden md:block' src='/hero-desktop.png' width={1000} height={760} alt='screenShots dashboard' priority="high"></Image>
                    <Image className='block md:hidden' src='/hero-mobile.png' width={560} height={620} alt='screenShots dashboard'></Image> */}
                </div>
            </div>
        </main>
    )
}
