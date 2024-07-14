'use client'
import { findUniqueEmail, createUserBD } from '@/app/libs/data';
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
        .matches(/^\d{13}$/, 'The CUI must have 13 digits')
        .required('CUI is required'),


        nit: Yup.string()
        .matches(/^\d{8}$/, 'the NIT must have 8 digits')
        .required('NIT is required'),

        name: Yup.string()
        .matches(/^[A-Za-z]+$/, 'The Name can only contain letters')
        .min(2,'name to short')
        .max(30,'name to long')
        .required('Name is obligatory'),

        lastname: Yup.string()
        .matches(/^[A-Za-z]+$/, 'The Lastname can only contain letters')
        .min(2,'lastname to short')
        .max(30,'lastname to long')
        .required('Lastname is obligatory'),

        phone: Yup.string()
        .matches(/^\d{8}$/, 'Format does not match')
        .required('Phone is obligatory'),

        address: Yup.string()
        .matches(/^[A-Za-z0-9\s]+$/, 'Do not use special characters (@,/,*,%,&)')
        .min(5,'The address must contain at least 5 characters')
        .max(100,'The address must contain a maximum of 100 characters')
        .required('La dirección es requerida'),

        gender: Yup.string()
        .oneOf(['masculine', 'feminine'], 'select a rol'),
        roles: Yup.string().oneOf([ROLES.USER, ROLES.ADMIN], 'select a rol'),

        //roles: Yup.string().oneOf([ROLES.USER, ROLES.ADMIN], 'select a rol'),

        email: Yup.string()
        .email('Invalid email format')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'The email is invalid')
        .required('email is obligatory'),

        password: Yup.string()
        .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is obligatory'),
        confirmPassword: Yup.string().test('passwords-match', 'Las contraseñas no coinciden', function (value) {
            return value === this.resolve(Yup.ref('password'));
        }).required('camp required'),
    }
)


export default function Page() {
    const modeSelector = useSelector(selectDarkMode);
    const [gender1, setGender] = useState('');

    const router = useRouter();

    const initialRegister = {
        cui:'',
        nit:'',
        name:'',
        lastname:'',
        phone:'',
        address:'',
        gender:'',
        birthday:'',
        stateCivil:'',
        profession:'',
        email:'',
        password:'',
        confirmPassword:'',
        roles:ROLES.USER,

    }
    

    return (
        <div className={`flex justify-center items-center min-h-screen ${modeSelector} dark:bg-black`}>
            <div className={'flex justify-center h-1/2  items-center bg-gray-200 dark:bg-slate-600 p-4 rounded-lg transition-colors duration-500'}>
                <div className={'flex flex-col bg-white w-96 dark:bg-black p-8 rounded-md transition-colors duration-500'}>
                <div className='flex justify-center'><Link href={'/'}><img src='/logoSantaAna.png' alt='logo Santa Ana' width={60} height={60}></img></Link></div>

                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Register</div>
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
                                console.log(values);






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

                                <label  htmlFor='name' className="block text-gray-500 cursor-text text-base font-semibold mb-2">Name</label>
                                <Field
                                    autoComplete="name"
                                    id='name'
                                    name='name'
                                    placeholder='name'
                                    type='text'
                                    className="rounded border-2 border-gray-200  text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                ></Field>
                                {errors.name && touched.name && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='name'></ErrorMessage>
                                    </div>
                                )}

                                <label hrmlFrom="lastname" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Lastname</label>
                                <Field
                                    autoComplete="lastname"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="lastname"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.lastname && touched.lastname && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='lastname'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="phone" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Phone</label>
                                <Field
                                    autoComplete="phone"
                                    id="phone"
                                    name="phone"
                                    placeholder="xxxx-xxxx"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.phone && touched.phone && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='phone'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="address" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Address</label>
                                <Field
                                    autoComplete="address"
                                    id="address"
                                    name="address"
                                    placeholder="address"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.address && touched.address && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='address'></ErrorMessage>
                                    </div>
                                )}

                                {/* <label htmlFor="gender" className="block text-gray-500 cursor-text text-base font-semibold mb-2">gender</label> */}

                                <div className="" >
                                    <span className="block text-gray-500 cursor-text text-base font-semibold mb-2">Gender</span>
                                    <div className="flex gap-3">

                                        <div className="flex items-center mb-2 gap-2">
                                            <Field
                                                checked={gender1 === 'masculine'}
                                                onChange={() => setGender('masculine')}
                                                id="gender-male"
                                                type="radio"
                                                value="masculine"
                                                name="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="gender-male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                                            
                                            <Field
                                                checked={gender1 === 'feminine'}
                                                onChange={() => setGender('feminine')}
                                                id="gender-female"
                                                type="radio"
                                                value="feminine"
                                                name="gender"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="gender-female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>

                                            <Field
                                                checked={gender1 === 'a'}
                                                onChange={() => setGender('a')}
                                                id="gender-female"
                                                type="radio"
                                                value="a"
                                                name="otro"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="otro" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">otro</label>
                                            
                                        </div>
                                        {errors.gender && touched.gender && (
                                            <div className='text-red-700 text-sm'>
                                                <ErrorMessage name='gender'></ErrorMessage>
                                            </div>
                                        )}
                                    </div>
                                    <label htmlFor='roles'>Rol</label>
                                    <Field id='roles' name='roles' component='select' preventDefault={ROLES.USER}>
                                        <option value='user'>User</option>
                                        <option value='admin'>Admin</option>
                                        <option value='nada'>nada</option>

                                    </Field>
                                    {errors.roles && touched.roles && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='roles'></ErrorMessage>
                                        </div>
                                    )}

                                </div>
                                {/* <Field
                                    autoComplete="gender"
                                    id="gender"
                                    name="gender"
                                    placeholder="gender"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.gender && touched.gender && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='gender'></ErrorMessage>
                                    </div>
                                )} */}

                                <label htmlFor="birthday" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Birthday</label>
                                <Field
                                    autoComplete="birthday"
                                    id="birthday"
                                    name="birthday"
                                    placeholder="birthday"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.birthday && touched.birthday && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='birthday'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="stateCivil" className="block text-gray-500 cursor-text text-base font-semibold mb-2">State Civil</label>
                                <Field
                                    autoComplete="stateCivil"
                                    id="stateCivil"
                                    name="stateCivil"
                                    placeholder="stateCivil"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                {errors.stateCivil && touched.stateCivil && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='stateCivil'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="profession" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Profession</label>
                                <Field
                                    autoComplete="profession"
                                    id="profession" name="profession"
                                    placeholder="profession"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                {errors.profession && touched.profession && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='profession'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="email" className="block text-gray-500 cursor-text text-base font-semibold mb-2">E-mail</label>
                                <Field
                                    autoComplete="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    type='email'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
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
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.password && touched.password && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='password'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="confirmPassword" className="block text-gray-500 cursor-text text-base font-semibold mb-2">confirmPassword</label>
                                <Field
                                    autoComplete="new-password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="confirmPassword password"
                                    type="password"
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='confirmPassword'></ErrorMessage>
                                    </div>
                                )}

                                <label htmlFor="id_role" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Role</label>
                                <Field
                                    autoComplete="id_role"
                                    id="id_role"
                                    name="id_role"
                                    placeholder="id_role"
                                    type='text'
                                    className="rounded border-2 border-gray-200 text-sm w-full leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                {errors.id_role && touched.id_role && (
                                    <div className='text-red-700 text-sm'>
                                        <ErrorMessage name='id_role'></ErrorMessage>
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
