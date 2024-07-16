'use client'
import { findUniqueEmail, createUserBD } from '@/app/libs/data';
import SvgComponentEye from '@/components/ui/svgComponents/svgComponentEye';
import SvgComponentEyeSlash from '@/components/ui/svgComponents/svgComponentEyeSlash';
import { ROLES } from '@/modelsOrientacionObjeto/roles.enum';
import { selectDarkMode } from '@/redux/features/darkModeSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';

const registerSchema = Yup.object().shape(
  //shape: nos va permitir especificar la estructura de ese objeto
    {
        cui: Yup.string()
        .matches(/^\d{13}$/, 'El CUI es incorrecto')
        .required('El campo es obligatorio'),


        nit: Yup.string()
        .matches(/^\d{8}$/, 'El NIT es incorrecto')
        .required('El campo es obligatorio'),

        nombre: Yup.string()
        .matches(/^[A-Za-z]+$/, 'El nombre solo puede contener letras')
        .min(2,'nombre muy corto')
        .max(30,'nombre muy largo')
        .required('El campo es obligatorio'),

        apellido: Yup.string()
        .matches(/^[A-Za-z]+$/, 'El apellido solo puede contener letras')
        .min(2,'apellido muy corto')
        .max(30,'apellido muy largo')
        .required('El campo es obligatorio'),

        telefono: Yup.string()
        .matches(/^\d{8}$/, 'Formato incorrecto')
        .required('El campo es obligatorio'),

        direccion: Yup.string()
        .matches(/^[A-Za-z0-9\s]+$/, 'No se permiten caracteres especiales (@,/,*,%,&)')
        .min(5,'Dirección muy corta')
        .max(20,'Dirección muy larga')
        .required('El campo es obligatorio'),

        genero: Yup.string()
        .oneOf(['0', '1'], 'Seleccione su género')
        .required('El campo es obligatorio'),
        fecha_nacimiento: Yup.date()
        .required('La fecha de nacimiento es obligatoria'),
        estado_civil: Yup.string()
        .oneOf(['0', '1', '2', '3'], 'Seleccione su estado civil')
        .required('El campo es obligatorio'),
        profesion: Yup.string()
        .required('El campo es obligatorio'),
        posicion: Yup.string()
        .required('El campo es obligatorio'),
        fecha_contratacion: Yup.date()
        .required('El campo es obligatorio'),
        departamento: Yup.string()
        .required('El campo es obligatorio'),

        correo: Yup.string()
        .email('Invalid email format')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'El email es invalido')
        .required('El campo es obligatorio'),

        contrasenia: Yup.string()
        .min(6, 'Contraseña debe tener al menos 6 caracteres')
        .required('El campo es obligatorio'),
        confirmar_contrasenia: Yup.string().test('passwords-match', 'Las contraseñas no coinciden', function (value) {
            return value === this.resolve(Yup.ref('contrasenia'));
        }).required('El campo es obligatorio'),

        rol: Yup.string().oneOf([ROLES.USER, ROLES.ADMIN], 'Select a Rol'),
    }
)


export default function Page() {
    const modeSelector = useSelector(selectDarkMode);

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const initialRegister = {
        cui:'',
        nit:'',
        nombre:'',
        apellido:'',
        telefono:'',
        direccion:'',
        genero:'',
        fecha_nacimiento:'',
        estado_civil:'',
        profesion:'',

        posicion:'',
        fecha_contratacion:'',
        departamento:'',
        correo:'',
        contrasenia:'',
        confirmar_contrasenia:'',
        rol:ROLES.USER,

    }
    
    const borrar = (valores) => {
        console.log(valores)
    }

    return (
        <div className={`flex justify-center items-center min-h-screen ${modeSelector} dark:bg-black`}>
            <div className={'flex justify-center h-1/2  items-center bg-gray-200 dark:bg-slate-600 p-4 rounded-lg transition-colors duration-500'}>
                <div className={'flex flex-col bg-white w-96 dark:bg-black p-8 rounded-md transition-colors duration-500'}>
                <div className='flex justify-center'><Link href={'/'}><img src='/logoSantaAna.png' alt='logo Santa Ana' width={60} height={60}></img></Link></div>

                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Registro</div>
                    <Formik
                        /* Initial values that the form will take */
                        initialValues = {initialRegister}
                        /** Yup validations schema */
                        validationSchema={registerSchema}
                        /*onSubmit Event */
                        onSubmit = {async (values,actions) =>
                            {
                                await new Promise((r) =>{
                                        return setTimeout(r, 2000)
                                    }
                                );
                                alert(JSON.stringify(values));
                                borrar(values);

                                //nombre:value.name




                                /*const response = await findUniqueEmail(values.email);
                                if(response.rows.length > 0){
                                    alert('este correo ya esta registrado')
                                }else{
                                    await createUserBD(values);
                                    actions.resetForm(); //para limpiar el formulario
                                    router.push('/auth/login');

                                }*/

                                actions.setSubmitting(false);
                                // navigateHistory('/profile');
                            }
                        }
                    >
                        {({errors, touched, isSubmitting, handleSubmit, isValid, dirty}) =>
                        (
                            <Form className={'flex flex-col '} onSubmit={handleSubmit}>
                                <div className='flex gap-2'>
                                    <div className='flex flex-col w-3/5'>
                                        <label htmlFor='cui' className="block text-gray-500 cursor-text text-base font-semibold mb-2">CUI</label>
                                        <Field
                                            autoComplete="cui"
                                            id='cui'
                                            name='cui'
                                            placeholder='CUI'
                                            type='text'
                                            className="rounded border-2 border-gray-200 text-sm leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"></Field>
                                        {errors.cui && touched.cui && (
                                            <div className='text-red-700 text-sm'>
                                                <ErrorMessage name='cui'></ErrorMessage>
                                            </div>
                                        )}
                                    </div>

                                    <div className='flex flex-col w-2/5'>
                                        <label htmlFor="nit" className="block text-gray-500 cursor-text text-base font-semibold mb-2">NIT</label>
                                        <Field
                                            autoComplete="nit"
                                            id="nit"
                                            name="nit"
                                            placeholder="NIT"
                                            type='text'
                                            className="rounded border-2 border-gray-200 text-sm  leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                        />
                                        {errors.nit && touched.nit && (
                                            <div className='text-red-700 text-sm'>
                                                <ErrorMessage name='nit'></ErrorMessage>
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className='flex gap-2 '>
                                    <div>
                                        <label  htmlFor='name' className="block text-gray-500 cursor-text text-base font-semibold mb-2">Nombre</label>
                                        <Field
                                            autoComplete="name"
                                            id='name'
                                            name='nombre'
                                            placeholder='Nombre'
                                            type='text'
                                            className="rounded border-2 border-gray-200  text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                        ></Field>
                                        {errors.nombre && touched.nombre&& (
                                            <div className='text-red-700 text-sm'>
                                                <ErrorMessage name='nombre'></ErrorMessage>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label hrmlFrom="lastname" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Apellido</label>
                                        <Field
                                            autoComplete="lastname"
                                            id="lastname"
                                            name="apellido"
                                            placeholder="Apellido"
                                            type='text'
                                            className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                        />
                                        {errors.apellido && touched.apellido && (
                                            <div className='text-red-700 text-sm'>
                                                <ErrorMessage name='apellido'></ErrorMessage>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <label htmlFor="phone" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Numero de telefono</label>
                                <div className='flex gap-1 items-center'>
                                    <span className='text-black dark:text-white'>+502</span>
                                    <Field
                                        autoComplete="phone"
                                        id="phone"
                                        name="telefono"
                                        placeholder="xxxx-xxxx"
                                        type='text'
                                        className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.telefono && touched.telefono && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='telefono'></ErrorMessage>
                                        </div>
                                    )}
                                </div>

                                <label htmlFor="address" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Direccion</label>
                                <Field
                                    autoComplete="address"
                                    id="address"
                                    name="direccion"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.direccion && touched.direccion && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='direccion'></ErrorMessage>
                                    </div>
                                )}

                                <div>
                                    <span className="block text-gray-500 cursor-text text-base font-semibold mb-2">Genero</span>
                                    <div className="flex gap-3">

                                        <div className="flex items-center mb-2 gap-2">
                                            <Field
                                                id="gender-male"
                                                type="radio"
                                                value="1"
                                                name="genero"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="gender-male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>

                                            <Field
                                                id="gender-female"
                                                type="radio"
                                                value="0"
                                                name="genero"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="gender-female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>

                                            {errors.genero && touched.genero && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='genero'></ErrorMessage>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="birthday" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Fecha de Nacimiento</label>
                                <Field
                                    autoComplete="birthday"
                                    id="birthday"
                                    name="fecha_nacimiento"
                                    type='date'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.fecha_nacimiento && touched.fecha_nacimiento && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='fecha_nacimiento'></ErrorMessage>
                                    </div>
                                )}
                                <div>
                                    <span className="block text-gray-500 cursor-text text-base font-semibold mb-2">Estado Civil</span>
                                    <div className="flex gap-3">

                                        <div className="flex items-center mb-2 gap-1">
                                            <Field
                                                id="state-single"
                                                type="radio"
                                                value="0"
                                                name="estado_civil"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="gender-single" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Soltero</label>

                                            <Field
                                                id="state-married"
                                                type="radio"
                                                value="1"
                                                name="estado_civil"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="state-married" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Casado</label>
                                            <Field
                                                id="state-divorced"
                                                type="radio"
                                                value="2"
                                                name="estado_civil"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="state-divorced" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Divorciado</label>
                                            <Field
                                                id="state-Widowed"
                                                type="radio"
                                                value="3"
                                                name="estado_civil"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="state-Widowed" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Viudo</label>

                                        </div>
                                    </div>
                                    {errors.estado_civil && touched.estado_civil && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='estado_civil'></ErrorMessage>
                                        </div>
                                    )}

                                </div>


                                <label htmlFor="profession" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Profesion</label>
                                <Field
                                    autoComplete="profession"
                                    id="profession" name="profesion"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                {errors.profesion && touched.profesion && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='profesion'></ErrorMessage>
                                    </div>
                                )}
                                <label htmlFor="position" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Posicion</label>
                                <Field
                                    autoComplete="position"
                                    id="position"
                                    name="posicion"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                {errors.posicion && touched.posicion && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='posicion'></ErrorMessage>
                                    </div>
                                )}
                                <label htmlFor="hiring_date" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Fecha de Contratacion</label>
                                <Field
                                    autoComplete="hiring_date"
                                    id="hiring_date"
                                    name="fecha_contratacion"
                                    type='date'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.fecha_contratacion && touched.fecha_contratacion && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='fecha_contratacion'></ErrorMessage>
                                    </div>
                                )}
                                <label htmlFor="department" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Departamento</label>
                                <Field
                                    autoComplete="department"
                                    id="department"
                                    name="departamento"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                {errors.departamento && touched.departamento && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='departamento'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="email" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Correo Electronico</label>
                                <Field
                                    autoComplete="email"
                                    id="email"
                                    name="correo"
                                    placeholder="example@email.com"
                                    type='email'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.correo && touched.correo && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='correo'></ErrorMessage>
                                    </div>
                                )}

                                <label  htmlFor="password" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Contraseña</label>
                                <div className='flex'>
                                    <Field
                                        autoComplete="current-password"
                                        id="password"
                                        name="contrasenia"
                                        type={showPassword ? "text" : "password"}
                                        className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    <span onClick={()=>setShowPassword(!showPassword)}  className='rounded border-2  bg-gray-200 w-10  flex items-center justify-center cursor-pointer'>{showPassword ? <SvgComponentEye></SvgComponentEye> : <SvgComponentEyeSlash></SvgComponentEyeSlash>}</span>
                                </div>
                                {errors.contrasenia && touched.contrasenia && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='contrasenia'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="confirmPassword" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Confirmar Contraseña</label>
                                <div className='flex'>
                                    <Field
                                        autoComplete="new-password"
                                        id="confirmPassword"
                                        name="confirmar_contrasenia"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}  className='rounded border-2  bg-gray-200 w-10  flex items-center justify-center cursor-pointer'>{showConfirmPassword ? <SvgComponentEye></SvgComponentEye> : <SvgComponentEyeSlash></SvgComponentEyeSlash>}</span>

                                </div>
                                {errors.confirmar_contrasenia && touched.confirmar_contrasenia && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='confirmar_contrasenia'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor='rol'className='block text-gray-500 cursor-text text-base font-semibold mb-2'>Rol</label>
                                    <Field id='rol' name='rol' component='select' preventDefault={ROLES.USER} className='rounded border-2 border-gray-200 text-black focus:border-green-400 focus:ring-green-400  outline-0'>
                                        <option value='user'>User</option>
                                        <option value='admin'>Admin</option>
                                    </Field>
                                    {errors.rol && touched.rol && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='rol'></ErrorMessage>
                                        </div>
                                    )}

                                <div className='flex flex-col pt-2 gap-2'>
                                    <Link href="/auth/login" className="text-sm text-green-400"><p>¿Ya tiene una cuenta? Iniciar sesion</p></Link>
                                    <button  type="submit" className={`${!isValid || !dirty ? '':'hover:bg-green-300'} bg-green-400  transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal`}>Register</button>
                                </div>
                                {isSubmitting ? (<p className={'text-black dark:text-white'}>Registering...</p>) : null}
                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        </div>
    )
}
