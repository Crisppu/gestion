'use client'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '@/redux/features/darkModeSlice';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const loginSchema = Yup.object().shape(
    //shape: nos va permitir especificar la estructura de ese objeto
    {
        email: Yup.string()
        .email('Invalid email format')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'el correo no es valido')
        .required('email is required'),

        password: Yup.string()
        .required('Password is required')
    }
)


export default function Page() {
    const [error, setError] = useState(null);
    const modeSelector = useSelector(selectDarkMode);
    const route = useRouter();
    const initialCredentials = {
        email:'',
        password:''
    }
    

    return (
        <div className={`flex justify-center items-center min-h-screen ${modeSelector} dark:bg-black`}>
            <div className={'flex justify-center items-center bg-gray-200 dark:bg-slate-600 p-4 rounded-lg transition-colors duration-500'}>
                <div className={'flex flex-col bg-white w-80 dark:bg-black p-8 rounded-md transition-colors duration-500'}>
                    <div className='flex justify-center'><Link href={'/'}><img src='/logoSantaAna.png' alt='logo Santa Ana' width={60} height={60}></img></Link></div>
                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Welcome back to <span className="text-green-400">App</span></div>
                    <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-white">Log in to your account</div>
                    {error && (<p className='bg-red-500'>{error}</p>)}
                    <Formik
                        /* Initial values that the form will take */
                        initialValues = {initialCredentials}
                        /** Yup validations schema */
                        validationSchema={loginSchema}
                        /*onSubmit Event */
                        onSubmit = {async (values,actions) =>
                            {
                                const response = await signIn('credentials',{
                                    email:values.email,
                                    password:values.password,
                                    redirect:false
                                })
                                if(response.error){
                                    // alert(JSON.stringify(response.error, null, 2));
                                    setError(response.error)
                                }else{
                                    actions.resetForm();
                                    route.push('/dashboard');
                                    route.refresh();
                                }
                                actions.setSubmitting(false);
                            }
                        }
                    >
                        {({ errors, touched, isSubmitting, handleSubmit, isValid, dirty}) =>
                            (
                                <Form className={'flex flex-col '} onSubmit={handleSubmit}>
                                    <label htmlFor="email" className="block text-gray-500 cursor-text text-base font-semibold mb-2">E-mail</label>
                                    <Field
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        type='email'
                                        className="rounded border-2 border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.email && touched.email && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='email'></ErrorMessage>
                                        </div>
                                    )}
                                    <label  htmlFor="password" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Password</label>
                                    <Field
                                        autoComplete="current-password"
                                        id="password"
                                        name="password"
                                        placeholder="password"
                                        type="password"
                                        className="rounded border-2 border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.password && touched.password && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='password'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex flex-col pt-2 gap-2'>
                                        <a className="text-sm text-green-400" href="#">Forgot your password?</a>
                                        <button disabled={!isValid || !dirty} type="submit" className={`${!isValid || !dirty ? '':'hover:bg-green-300'} bg-green-400  transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal`}>Login</button>
                                    </div>
                                    {isSubmitting ? (<p className={'text-black dark:text-white'}>login your credential...</p>) : null}
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}
