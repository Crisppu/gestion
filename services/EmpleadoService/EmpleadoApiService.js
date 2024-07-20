import axios from 'axios';
//crear un nuevo empleado
export async function fetchCreateNewEmployee(data) {
    const response = await axios.post('http://localhost:3000/api/empleado/create', data);
    return response.data;
}
// export async function fetchCreateNewEmployee(data) {
//     try {
//         const response = await axios.post('http://localhost:3000/api/empleado/create', data);
//         console.log(response)
//         return response.data;
//     } catch (error) {
//         console.error(error,'service')
//        throw new Error('error en fetch post');
//     }
// }