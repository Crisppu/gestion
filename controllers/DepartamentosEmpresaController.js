import { getAllDepartamentsCompanie } from "@/models/DepartamentosEmpresa";

export const getAllDepartamentsCompanieController = async (req, res) => {
    try {
        const response = await getAllDepartamentsCompanie();
        if(!response.rows.length){
            res.status(200).json({ message: 'Tabla de departamentos de pais vacia', data: []  });
        }else{
            res.status(200).json({ message: 'Todos los departamentos de pais mostrasdos exitosamente', data: response.rows });
        }
    } catch (error) {
        res.status(500).json({message:'Error al obtener los datos de los departamentos de pais', error: error });
    }
};