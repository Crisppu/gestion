//en mi caso yo quiero registrarme de manera manual osea pasarle el email y password
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { fetchUserByEmail } from "@/servers/UsuariosServices.js/UsuarioApiService";


export const authOptions = {
    providers:[
        CredentialsProvider(
            {
                name:'Credentials',
                credentials:{
                    email:{label:'email', type:'text', placeholder:'example@email.com'},
                    password:{label:'Password',type:'password',placeholder:'*****'}
                },
                async authorize(credentials, req){
                    try{
                        const response = await fetchUserByEmail(credentials.email);
                        const matchPassword = await bcrypt.compare(credentials.password,  response.password);
                        if(!matchPassword)  throw new Error('Wrong password')
                        return{
                            id:response.id,
                            email:response.email
                        }

                    }catch(error){
                        throw new Error(error.message)
                    }

                }
            }
        )
    ],
    pages:{
        signIn:'/auth/login',
        signOut:'/auth/logout'
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
