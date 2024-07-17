//en mi caso yo quiero registrarme de manera manual osea pasarle el email y password
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { fetchUserByEmail } from "@/services/UsuarioService.js/UsuarioApiService";


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
                        console.log(response)
                        if(!response.data) throw new Error('No user found');
                        const matchPassword = await bcrypt.compare(credentials.password,  response.data.contrasenia);
                        if(!matchPassword)  throw new Error('Wrong password')
                        return{
                            id:response.data.id,
                            email:response.data.correo
                        }

                    }catch(error){
                        throw new Error(error)
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
