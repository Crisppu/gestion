import axios from 'axios';
//crear un nuevo empleado
export async function fetchGetAllDepartamentsCompanie() {
    const response = await axios.get('http://localhost:3000/api/departamentosempresa/');
    return response.data;
}