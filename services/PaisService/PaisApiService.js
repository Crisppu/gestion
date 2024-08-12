import axios from 'axios';
//crear un nuevo empleado
export async function fetchGetAllCountries() {
    const response = await axios.get('http://localhost:3000/api/pais/');
    return response.data;
}
