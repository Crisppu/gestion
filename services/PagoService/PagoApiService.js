//Ruta API (API Route)
import axios from 'axios';
//mostrar todos los pagos
// TODO: R
export async function fetchAllPayments() {
    const response = await axios.get('http://localhost:3000/api/pago/');
    return response.data;
}