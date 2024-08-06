//en mi caso yo quiero registrarme de manera manual osea pasarle el email y password
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { fetchUserByEmail } from "@/services/UsuarioService/UsuarioApiService";


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
                        if(!response.data) throw new Error('No user found');
                        const matchPassword = await bcrypt.compare(credentials.password,  response.data.contrasenia);
                        if(!matchPassword)  throw new Error('Wrong password')
                        return{
                            name:response.data.id,
                            email:response.data.correo,
                            image:null //pendiente de agregar imagen.
                        }

                    }catch(error){
                        throw new Error(error ? error : error.response ? error.response.data.message : error.menssage)
                    }

                }
            }
        )
    ],
    pages:{
        signIn:'/auth/login',
        signOut:'/auth/logout'
    },
    //configuracion de expiracion de sesion, esta coonfigurado a 24 horas despues se cierra la sesion.
    /**ejemplo para verificar la fecha de expiracion
     * import { useSession } from 'next-auth/react';
     * const session = useSession();
     *console.log(new Date(session.data.expires).toLocaleString())
    */
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 1 day in seconds
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.expires = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day in seconds
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.expires = new Date(token.expires * 1000).toISOString();
            return session;
        },
    },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
