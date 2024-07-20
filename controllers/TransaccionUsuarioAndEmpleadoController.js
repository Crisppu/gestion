// pages/api/empleados.js
import { createUserAndEmployee } from '@/models/TransaccionUsuarioAndEmpleado';

export default async function createUserAndEmployeeController(req, res) {
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
        correo,
        contrasenia,
        id_rol,
    } = req.body;

    try {
        const response = await createUserAndEmployee({cui,nit,nombre
            ,apellido,telefono,direccion,
            genero,fecha_nacimiento,estado_civil,
            profesion,posicion,fecha_contratacion,departamento,correo,contrasenia,id_rol
        });

        res.status(200).json({ message: 'Empleado creado exitosamente' ,data: response});
    } catch (error) {
        //console.error("Error al crear el empleado:", error);
        res.status(500).json({ message: 'Error al crear el empleado transaccion' });
    }
}
