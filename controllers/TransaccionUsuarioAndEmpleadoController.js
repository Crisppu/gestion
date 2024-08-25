// pages/api/empleados.js
import { createUserAndEmployee } from '@/models/TransaccionUsuarioAndEmpleado';

export default async function createUserAndEmployeeController(req, res) {
    // console.log(req.body);
    const {
        cui,
        nit,
        nombre,
        apellido,
        id_municipio,
        direccion,
        telefono,
        genero,
        fecha_nacimiento,
        estado_civil,
        id_profesion,
        salario_base,
        posicion,
        fecha_contratacion,
        correo,
        contrasenia,
        id_rol,
        createBy
    } = req.body;

    try {
        const response = await createUserAndEmployee({cui,nit,nombre
            ,apellido,id_municipio, direccion, telefono,
            genero,fecha_nacimiento,estado_civil,
            id_profesion,salario_base,posicion,fecha_contratacion,correo,contrasenia,id_rol,createBy
        });

        res.status(200).json({ message: 'Empleado creado exitosamente' ,data: response});
    } catch (error) {
        // console.error("Error al crear el empleado:", error);
        res.status(500).json({ message: 'Error al crear el empleado transaccion', error: error });
    }
}
