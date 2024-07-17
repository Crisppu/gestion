'use server'
import { sql } from '@vercel/postgres';
//crud
//TODO: Create
export async function createUser(data) {
    try {
        const response = await sql`
            INSERT INTO Usuarios (correo, contrasenia) VALUES (${data.correo}, ${data.contrasenia}) RETURNING *;`;
        return response.rows[0];
    } catch (error) {
        // Manejar errores de solicitud
        console.error('Error al realizar la solicitud:', error.message);
        // Lanzar un nuevo error con más contexto
        throw new Error('Hubo un problema al realizar la solicitud de creación de usuario');
    }
}


//filtros
//obtener usuario por
export async function getUserByEmail(correo) {
    const response = await sql`SELECT * FROM Usuarios WHERE correo = ${correo}`;
    return response;
};
