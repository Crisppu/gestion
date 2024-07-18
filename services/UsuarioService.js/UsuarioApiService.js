'use server'
//Ruta API (API Route)
import axios from 'axios';
//crear un nuevo usuario
export async function fetchCreateNewUser(correo, contrasenia) {
    console.log(correo, contrasenia)
    try {
        const response = await axios.post('http://localhost:3000/api/usuario/create', {correo, contrasenia});
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
}
//filtros
export async function fetchUserByEmail(correo) {

    try {
        const response = await axios.get(`http://localhost:3000/api/usuario/${correo}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }

}
