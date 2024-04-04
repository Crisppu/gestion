import ClientComponent from "@/components/home/clientComponent";
import ServerComponent from "@/components/home/serverComponent";


export default function Home() {

// Pagina
    return (
        <ClientComponent>
            <ServerComponent></ServerComponent>
        </ClientComponent>
    );
}
