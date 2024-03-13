// 'use client'
import Link from 'next/link';
import NavLinks from './NavLinks';
import LogoSantaAna from '../LogoSantaAna/LogoSantaAna';
import { PowerIcon } from '@heroicons/react/24/outline';



export default function SideNav () {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 dark:bg-slate-600 ">
            <Link className="mb-2 flex h-20 items-end justify-center rounded-md bg-green-400 p-4 md:h-40" href="/">
                <div className="w-32 text-white md:w-40 ">
                    <LogoSantaAna />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-black  md:block"></div>
                <form>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 hover:bg-sky-100 p-3 text-sm font-medium text-gray-600 hover:text-green-600 dark:bg-black hover:dark:bg-slate-400  md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6 " />
                        <div className="hidden md:block ">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
