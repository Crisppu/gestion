//en mi caso yo quiero registrarme de manera manual osea pasarle el email y password
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { findUniqueEmail } from "@/app/libs/data";
import bcrypt from 'bcrypt'


const authOptions = {
    providers:[
        CredentialsProvider(
            {
                name:'Credentials',
                credentials:{
                    email:{label:'email', type:'text', placeholder:'jsChris'},
                    password:{label:'Password',type:'password',placeholder:'*****'}
                },
                async authorize(credentials, req){
                    const response = await findUniqueEmail(credentials.email);

                    if(!response.rows.length) throw new Error('No user found');
                    const userFound = response.rows.find(function(row) {
                        return row;
                    });

                    const matchPassword = await bcrypt.compare(credentials.password,  userFound.password);

                    if(!matchPassword)  throw new Error('Wrong password')
                    return{
                        id:userFound.id,
                        name:userFound.name,
                        email:userFound.email
                    }

                }
            }
        )
    ],
    pages:{
        signIn:'/auth/login'
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
/*
ese ejemplo me lo genera pos pasos automaticamente
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // ...add more providers here
    ],
});

// export default NextAuth(authOptions)
export {handler as GET, handler as POST}

//esto me permite conectarme a los servicios de Google
*/