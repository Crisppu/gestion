
import NavBar from "@/components/NavBar/NavBar";
import ClientComponentDashboard from "@/components/dashboard/clientComponentDashboard";
//import ServerComponentDashboard from "@/components/dashboard/serverComponentDashboard";



export default function Layout({ children}) {

    return (
        <>
            <ClientComponentDashboard NavBar={<NavBar/>}>
                {children}
            </ClientComponentDashboard>
        </>
    )
}
