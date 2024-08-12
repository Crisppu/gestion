import axios from 'axios';
//crear un nuevo empleado
export async function fetchGetAllDepartamentsCuontries() {
    const response = await axios.get('http://localhost:3000/api/departamentospais/');
    return response.data;
}