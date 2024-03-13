'use client'
import { selectDarkMode} from "@/redux/features/darkModeSlice";
import { useSelector } from "react-redux";
import SideNav from "../components/SideNav/SideNav";



export default function Layout({ children}) {

    const modeSelector = useSelector(selectDarkMode);
    console.log(modeSelector)
    return (
        <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden ${modeSelector} dark:bg-black`}>
            <div className='w-full flex-none md:w-64'>
                <SideNav></SideNav>
            </div>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-2'>
                {children}

            </div>
       </div>

    )
}