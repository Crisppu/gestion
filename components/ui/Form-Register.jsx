'use client'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape(
    //shape: nos va permitir especificar la estructura de ese objeto
    {
        username: Yup.string()
        .min(6,'username to short')
        .max(12,'username to long')
        .required('name is obligatory'),
        email: Yup.string()
        .email('Invalid email format')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,'the email is invalid')
        .required('email is obligatory'),

        password: Yup.string()
        .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is obligatory'),
        confirm: Yup.string().test('passwords-match', 'Las contraseñas no coinciden', function (value) {
            return value === this.resolve(Yup.ref('password'));
        }).required('camp required'),
    }
)


export default function FormRegister() {
    const initialRegister = {
        username:'',
        email:'',
        password:'',
        confirm:'',
        roles:'pendiente'

    }
    

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className={'flex justify-center h-1/2  items-center bg-gray-200 dark:bg-slate-600 p-6 rounded-lg transition-colors duration-500'}>
            <div className={'flex flex-col bg-white w-96 dark:bg-black p-8 rounded-md transition-colors duration-500'}>
                <div className="text-2xl font-bold mb-2 text-[#1e0e4b] dark:text-white text-center">Register</div>
                <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-white">Log in to your account</div>

                <Formik
                    /* Initial values that the form will take */
                    initialValues = {initialRegister}
                    /** Yup validations schema */
                    validationSchema={registerSchema}
                    /*onSubmit Event */
                    onSubmit = {async (values,{resetForm}) =>
                        {
                            await new Promise((r) =>{
                                console.log(r)
                                return setTimeout(r, 2000)
                            });
                            // alert(JSON.stringify(values, null, 2));
                            // valida(values)
                            resetForm(); //para limpiar el formulario
                            actions.setSubmitting(false);
                            // navigateHistory('/profile');
                        }
                    }
                >
                {({ errors, touched, isSubmitting, handleSubmit, isValid, dirty}) =>
                (
                    <Form className={'flex flex-col '} onSubmit={handleSubmit}>
                        <label  htmlFor='username' className="block text-gray-600 cursor-text text-base leading-[140%] font-normal mb-2">Username</label>
                        <Field
                            autoComplete="username"
                            id='username'
                            name='username'
                            placeholder='username'
                            type='text'
                            className="rounded border border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                        ></Field>
                        {errors.username && touched.username && (
                            <div className='text-red-700'>
                                <ErrorMessage name='username'></ErrorMessage>
                            </div>
                        )}
                        <label htmlFor="email" className="block text-gray-600 cursor-text text-base leading-[140%] font-normal mb-2">Email</label>
                        <Field
                            autoComplete="email"
                            id="email"
                            name="email"
                            placeholder="example@email.com"
                            type='email'
                            className="rounded border border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                        />
                        {errors.email && touched.email && (
                            <div className='text-red-700'>
                                <ErrorMessage name='email'></ErrorMessage>
                            </div>
                        )}
                        <label  htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                        <Field
                            autoComplete="current-password"
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                            className="rounded border border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                        />
                        {errors.password && touched.password && (
                            <div className='text-red-700'>
                                <ErrorMessage name='password'></ErrorMessage>
                            </div>
                        )}
                        <label htmlFor="confirm" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">confirm</label>
                        <Field
                            id="confirm"
                            name="confirm"
                            placeholder="confirm password"
                            type="password"
                            className="rounded border border-gray-200  text-sm w-full font-normal leading-4 text-black tracking-normal appearance-none block h-11 m-0 p-3 focus:border-green-400 focus:ring-green-400  outline-0"
                        />
                        {errors.confirm && touched.confirm && (
                            <div className='text-red-700'>
                                <ErrorMessage name='confirm'></ErrorMessage>
                            </div>
                        )}
                        <div>
                            <a className="text-sm text-green-400" href="#">Ingresar con Google</a>
                        </div>
                        <button disabled={!isValid || !dirty} type="submit" className={`${!isValid || !dirty ? '':'hover:bg-green-300'} bg-green-400  transition-colors duration-300 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal`}>Login</button>
                        {isSubmitting ? (<p className={'text-black dark:text-white'}>login your credential</p>) : null}
                    </Form>
                )}

                </Formik>
            </div>
            </div>
        </div>
    )
}
