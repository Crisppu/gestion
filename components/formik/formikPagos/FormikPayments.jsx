'use client'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
//import { selectDarkMode } from '@/redux/features/darkModeSlice';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import {XMarkIcon} from '@heroicons/react/24/outline'; //estos son iconos atraidos desde Tailwind


const loginSchema = Yup.object().shape(
    //shape: nos va permitir especificar la estructura de ese objeto
    {
        fechapago: Yup.date()
        .required('El campo es obligatorio'),

        salariobase: Yup.number()
        .required('campo es obligatorio')
        .positive('El salario base debe ser positivo'),


        horasextras: Yup.number()
        .required('campo es obligatorio')
        .positive('Las horas extras deben ser positivas'),


        totalhorasextras: Yup.number()
        .required('campo es obligatorio')
        .positive('El total de horas extras debe ser positivo'),


        descuentos: Yup.number()
        .required('campo es obligatorio')
        .min(0, 'Los descuentos no pueden ser negativos'),


        salarioneto: Yup.number()
        .required('campo es obligatorio')
        .positive('El salario neto debe ser positivo'),

    }
)


export default function FormikPayments({ toggleForm }) {
    const [error, setError] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);

    //const modeSelector = useSelector(selectDarkMode);
    const route = useRouter();
    const initialCredentials = {
        fechapago:'',
        salariobase:'',
        horasextras:'',
        totalhorasextras:'',
        descuentos:'',
        salarioneto:'',
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center min-h-screen   z-50`}>
            <div className={'flex justify-center items-center bg-gray-200 dark:bg-slate-600 p-2 rounded-lg transition-colors duration-500 z-50'}>
                <div className={'flex flex-col bg-white w-[450px] dark:bg-black  p-6 rounded-md transition-colors duration-500'}>
                    <div className='flex justify-end relative'>
                        <Button color='danger' variant="bordered" isIconOnly className=' h-4 text-base text-center '
                            onClick={toggleForm}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}>
                            <XMarkIcon className='w-5'></XMarkIcon>
                        </Button>
                        {showTooltip && (
                            <div className="absolute right-0 transform -translate-y-full mb-2 text-red-500 text-sm rounded">
                                cerrar
                            </div>
                        )}
                    </div>
                    {/* <div className='flex justify-center'><Link href={'/'}><img src='/logoSantaAna.png' alt='logo Santa Ana' width={60} height={60}></img></Link></div> */}
                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Crear un nuevo pago</div>
                    {/* <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-white">Log in to your account</div> */}
                    {error && (<p className='bg-red-500'>{error}</p>)}
                    <Formik
                        /* Initial values that the form will take */
                        initialValues = {initialCredentials}
                        /** Yup validations schema */
                        validationSchema={loginSchema}
                        /*onSubmit Event */
                        onSubmit = {async (values,actions) =>
                            {
                                alert(JSON.stringify(values))
                                // const response = await signIn('credentials',{
                                //     email:values.email,
                                //     password:values.password,
                                //     redirect:false
                                // });
                                // if(response.error){
                                //     setError(response.error)
                                // }else{
                                //     actions.resetForm();
                                //     route.push('/dashboard');
                                //     route.refresh();
                                // }
                                // actions.setSubmitting(false);
                            }
                        }
                    >
                        {({ errors, touched, isSubmitting, handleSubmit, isValid, dirty}) =>
                            (
                                <Form className={'flex flex-col dark:text-white text-black h-[500px] overflow-y-auto'} onSubmit={handleSubmit}>
                                    <laber htmlFor="fechapago" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Fecha de pago</laber>
                                    <Field
                                        autoComplete="fechapago"
                                        id="fechapago"
                                        name="fechapago"
                                        placeholder="fechapago"
                                        type='date'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.fechapago && touched.fechapago && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='fechapago'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="salariobase" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Salario base</laber>
                                    <Field
                                        autoComplete="salariobase"
                                        id="salariobase"
                                        name="salariobase"
                                        placeholder="salariobase"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.salariobase && touched.salariobase && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='salariobase'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="horasextras" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Horas extras</laber>
                                    <Field
                                        autoComplete="horasextras"
                                        id="horasextras"
                                        name="horasextras"
                                        placeholder="horasextras"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.horasextras && touched.horasextras && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='horasextras'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="totalhorasextras" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Total horas extras</laber>
                                    <Field
                                        autoComplete="totalhorasextras"
                                        id="totalhorasextras"
                                        name="totalhorasextras"
                                        placeholder="totalhorasextras"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.totalhorasextras && touched.totalhorasextras && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='totalhorasextras'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="descuentos" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Descuentos</laber>
                                    <Field
                                        autoComplete="descuentos"
                                        id="descuentos"
                                        name="descuentos"
                                        placeholder="descuentos"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.descuentos && touched.descuentos && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='descuentos'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="salarioneto" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Salario neto</laber>
                                    <Field
                                        autoComplete="salarioneto"
                                        id="salarioneto"
                                        name="salarioneto"
                                        placeholder="salarioneto"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.salarioneto && touched.salarioneto && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='salarioneto'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex flex-col pt-2 gap-2'>
                                        <Button isDisabled={!isValid || !dirty} type="submit" color="primary">Guardar</Button>
                                    </div>
                                    {isSubmitting ? (<p >Guardando...</p>) : null}
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
            <div className="fixed inset-0 backdrop-blur-[1px]  z-40"></div>
        </div>
    )
}
