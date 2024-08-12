import { getAllCountries } from "@/models/Pais";

export const getAllCountriesController = async (req, res) => {

    try {
        const response = await getAllCountries();

        if(!response.rows.length){
            res.status(200).json({ message: 'Tabla de pais vacia', data: []  });
        }else{
            res.status(200).json({ message: 'Todos los paises mostrasdos exitosamente', data: response.rows });
        }
    } catch (error) {
        res.status(500).json({message:'Error al obtener los datos de los paises', error: error });
    }

};