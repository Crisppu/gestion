import ButtonDarkMode from "@/components/ui/buttonDarkMode";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function NavBar() {

    const session = await getServerSession(authOptions)

    return (
        <div className={`flex justify-end items-center h-full pr-2 shrink-0`} >
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
                            <li><Link href={'/auth/logout'}>Logout</Link></li>
                        </>
                    )

                    }
                </ul>
                <ButtonDarkMode></ButtonDarkMode>
            </div>
        </div>
    )
}
