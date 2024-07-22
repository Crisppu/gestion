import NavBar from "@/components/NavBar/NavBar";
import SideNav from "@/components/SideNav/SideNav";

export default function Layout({ children}) {

    return (
        <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden  dark:bg-black`}>
            <SideNav></SideNav>
            <div className='flex-grow md:overflow-y-auto md:p-2'>
                <div className="flex justify-end my-2 h-20 pr-2 shrink-0 items-center rounded-lg bg-green-400  md:h-[90px] ">
                    <NavBar></NavBar>
                </div>
                {children}
            </div>
        </div>
    )
}
