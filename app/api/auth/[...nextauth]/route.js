//en mi caso yo quiero registrarme de manera manual osea pasarle el email y password
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers:[
        CredentialsProvider({
                name:'Credentials',
                credentials:{
                    email:{label:'email', type:'text', placeholder:'jsChris'},
                    password:{label:'Password',type:'password',placeholder:'*****'}
                },
                authorize(credentials, req){
                    return null

                }
            }
        )
    ]
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
/*
ese ejemplo me lo genera pos pasos automaticamente
// import NextAuth from "next-auth"
// import GoogleProvider from 'next-auth/providers/google';

// const handler = NextAuth({
//     // Configure one or more authentication providers
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       }),
//       // ...add more providers here
//     ],
// });

// // export default NextAuth(authOptions)
// export {handler as GET, handler as POST}

// //esto me permite conectarme a los servicios de Google
*/