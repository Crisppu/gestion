'use server'
import { sql } from '@vercel/postgres';
//crud



//filtros
//obtener usuario por email
export async function getUserByEmail(email) {
    try {
        const response = await sql`
            SELECT * FROM Usuarios WHERE correo = ${email}`;
        return response.rows[0];

    } catch (error) {
        // Manejar errores de solicitud
        console.error('Error al realizar la solicitud:', error.message);

        // Lanzar un nuevo error con más contexto
        throw new Error('Hubo un problema al realizar la solicitud de verificacion de correo');
    }
};
