'use server'
//Ruta API (API Route)
import axios from 'axios';
//filtros
export async function fetchUserByEmail(email) {

    try {
        const response = await axios.get(`http://localhost:3000/api/usuario/${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }

}
