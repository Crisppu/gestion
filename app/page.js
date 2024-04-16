import ServerComponent from "@/components/home/serverComponent";
import { redirect} from "next/navigation";
import { getSessionNextAuth } from "@/app/api/auth/[...nextauth]/getSessionAsync";
import ClientComponent from "@/components/home/clientComponent";

export default async function Home() {
    const session = await getSessionNextAuth();
    if(session?.user){
        redirect('/dashboard')
    }

    return (
        <ClientComponent>
            <ServerComponent></ServerComponent>
        </ClientComponent>
    );
}
