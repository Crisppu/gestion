'use client'
import { selectDarkMode} from "@/redux/features/darkModeSlice";
import Image from "next/image";
import { useSelector } from "react-redux";
import ButtonDarkMode from "../components/ui/buttonDarkMode";
import FormLogin from "../components/ui/Form-Login";
import NavBar from "../components/NavBar/NavBar";


export default function Home() {

    const modeSelector = useSelector(selectDarkMode);

// Pagina
    return (
        <main className={`flex min-h-screen ${modeSelector} flex-col  dark:bg-black transition-colors duration-500`}>
            <div className="flex justify-end my-2 h-20 pr-2 shrink-0 items-center rounded-lg bg-green-400  md:h-[100px] ">
                 <NavBar></NavBar>
            </div>
            <div className={'flex justify-evenly items-center pt-3 '}>
                <FormLogin></FormLogin>
                <div className="flex items-center justify-center md:w-3/5 md:px-28 ">
                    {/* *Add Hero Images Here* */}
                    <Image className='hidden md:block' src='/hero-desktop.png' width={1000} height={760} alt='screenShots dashboard'></Image>
                    <Image className='block md:hidden' src='/hero-mobile.png' width={560} height={620} alt='screenShots dashboard'></Image>
                </div>
            </div>
        </main>
    );
}
