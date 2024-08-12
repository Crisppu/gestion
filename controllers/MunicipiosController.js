import { getAllMunicipios } from "@/models/Municipios";

export const getAllMunicipiosController = async (req, res) => {
    try {
        const response = await getAllMunicipios();
        if(!response.rows.length){
            res.status(200).json({ message: 'Tabla de departamentos de pais vacia', data: []  });
        }else{
            res.status(200).json({ message: 'Todos los departamentos de pais mostrasdos exitosamente', data: response.rows });
        }
    } catch (error) {
        res.status(500).json({message:'Error al obtener los datos de los departamentos de pais', error: error });
    }
};