import ButtonDarkMode from "@/components/ui/buttonDarkMode";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function NavBar() {

    const session = await getServerSession(authOptions);

    return (
        <div className={`flex justify-center items-center h-full pr-2 shrink-0`} >
            <div className="flex items-center space-x-4">
                <ul className="flex gap-x-4">
                    <li className="hover:overline decoration-4 font-medium"><Link href={'#'}>Home</Link></li>
                    { !session?.user ?
                        (
                            <>
                                <li className="hover:overline decoration-4 font-medium"><Link href={'/auth/register'}>Register</Link></li>
                                <li className="hover:overline decoration-4 font-medium"><Link href={'/auth/login'}>Login</Link></li>
                            </>
                        ):
                        (
                            <>
                                <li className="hover:overline decoration-4 font-medium"><Link href={'/dashboard'}>Dashboard</Link></li>
                                <li className="hover:overline decoration-4 font-medium"><Link href={'/auth/logout'}>Logout</Link></li>
                                <li><img src="/customers/amy-burns.png" alt="Avatar" className="w-10 h-10 rounded-full object-cover"/></li>

                            </>
                        )

                    }
                </ul>
                <ButtonDarkMode></ButtonDarkMode>
            </div>
        </div>
    )
}
