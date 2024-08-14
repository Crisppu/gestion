import axios from 'axios';
//crear un nuevo empleado
export async function fetchGetAllProfessions() {
    const response = await axios.get('http://localhost:3000/api/profesiones/');
    return response.data;
}