'use server'
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'

//crud
//TODO: Create
export async function createUser(correo, contrasenia) {

    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const response = await sql`
        INSERT INTO Usuarios (correo, contrasenia) VALUES (${correo}, ${hashedPassword}) RETURNING id;`;
    return response;
}


//filtros
//obtener usuario por
export async function getUserByEmail(correo) {
    const response = await sql`SELECT * FROM Usuarios WHERE correo = ${correo}`;
    return response;
};
