import SideNav from "../components/SideNav/SideNav";



export default function Layout() {


    return (
        <div className='flex h-screen flex-col md:flex-row md:overflow-hidden dark:bg-black'>
            <div className='w-full flex-none md:w-64'>
                <SideNav></SideNav>
            </div>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-2'>
                {children}

            </div>
       </div>

    )
}