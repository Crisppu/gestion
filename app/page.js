import { redirect} from "next/navigation";
import { getSessionNextAuth } from "@/app/api/auth/[...nextauth]/getSessionAsync";
import NavBar from "@/components/NavBar/NavBar";
import Link from "next/link";

export default async function Home() {
    const session = await getSessionNextAuth();
    if(session?.user){
        redirect('/dashboard')
    }

    return (
        <div className={`flex min-h-full flex-col  dark:bg-black transition-colors duration-500`}>
            <div className={`bg-gradient-over-imgCaneField h-screen bg-cover bg-center `}>
                <div className="flex justify-between h-20 pr-2 shrink-0 items-center  bg-green-400 md:h-[100px]">
                    <div className="pl-2"><img src={'/logoSantaAna.png'} alt='logoSantaAna' width={60} height={60}></img></div>
                    <NavBar></NavBar>
                </div>
                <div className={'flex flex-col justify-center items-center gap-6 pt-3 w-full h-vh-minus-100px'}>
                    <div className={'flex justify-center items-center'}>
                        <h1 className={'text-4xl font-bold text-center'}>Aplicación para Gestión de Impuesto sobre la Renta(ISR)</h1>
                    </div>
                    <Link href={'/dashboard'}>
                        <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-4 px-6 rounded-full ">
                            Empezar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
