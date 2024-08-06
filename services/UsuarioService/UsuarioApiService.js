//Ruta API (API Route)
import axios from 'axios';
//crear un nuevo usuario
export async function fetchCreateNewUser(correo, contrasenia) {
    const response = await axios.post('http://localhost:3000/api/usuario/create', {correo, contrasenia});
    return response.data;
}
//filtros
export async function fetchUserByEmail(correo) {

    const response = await axios.get(`http://localhost:3000/api/usuario/${correo}`);
    return response.data;

}
