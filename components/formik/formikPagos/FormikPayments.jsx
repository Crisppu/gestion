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
import { CalculoHorasExtrasEnDia, CalculoMensualISR, Deducciones } from './calculoPago/calculosImpuestos';


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

        jornada: Yup.string()
        .oneOf(['diurna', 'nocturna','mixto','feriado','no'], 'Seleccione una Jornada')
        .required('Campo es obligatorio'),


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
    const [descuento, setDescuento] = useState();
    const [totalhorasExtras, setTotalhorasExtras] = useState();
    const [isr, setISR] = useState();
    //const modeSelector = useSelector(selectDarkMode);
    const route = useRouter();
    const initialCredentials = {
        fechapago:'',
        salariobase:'',
        horasextras:'',
        jornada:'',
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
                                // alert(JSON.stringify(values))
                                const r2 = Deducciones(values.salariobase);

                                // const r1 = CalculoMensualISR(values.salariobase);
                                // const r2 = Deducciones(values.salariobase, r1);
                            
                                alert(JSON.stringify(r2))

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
                        {({ errors, touched, isSubmitting, handleSubmit, isValid, dirty, values}) =>
                            (
                                <Form className={'flex flex-col dark:text-white text-black h-[500px] overflow-y-auto'} onSubmit={handleSubmit}>
                                    <laber htmlFor="fechapago" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Fecha de pago</laber>
                                    <Field
                                        autoComplete="fechapago"
                                        id="fechapago"
                                        name="fechapago"
                                        placeholder="fechapago"
                                        type='date'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-10 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.fechapago && touched.fechapago && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='fechapago'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="salariobase" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Salario base</laber>
                                    <Field
                                        onBlur={setDescuento(()=>Deducciones(values.salariobase))}
                                        autoComplete="salariobase"
                                        id="salariobase"
                                        name="salariobase"
                                        placeholder="salariobase"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-10 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.salariobase && touched.salariobase && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='salariobase'></ErrorMessage>
                                        </div>
                                    )}
                                    <laber htmlFor="horasextras" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Horas extras</laber>
                                    <div className='flex  gap-2'>
                                        <div className='flex-1'>
                                            <Field
                                               onBlur={setTotalhorasExtras(()=>CalculoHorasExtrasEnDia((values.salariobase - descuento),(values.jornada)))}
                                                autoComplete="horasextras"
                                                id="horasextras"
                                                name="horasextras"
                                                placeholder="0"
                                                type='number'
                                                className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-10 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            />
                                            {errors.horasextras && touched.horasextras && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='horasextras'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex-1'>
                                            <Field id='jornada' name='jornada' component='select' placeholder="Seleccione Jornada"  className='rounded border-2 h-10 border-gray-200 text-black dark:text-white focus:border-green-400 focus:ring-green-400  outline-0'>
                                            <option value="" disabled selected>Seleccione Jornada</option>
                                                <option value='diurna'>Diurna</option>
                                                <option value='nocturna'>Nocturna</option>
                                                <option value='mixto'>Mixto</option>
                                                <option value='feriado'>Dia Feriado</option>
                                                <option value='no'>n/o</option>
                                            </Field>
                                            {errors.jornada && touched.jornada && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='jornada'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                        
                                    </div>
                                    <laber htmlFor="totalhorasextras" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Total horas extras</laber>
                                    <Field
                                        value={totalhorasExtras ? totalhorasExtras * values.horasextras : 0}
                                        autoComplete="totalhorasextras"
                                        id="totalhorasextras"
                                        name="totalhorasextras"
                                        placeholder="0"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-10 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {/* {errors.totalhorasextras && touched.totalhorasextras && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='totalhorasextras'></ErrorMessage>
                                        </div>
                                    )} */}
                                    
                                    <laber htmlFor="descuentos" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Descuentos (IGSS,INTECAP,IRTRA)</laber>
                                    <Field
                                       value={descuento?descuento:0}
                                        autoComplete="descuentos"
                                        id="descuentos"
                                        name="descuentos"
                                        //placeholder="descuentos"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-10 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {/* {errors.descuentos && touched.descuentos && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='descuentos'></ErrorMessage>
                                        </div>
                                    )} */}
                                    <laber htmlFor="salarioneto" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Salario neto</laber>
                                    <Field
                                        value ={descuento ? CalculoMensualISR(values.salariobase,descuento) : 0}
                                        autoComplete="salarioneto"
                                        id="salarioneto"
                                        name="salarioneto"
                                        placeholder="0"
                                        type='number'
                                        className="rounded border-2 border-gray-200 w-full leading-4  tracking-normal appearance-none block h-10 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {/* {errors.salarioneto && touched.salarioneto && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='salarioneto'></ErrorMessage>
                                        </div>
                                    )} */}
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
