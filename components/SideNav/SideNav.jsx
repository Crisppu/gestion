'use client'
import Link from 'next/link';
import NavLinks from './NavLinks';
import { ChevronDoubleRightIcon} from '@heroicons/react/24/outline';
import { setArrowSideNav } from '@/redux/features/arrowSideNavSlice';
import { useDispatch} from 'react-redux';

export default function SideNav () {
    const dispatch = useDispatch();
    return (
        <div className={`flex items-center w-full transition-all duration-300 ${arrowState ? 'md:w-[90px]' : 'md:w-72'}`}>
            <div className="flex flex-grow h-full flex-col px-3 py-4 md:px-2 bg-gray-300 dark:bg-slate-600 ">
                <div className='mb-2  rounded-md bg-green-400  flex justify-center items-center h-32'>
                    <Link  href="#">
                        <div className={` flex flex-col justify-center items-center leading-none text-white  `}>
                            <img src={'/logoSantaAna.png'} alt='logoSantaAna' width={60} height={60}></img>
                            <p className={`text-base md:text-2xl text-center hidden  ${arrowState ? 'md:hidden':' md:block'}`}>Santa Ana</p>
                        </div>
                    </Link>
                </div>
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                    <NavLinks></NavLinks>
                    <div className="hidden h-auto w-full grow rounded-md bg-gray-100 dark:bg-black  md:block"></div>
                </div>
            </div>
            <ChevronDoubleRightIcon className='w-6 h-6 cursor-pointer hidden md:block text-slate-700' onClick={()=>dispatch(setArrowSideNav())}></ChevronDoubleRightIcon>
        </div>
    );
}
