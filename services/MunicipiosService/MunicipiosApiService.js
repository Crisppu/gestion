import axios from 'axios';

export const fetchGetAllMunicipios = async () => {
    const response = await axios.get('http://localhost:3000/api/municipios');
    return response.data;
};