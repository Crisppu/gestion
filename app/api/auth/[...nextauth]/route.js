//en mi caso yo quiero registrarme de manera manual osea pasarle el email y password
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUniqueEmail } from "@/app/libs/data";
import bcrypt from 'bcrypt'


export const authOptions = {
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
