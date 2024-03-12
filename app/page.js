'use client'
import { selectDarkMode} from "@/redux/features/darkModeSlice";
import Image from "next/image";
import { useSelector } from "react-redux";
import ButtonDarkMode from "./ui/buttonDarkMode";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from 'next/navigation'


const loginSchema = Yup.object().shape(
      //shape: nos va permitir especificar la estructura de ese objeto
    {
        email: Yup.string()
        .email('Invalid email format')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'el correo no es valido')
        .required('email is required'),

        password: Yup.string()
        .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is required')
    }
)
export default function Home() {

    const modeSelector = useSelector(selectDarkMode);
    const [usuario, setUsuario] = useState({email:'perroMon@gmail.com',password:'1234'});
    const router = useRouter()

    const initialCredentials = {
        email:'',
        password:''
    }
    const valida = (values) =>{
        console.log(values)
        if(usuario.email === values.email && usuario.password === values.password){
            router.push('/dashboard')
        }
    }

// Pagina
    return (
        <main className={`flex min-h-screen ${modeSelector} flex-col  dark:bg-black transition-colors duration-500`}>
            <div className="flex justify-end my-2 h-20 pr-2 shrink-0 items-center rounded-lg bg-green-400  md:h-[100px] ">
                <div className="flex ">
                    <div className="flex justify-center items-center p-1">
                        <span className="text-xl">Enrique</span>
                    </div>
                    <ButtonDarkMode mode={modeSelector}></ButtonDarkMode>
                </div>
            </div>
            <div className={'flex justify-evenly items-center pt-3 '}>
                <div className={'flex justify-center items-center bg-gray-200 dark:bg-slate-600 p-6 rounded-lg transition-colors duration-500'}>
                    <div className={'flex flex-col bg-white dark:bg-black p-8 rounded-md transition-colors duration-500'}>
                        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Welcome back to <span className="text-green-400">App</span></div>
                        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-white">Log in to your account</div>

                        <Formik
                            /* Initial values that the form will take */
                            initialValues = {initialCredentials}
                            /** Yup validations schema */
                            validationSchema={loginSchema}
                            /*onSubmit Event */
                            onSubmit = {async (values) =>
                                {
                                    await new Promise((r) =>{
                                        console.log(r)
                                        return setTimeout(r, 2000)
                                    });
                                    valida(values)
                                    // alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                    //resetForm(); //para limpiar el formulario

                                    // navigateHistory('/profile');
                                }
                            }
                        >
                            {({ errors, touched, isSubmitting }) =>

                            (
                                <Form className={'flex flex-col '}>
                                    <label htmlFor="email" className="block text-gray-600 cursor-text text-base leading-[140%] font-normal mb-2">email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        type='email'
                                        className="rounded border border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.email && touched.email && (
                                        <div className='errors text-red-700'>
                                            <ErrorMessage name='email'></ErrorMessage>
                                        </div>
                                    )}
                                    <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        type="password"
                                        className="rounded border border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.password && touched.password && (
                                        <div className='errors text-red-700'>
                                            <ErrorMessage name='password'></ErrorMessage>
                                        </div>
                                    )}
                                    <div>
                                        <a className="text-sm text-green-400" href="#">Forgot your password?</a>
                                    </div>
                                    <button type="submit" className="bg-green-400 hover:bg-green-300 transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Login</button>
                                    {isSubmitting ? (<p>login your credential</p>) : null}
                                </Form>
                            )}

                        </Formik>
                    </div>
                </div>
                <div className="flex items-center justify-center md:w-3/5 md:px-28 ">
                    {/* *Add Hero Images Here* */}
                    <Image className='hidden md:block' src='/hero-desktop.png' width={1000} height={760} alt='screenShots dashboard'></Image>
                    <Image className='block md:hidden' src='/hero-mobile.png' width={560} height={620} alt='screenShots dashboard'></Image>
                </div>
            </div>
        </main>
    );
}

/**
 * <div className={`mt-4 flex grow justify-evenly gap-4`}>
                <div className={`flex justify-center items-center px-16 gap-6 rounded-lg bg-gray-100   dark:bg-slate-800`}>
                    <div className={`max-w-md relative flex flex-col p-4 rounded-md text-black bg-white dark:bg-black`}>
                        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Welcome back to <span className="text-green-400">App</span></div>
                        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-white">Log in to your account</div>
                        <form className="flex flex-col gap-3">
                            <div className="block relative">
                                <label htmlFor="email" className="block text-gray-600 cursor-text text-base leading-[140%] font-normal mb-2">Email</label>
                                <input type="text" id="email" className="rounded border border-gray-200  text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:border-green-400 focus:ring-green-400  outline-0"/>
                            </div>
                            <div className="block relative">
                                <label htmlFor="password" >Password</label>
                                <input type="text" id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:border-green-400 focus:ring-green-400  outline-0"/>
                            </div>
                            <div>
                                <a className="text-sm text-green-400" href="#">Forgot your password?</a>
                            </div>
                            <button type="submit" className="bg-green-400 hover:bg-green-300 transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>
                        </form>
                        <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a className="text-sm text-green-400" href="#">Sign up for free!</a></div>
                    </div>
                </div>
                <div className="flex items-center justify-center md:w-3/5 md:px-28 ">
                    *Add Hero Images Here*
                    <Image className='hidden md:block' src='/hero-desktop.png' width={1000} height={760} alt='screenShots dashboard'></Image>
                    <Image className='block md:hidden' src='/hero-mobile.png' width={560} height={620} alt='screenShots dashboard'></Image>
                </div>
            </div>
 */