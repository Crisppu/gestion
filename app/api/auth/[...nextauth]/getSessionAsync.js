'use server'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSessionNextAuth(){

    const response = await getServerSession(authOptions);
    return response;

}