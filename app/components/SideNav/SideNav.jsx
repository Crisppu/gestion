'use client'
import Link from 'next/link';
import NavLinks from './NavLinks';
import { PowerIcon ,ChevronDoubleRightIcon} from '@heroicons/react/24/outline';
import { selectArrowSideNav, setArrowSideNav } from '@/redux/features/arrowSideNavSlice';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';

export default function SideNav () {
    const arrowState = useSelector(selectArrowSideNav);
    const dispatch = useDispatch();
    return (
        <div className={`flex items-center w-full transition-all duration-300 ${arrowState ? 'md:w-[90px]' : 'md:w-72'}`}>
            <div className="flex flex-grow h-full flex-col px-3 py-4 md:px-2 bg-gray-300 dark:bg-slate-600 ">
                <div className='mb-2  rounded-md bg-green-400  flex justify-center items-center h-32'>
                    <Link  href="/">
                        <div className={` flex flex-col justify-center items-center leading-none text-white  `}>
                            <Image src={'/logoSantaAna.png'} priority width={150} height={100}  alt='logo-ingenio'  className={`${arrowState ? 'md:w-14 ':'w-36'}`}/>
                            <p className={`text-base md:text-2xl text-center hidden  ${arrowState ? 'md:hidden':' md:block'}`}>Santa Ana</p>
                        </div>
                    </Link>
                </div>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                    <NavLinks useSelectorArrow={arrowState}></NavLinks>
                    <div className="hidden h-auto w-full grow rounded-md bg-gray-100 dark:bg-black  md:block"></div>
                    <form>
                        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100  p-3 text-sm font-medium text-gray-600 dark:bg-black hover:bg-slate-400  md:flex-none md:justify-start md:p-2 md:px-3">
                            <PowerIcon className="w-6 " />
                            <div className={`hidden ${arrowState ? 'md:hidden':'md:block '}`}>Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
            <ChevronDoubleRightIcon className='w-6 h-6 cursor-pointer hidden md:block text-slate-700' onClick={()=>dispatch(setArrowSideNav())}></ChevronDoubleRightIcon>
        </div>
    );
}
