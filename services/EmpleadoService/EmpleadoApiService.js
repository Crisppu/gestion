import axios from 'axios';
//crear un nuevo empleado
export async function fetchCreateNewEmployee(data) {
    const response = await axios.post('http://localhost:3000/api/empleado/create', data);
    return response.data;
}
