import axios from 'axios';
//crear un nuevo empleado
export async function fetchCreateNewEmployee(data) {
    try {
        const response = await axios.post('http://localhost:3000/api/empleado/create', data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
}