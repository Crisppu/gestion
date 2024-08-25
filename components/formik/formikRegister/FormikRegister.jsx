'use client'
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline'; //estos son iconos atraidos desde Tailwind
import { ROLES } from '@/modelsOrientacionObjeto/roles.enum';
import { selectDarkMode } from '@/redux/features/darkModeSlice';
import { fetchUserByEmail } from '@/services/UsuarioService/UsuarioApiService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import { fetchCreateNewEmployeeTransaction } from '@/services/transaccionService/transiccionUsuarioAndEmpleadoApiService';
import { getSessionNextAuth } from "@/app/api/auth/[...nextauth]/getSessionAsync";
import { calcLength } from 'framer-motion';

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
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede contener letras')
        .min(2,'nombre muy corto')
        .max(30,'nombre muy largo')
        .required('El campo es obligatorio'),

        apellido: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'El apellido solo puede contener letras')
        .min(2,'apellido muy corto')
        .max(30,'apellido muy largo')
        .required('El campo es obligatorio'),


        // pais: Yup.string()
        // .required('El campo es obligatorio'),
        // departamento_pais: Yup.string()
        // .required('El campo es obligatorio'),
        // id_municipio: Yup.number()
        // .required('El campo es obligatorio'),

        direccion: Yup.string()
        .matches(/^[A-Za-z0-9\s]+$/, 'No se permiten caracteres especiales (@,/,*,%,&)')
        .min(5,'Dirección muy corta')
        .max(20,'Dirección muy larga')
        .required('El campo es obligatorio'),
        telefono: Yup.string()
        .matches(/^\d{8}$/, 'Formato incorrecto')
        .required('El campo es obligatorio'),

        genero: Yup.string()
        .oneOf(['0', '1'], 'Seleccione su género')
        .required('El campo es obligatorio'),
        fecha_nacimiento: Yup.date()
        .required('La fecha de nacimiento es obligatoria'),
        estado_civil: Yup.string()
        .oneOf(['0', '1', '2', '3'], 'Seleccione su estado civil')
        .required('El campo es obligatorio'),
        departamento_empresa: Yup.number()
        .required('El campo es obligatorio'),
        id_profesion: Yup.number()
        .required('El campo es obligatorio'),
        salario_base: Yup.number()
        .required('campo es obligatorio')
        .positive('El salario base debe ser positivo'),
        posicion: Yup.string()
        .required('El campo es obligatorio'),
        fecha_contratacion: Yup.date()
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

        id_rol: Yup.number()
        .transform(value => (isNaN(value) ? undefined : parseInt(value, 10)))

        // id_rol: Yup.string().oneOf([ROLES.USER, ROLES.ADMIN], 'Seleccione un Rol'),
        //id_rol: Yup.string().required('El campo es obligatorio'),
    }
)


export default function FormikRegister({dataCountries, dataDepartamentsCuontries, dataMunicipios ,dataDepartamentsCompanie, dataProfessions}) {
    const modeSelector = useSelector(selectDarkMode);

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    console.log(dataMunicipios);
    const initialRegister = {
        cui:'',
        nit:'',
        nombre:'',
        apellido:'',
        pais:'',
        departamento_pais:'',
        id_municipio:'',
        direccion:'',
        telefono:'',
        genero:'',
        fecha_nacimiento:'',
        estado_civil:'',
        departamento_empresa:'',
        id_profesion:'',
        salario_base:'',
        posicion:'',
        fecha_contratacion:'',
        correo:'',
        contrasenia:'',
        confirmar_contrasenia:'',
        id_rol:2,//ROLES.USER,

    }

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [getMunicipios, setMunicipio] = useState([]);
    const [selectedDepartmentCompanie, setSelectedDepartmentCompanie] = useState('');


    return (
        <div className={`flex justify-center items-center min-h-screen ${modeSelector} dark:bg-black`}>
            <div className={'flex justify-center h-1/2  items-center bg-gray-200 dark:bg-slate-600 p-4 rounded-lg transition-colors duration-500'}>
                <div className={'flex flex-col bg-white w-full dark:bg-black p-8 rounded-md transition-colors duration-500'}>
                <div className='flex justify-center'><Link href={'/'}><img src='/logoSantaAna.png' alt='logo Santa Ana' width={60} height={60}></img></Link></div>

                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Registro</div>
                    {message && <p className='text-white bg-red-500'>{message}</p>}

                    <Formik
                        /* Initial values that the form will take */
                        initialValues = {initialRegister}
                        /** Yup validations schema */
                        validationSchema={registerSchema}
                        /*onSubmit Event */
                        onSubmit = {async (values,actions) =>
                            {
                                const session = await getSessionNextAuth();
                                await new Promise((r) =>{
                                        return setTimeout(r, 2000)
                                    }
                                );
                                const municipioId = Number(values.id_municipio);
                                const profesionId = Number(values.id_profesion);
                                const genero = Number(values.genero);
                                const estado_civil = Number(values.estado_civil);
                                try{
                                    const response = await fetchUserByEmail(values.correo);
                                    if(response.data) {
                                        alert(JSON.stringify(response.message))
                                    }
                                    // const{pais,departamento_pais,departamento_empresa, confirmar_contrasenia, ...newList}=values;
                                    // const r = values.id_municipio;
                                    // console.log(municipioId );
                                    const ListEmployee = {
                                        cui: values.cui,
                                        nit: values.nit,
                                        nombre: values.nombre,
                                        apellido: values.apellido,
                                        id_municipio: municipioId,
                                        direccion: values.direccion,
                                        telefono: values.telefono,
                                        genero:genero,
                                        fecha_nacimiento: values.fecha_nacimiento,
                                        estado_civil: estado_civil,
                                        id_profesion: profesionId,
                                        salario_base: values.salario_base,
                                        posicion: values.posicion,
                                        fecha_contratacion: values.fecha_contratacion,
                                        correo: values.correo,
                                        contrasenia: values.contrasenia,
                                        id_rol: values.id_rol,
                                        createBy: 1
                                    }

                                    const responseTransaction = await fetchCreateNewEmployeeTransaction(ListEmployee);
                                    actions.resetForm();
                                    if(responseTransaction.data){
                                        alert(JSON.stringify(responseTransaction.message));
                                    }else{
                                        setMessage(responseTransaction.message);
                                    }

                                    if(!session?.user){
                                        router.push('/auth/login');
                                    }

                                }catch(error){
                                    setMessage(error.response ? error.response.data.message : error.menssage)
                                }

                                actions.setSubmitting(false);
                            }
                        }
                    >
                        {({errors, touched, isSubmitting, handleSubmit, isValid, dirty, values, setFieldValue, handleChange})  =>
                            (
                                <Form className={'flex flex-col gap-y-2 text-black dark:text-white'} onSubmit={handleSubmit}>
                                    <div className='flex gap-2'>
                                        <div className='flex flex-col w-3/5'>
                                            <label htmlFor='cui' className="block text-gray-500 cursor-text text-base font-semibold mb-2">CUI</label>
                                            <Field
                                                autoComplete="cui"
                                                id='cui'
                                                name='cui'
                                                placeholder='CUI'
                                                type='text'
                                                className="rounded border-2 border-gray-200 text-sm leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"></Field>
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
                                                className="rounded border-2 border-gray-200 text-sm  leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            />
                                            {errors.nit && touched.nit && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='nit'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    <div className='flex gap-2 '>
                                        <div className='flex-1'>
                                            <label  htmlFor='name' className="block text-gray-500 cursor-text text-base font-semibold mb-2">Nombre</label>
                                            <Field
                                                autoComplete="name"
                                                id='name'
                                                name='nombre'
                                                placeholder='Nombre'
                                                type='text'
                                                className="rounded border-2 border-gray-200  text-sm w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            ></Field>
                                            {errors.nombre && touched.nombre&& (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='nombre'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>

                                        <div className='flex-1'>
                                            <label hrmlFrom="lastname" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Apellido</label>
                                            <Field
                                                autoComplete="lastname"
                                                id="lastname"
                                                name="apellido"
                                                placeholder="Apellido"
                                                type='text'
                                                className="rounded border-2 border-gray-200 text-sm w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            />
                                            {errors.apellido && touched.apellido && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='apellido'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-1'>
                                        <label htmlFor="country" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Pais</label>
                                        <Field  id='country' name='pais' component='select' className=' rounded border-2 border-gray-200  focus:border-green-400 focus:ring-green-400  outline-0'
                                        value={selectedCountry}
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setSelectedCountry(selectedValue);
                                            setFieldValue('pais', selectedValue);
                                            setSelectedDepartment(''); // Resetea el departamento al cambiar el país
                                            setFieldValue('departamento_pais', '');
                                            setFieldValue('id_municipio', ''); // Resetea el municipio al cambiar el país
                                        }}
                                        >
                                            <option value="" disabled selected>Seleccione Pais</option>
                                            {dataCountries.map(({nombre, id}) => (
                                                    <option key={id} value={id} >{nombre}</option>
                                                ))
                                            }
                                        </Field>
                                        {errors.pais && touched.pais && (
                                            <div className='text-red-700 text-sm'>
                                                <ErrorMessage name='pais'></ErrorMessage>
                                            </div>
                                        )}
                                        </div>
                                        <div className='flex-3'>
                                            <label htmlFor="department_country" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Departamento</label>
                                            <Field  id='department_country' name='departamento_pais' component='select' className='rounded border-2 border-gray-200  focus:border-green-400 focus:ring-green-400  outline-0'
                                            value={selectedDepartment}
                                            onChange={(event) => {
                                                const selectedValue = event.target.value;
                                                setSelectedDepartment(selectedValue);
                                                setFieldValue('departamento_pais', selectedValue);
                                                setFieldValue('id_municipio', ''); // Resetea el municipio al cambiar el departamento
                                            }}>
                                                <option value="" disabled selected>Seleccione Departamento</option>
                                                {
                                                    selectedCountry ? dataDepartamentsCuontries.filter(dep => dep.id_pais === Number(selectedCountry)).map(({id, nombre}) => (
                                                        <option key={id} value={id}>{nombre}</option>
                                                    )) : null
                                                }
                                            </Field>
                                            {errors.departamento_pais && touched.departamento_pais && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='departamento_pais'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex-3'>
                                            <label htmlFor="municipio" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Municipio</label>
                                            <Field id='municipio' name='id_municipio' component='select' className='rounded border-2 border-gray-200  focus:border-green-400 focus:ring-green-400  outline-0'
                                            onChange={(event) => {
                                                setFieldValue('id_municipio', event.target.value);
                                            }}
                                            >
                                                <option  disabled selected>Seleccione municipio</option>
                                                {
                                                    dataMunicipios.filter(mun => mun.id_departamento === Number(selectedDepartment)).map(({id, nombre}) => (
                                                        <option key={id} value={id} type='number'>{nombre}</option>
                                                    ))
                                                }
                                            </Field>
                                            {errors.id_municipio && touched.id_municipio && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='id_municipio'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <label htmlFor="address" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Direccion</label>
                                    <Field
                                        autoComplete="address"
                                        id="address"
                                        name="direccion"
                                        type='text'
                                        className="rounded border-2 border-gray-200 text-sm w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                    />
                                    {errors.direccion && touched.direccion && (
                                        <div className='text-red-700 text-sm'>
                                            <ErrorMessage name='direccion'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex justify-between gap-2 p-2'>
                                        <label htmlFor="phone" className="block text-gray-500 cursor-text text-base font-semibold">Numero de telefono</label>
                                        <div className='flex items-center '>
                                            <span className=' text-black bg-gray-200 h-11 flex items-center justify-center p-1 rounded border-2'>+502</span>
                                            <Field
                                                autoComplete="phone"
                                                id="phone"
                                                name="telefono"
                                                placeholder="xxxx-xxxx"
                                                type='text'
                                                className="rounded border-2 border-gray-200 text-sm w-full leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            />
                                        </div>
                                    </div>
                                    {errors.telefono && touched.telefono && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='telefono'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex flex-col'>
                                        <div className='flex justify-between items-center gap-2'>
                                            <span className="block text-gray-500 cursor-text text-base font-semibold ">Genero</span>
                                            <div className="flex items-center gap-2">
                                                <Field
                                                    id="gender-male"
                                                    type="radio"
                                                    value="1"
                                                    name="genero"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="gender-male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masculino</label>

                                                <Field
                                                    id="gender-female"
                                                    type="radio"
                                                    value="0"
                                                    name="genero"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="gender-female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Femenino</label>
                                            </div>
                                        </div>
                                        {errors.genero && touched.genero && (
                                            <div className='text-red-700 text-sm flex justify-end'>
                                                <ErrorMessage name='genero'></ErrorMessage>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex justify-between gap-2'>
                                        <label htmlFor="birthday" className="block text-gray-500 cursor-text text-base font-semibold">Fecha de Nacimiento</label>
                                        <Field
                                            autoComplete="birthday"
                                            id="birthday"
                                            name="fecha_nacimiento"
                                            type='date'
                                            className="rounded border-2 border-gray-200 text-sm  leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                        />
                                    </div>
                                    {errors.fecha_nacimiento && touched.fecha_nacimiento && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='fecha_nacimiento'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex justify-between gap-2'>
                                        <span className="block text-gray-500 cursor-text text-base font-semibold">Estado Civil</span>
                                        <div className="flex gap-3">
                                            <div className="flex items-center gap-1">
                                                <Field
                                                    id="state-single"
                                                    type="radio"
                                                    value="0"
                                                    name="estado_civil"
                                                    className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="gender-single" className="pr-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Soltero</label>

                                                <Field
                                                    id="state-married"
                                                    type="radio"
                                                    value="1"
                                                    name="estado_civil"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="state-married" className="pr-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Casado</label>
                                                <Field
                                                    id="state-divorced"
                                                    type="radio"
                                                    value="2"
                                                    name="estado_civil"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="state-divorced" className="pr-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Divorciado</label>
                                                <Field
                                                    id="state-Widowed"
                                                    type="radio"
                                                    value="3"
                                                    name="estado_civil"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="state-Widowed" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Viudo</label>

                                            </div>
                                        </div>
                                    </div>
                                    {errors.estado_civil && touched.estado_civil && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='estado_civil'></ErrorMessage>
                                        </div>
                                    )}

                                    <div className='flex gap-2 py-4'>
                                        <div className='flex-1'>
                                            <label htmlFor="department_companie" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Departamento Empresa</label>
                                            <Field id='department_companie' name='departamento_empresa' component='select' className='rounded border-2 border-gray-200  focus:border-green-400 focus:ring-green-400  outline-0'
                                            value={selectedDepartmentCompanie}
                                            onChange={(event) => {
                                                const selectedValue = event.target.value;
                                                setSelectedDepartmentCompanie(selectedValue);
                                                setFieldValue('departamento_empresa', selectedValue);
                                                setFieldValue('id_profesion', null);
                                            }}>
                                                <option value="" disabled selected>Seleccione Departamento</option>
                                                {
                                                    dataDepartamentsCompanie.map(({id, nombre}) => (
                                                        <option key={Number(id)} value={Number(id)}>{nombre}</option>
                                                    ))
                                                }
                                            </Field>
                                            {errors.departamento_empresa && touched.departamento_empresa && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='departamento_empresa'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>


                                        <div className='flex-1'>
                                            <label htmlFor="profession" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Profesion</label>
                                            <Field id='profession' name='id_profesion' component='select' className='rounded border-2 border-gray-200  focus:border-green-400 focus:ring-green-400  outline-0'
                                            >
                                                <option value="" disabled selected>Seleccione Profesion</option>
                                                {
                                                    selectedDepartmentCompanie ? dataProfessions.filter(profesion => profesion.id_departamentoempresa === Number(selectedDepartmentCompanie)).map(({id, nombre}) => (
                                                        <option key={Number(id)} value={Number(id)}>{nombre}</option>
                                                    )) : null
                                                }
                                            </Field>
                                            {errors.id_profesion && touched.id_profesion && (
                                                <div className='text-red-700 text-sm'>
                                                    <ErrorMessage name='id_profesion'></ErrorMessage>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex justify-between gap-2'>
                                        <label htmlFor="base_salary" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Salario base</label>
                                        <div className='flex w-2/5'>
                                            <span className=' text-black bg-gray-200 h-11 flex items-center justify-center p-1 rounded border-2'>Q</span>
                                            <Field
                                            autoComplete="base_salary"
                                            id="base_salary"
                                            name="salario_base"
                                            type='number'
                                            className=" w-full rounded border-2 border-gray-200 text-sm leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                        </div>
                                    </div>
                                    {errors.salario_base && touched.salario_base && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='salario_base'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex justify-between gap-2'>
                                        <label htmlFor="position" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Posicion</label>
                                        <Field
                                        autoComplete="position"
                                        id="position"
                                        name="posicion"
                                        type='text'
                                        className="w-2/5 rounded border-2 border-gray-200 text-sm leading-4  tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"/>
                                    </div>
                                    {errors.posicion && touched.posicion && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='posicion'></ErrorMessage>
                                        </div>
                                    )}
                                    <div className='flex justify-between gap-2'>
                                        <label htmlFor="hiring_date" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Fecha de Contratacion</label>
                                        <Field
                                            autoComplete="hiring_date"
                                            id="hiring_date"
                                            name="fecha_contratacion"
                                            type='date'
                                            className="w-2/5 rounded border-2 border-gray-200 text-sm leading-4  tracking-normal appearance-none block h-11  p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                        />
                                    </div>
                                    {errors.fecha_contratacion && touched.fecha_contratacion && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='fecha_contratacion'></ErrorMessage>
                                        </div>
                                    )}
                                   <div className='flex justify-between gap-2'>
                                        <label htmlFor="email" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Correo Electronico</label>
                                        <Field
                                            autoComplete="email"
                                            id="email"
                                            name="correo"
                                            placeholder="example@email.com"
                                            type='email'
                                            className="w-2/5 rounded border-2 border-gray-200 text-sm leading-4 tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                        />
                                   </div>
                                    {errors.correo && touched.correo && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='correo'></ErrorMessage>
                                        </div>
                                    )}

                                    <div className='flex justify-between gap-2'>
                                        <label  htmlFor="password" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Contraseña</label>
                                        <div className='flex'>
                                            <Field
                                                autoComplete="current-password"
                                                id="password"
                                                name="contrasenia"
                                                type={showPassword ? "text" : "password"}
                                                className="rounded border-2 border-gray-200 text-sm leading-4 tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            />
                                            <span onClick={()=>setShowPassword(!showPassword)}  className='rounded border-2  bg-gray-200 w-8  flex items-center justify-center cursor-pointer'>{showPassword ? <EyeIcon className='text-black'></EyeIcon> : <EyeSlashIcon className='text-black'></EyeSlashIcon>}</span>
                                        </div>
                                    </div>
                                    {errors.contrasenia && touched.contrasenia && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='contrasenia'></ErrorMessage>
                                        </div>
                                    )}

                                    <div className='flex justify-between gap-2'>
                                        <label htmlFor="confirmPassword" className="block text-gray-500 cursor-text text-base font-semibold mb-2">Confirmar Contraseña</label>
                                        <div className='flex'>
                                            <Field
                                                autoComplete="new-password"
                                                id="confirmPassword"
                                                name="confirmar_contrasenia"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="rounded border-2 border-gray-200 text-sm w-2/5leading-4 tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                                            />
                                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}  className='rounded border-2  bg-gray-200 w-8  flex items-center justify-center cursor-pointer'>{showConfirmPassword ? <EyeIcon className='text-black'></EyeIcon> : <EyeSlashIcon className='text-black'></EyeSlashIcon>}</span>
                                        </div>
                                    </div>
                                    {errors.confirmar_contrasenia && touched.confirmar_contrasenia && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='confirmar_contrasenia'></ErrorMessage>
                                        </div>
                                    )}

                                    <div className='flex justify-between gap-2'>
                                        <label htmlFor='rol'className='block text-gray-500 cursor-text text-base font-semibold mb-2'>Rol</label>
                                        <Field onChange={handleChange} id='rol' name='id_rol' as='select' preventDefault={ROLES.USER} className='rounded border-2 border-gray-200 w-2/5 focus:border-green-400 focus:ring-green-400  outline-0'>
                                            <option value={2}>Usuario</option>
                                            <option value={1}>Admin</option>
                                        </Field>
                                    </div>
                                    {errors.id_rol && touched.id_rol && (
                                        <div className='text-red-700 text-sm flex justify-end'>
                                            <ErrorMessage name='id_rol'></ErrorMessage>
                                        </div>
                                    )}

                                    <div className='flex flex-col pt-2 gap-2'>
                                        <Link href="/auth/login" className="text-sm text-green-400"><p>¿Ya tiene una cuenta? Iniciar sesion</p></Link>
                                        <button  type="submit" className={`${!isValid || !dirty ? '':'hover:bg-green-300'} bg-green-400  transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal`}>Register</button>
                                    </div>
                                    {isSubmitting ? (<p >Registering...</p>) : null}
                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </div>
        </div>
    )
}
