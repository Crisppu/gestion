
// 'use client'
// import { useSelector } from "react-redux";
// import { selectDarkMode } from "@/redux/features/darkModeSlice";
// import {signIn,useSession,signOut} from 'next-auth/react';
import ButtonDarkMode from "@/components/ui/buttonDarkMode";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function NavBar() {
    // const modeSelector = useSelector(selectDarkMode);
    // const {data:session}= useSession();
    // console.log(session.user.image)
    const session = await getServerSession(authOptions)
    
    return (
        <div className={`flex justify-end items-center h-full pr-2 shrink-0  bg-green-400 `}>
            <div className="flex items-center space-x-1">
                <ul className="flex gap-x-2">
                    { !session?.user ?
                    (
                        <>
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/auth/register'}>Register</Link></li>
                            <li><Link href={'/auth/login'}>Login</Link></li>
                        </>
                    ):
                    (
                        <>
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/dashboard'}>Dashboard</Link></li>
                            <li><Link href={'/api/auth/signout'}>Logout</Link></li>
                        </>
                    )

                    }
                </ul>
                <ButtonDarkMode></ButtonDarkMode>
            </div>
        </div>
    )
}
