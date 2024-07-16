
import { createEmployee } from "@/models/Empleado";

export const createEmployeeController = async (req, res) => {
    //const { nombre, apellido, email, telefono, direccion, fecha_nacimiento, cargo, salario, usuario_id } = req.body;
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
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear un nuevo empleado' });
    }

};