
import { createEmployee } from "@/models/Empleado";

export const createEmployeeController = async (req, res) => {
    console.log(req.body)
    const {
        cui,
        nit,
        nombre,
        apellido,
        telefono,
        direccion,
        genero,
        fecha_nacimiento,
        estado_civil,
        profesion,
        posicion,
        fecha_contratacion,
        departamento,
        id_rol,
        id_usuario
    } = req.body;
    //console.log(cui, nit)
    try {
        const newEmployee = await createEmployee({
            cui,
            nit,
            nombre,
            apellido,
            telefono,
            direccion,
            genero,
            fecha_nacimiento,
            estado_civil,
            profesion,
            posicion,
            fecha_contratacion,
            departamento,
            id_rol,
            id_usuario
        });
        console.log(newEmployee)
        if(newEmployee.rows.length){
            res.status(201).json({ message: 'Empleado creado con exito', data: newEmployee.rows[0] });
        }
    } catch (error) {
        //console.error(error.message,'controller')
        res.status(500).json({ message: `Error al crear un nuevo empleado: ${error}` });
    }

};