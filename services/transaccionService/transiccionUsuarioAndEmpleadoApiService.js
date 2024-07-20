'use server'
//Ruta API (API Route)
import axios from 'axios';
//crear un nuevo usuario
export async function fetchCreateNewEmployeeTransaction(data) {
    const response = await axios.post('http://localhost:3000/api/transaccionempleado/create', data);
    return response.data;
}
