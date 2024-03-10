'use client'
import { selectDarkMode} from "@/redux/features/darkModeSlice";
import Image from "next/image";
import { useSelector } from "react-redux";
import ButtonDarkMode from "./ui/buttonDarkMode";


export default function Home() {

  const modeSelector = useSelector(selectDarkMode);

    return (
        <main className={`flex min-h-screen ${modeSelector} flex-col  dark:bg-black transition-colors duration-500`}>
            <div className="flex justify-end my-2 h-20 pr-2 shrink-0 items-center rounded-lg bg-green-400  md:h-[100px] ">
                <div className="flex ">
                    <div className="flex justify-center items-center p-1">
                        <span className="text-xl">Enrique</span>
                    </div>
                    <ButtonDarkMode mode={modeSelector}></ButtonDarkMode>
                </div>
            </div>
            <div className={`mt-4 flex grow justify-evenly gap-4`}>
                <div className={`flex justify-center items-center px-16 gap-6 rounded-lg bg-gray-100   dark:bg-slate-800`}>
                    <div className={`max-w-md relative flex flex-col p-4 rounded-md text-black bg-white dark:bg-black`}>
                        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Welcome back to <span className="text-green-400">App</span></div>
                        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-white">Log in to your account</div>
                        <form className="flex flex-col gap-3">
                            <div className="block relative">
                                <label htmlFor="email" className="block text-gray-600 cursor-text text-base leading-[140%] font-normal mb-2">Email</label>
                                <input type="text" id="email" className="rounded border border-gray-200  text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:border-green-400 focus:ring-green-400  outline-0"/>
                            </div>
                            <div className="block relative">
                                <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                                <input type="text" id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:border-green-400 focus:ring-green-400  outline-0"/>
                            </div>
                            <div>
                                <a className="text-sm text-green-400" href="#">Forgot your password?</a>
                            </div>
                            <button type="submit" className="bg-green-400 hover:bg-green-300 transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>
                        </form>
                        <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a className="text-sm text-green-400" href="#">Sign up for free!</a></div>
                    </div>
                </div>
                <div className="flex items-center justify-center md:w-3/5 md:px-28 ">
                    {/* Add Hero Images Here */}
                    <Image className='hidden md:block' src='/hero-desktop.png' width={1000} height={760} alt='screenShots dashboard'></Image>
                    <Image className='block md:hidden' src='/hero-mobile.png' width={560} height={620} alt='screenShots dashboard'></Image>
                </div>
            </div>
        </main>
    );
}
