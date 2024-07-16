import { sql } from '@vercel/postgres';
//crud
//TODO: Create
export async function createEmployee(data) {
    try {
        const response = await sql`
            INSERT INTO Empleados (
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
            )
            VALUES (${data.cui}, ${data.nit}, ${data.nombre}, ${data.apellido}, ${data.telefono}, ${data.direccion}, ${data.genero}, ${data.fecha_nacimiento}, ${data.estado_civil}, ${data.profesion}, ${data.posicion}, ${data.fecha_contratacion}, ${data.departamento}, ${data.rol}, ${data.id_usuario})
            returning *;`
        return response.rows[0];
    } catch (error) {
        // Manejar errores de solicitud
        console.error('Error al realizar la solicitud:', error.message);
        // Lanzar un nuevo error con más contexto
        throw new Error('Hubo un problema al realizar la solicitud de creación de empleado');
    }
}