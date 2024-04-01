'use server'
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'

// Funcion para insertar un nuevo registro en la tabla
export async function insertarRegistro(userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const response = await sql`
        INSERT INTO users (name, email, password) VALUES (${userData.username},${userData.email},${hashedPassword}) RETURNING *;`;

        const bypassPassword = response.rows.map(row =>{
            const { password, ...user} = row; // Utilizando destructuring para excluir el campo 'password'
            return user;
        })
        console.log(bypassPassword);

        return bypassPassword
    } catch (error) {
        // manejar errores de solicitud
        console.error('Error al realizar la solicitud:', error.message);
        // Lanzar un nuevo error con más contexto
        throw new Error('Hubo un problema al realizar la solicitud un nuevo registro de usuario');

    }
}

export async function findUniqueEmail(email) {
    try {
        const response = await sql`
            SELECT * FROM users WHERE email = ${email}`;
            return response
    } catch (error) {
        // Manejar errores de solicitud
        console.error('Error al realizar la solicitud:', error.message);

        // Lanzar un nuevo error con más contexto
        throw new Error('Hubo un problema al realizar la solicitud de verificacion de correo');
    }
}