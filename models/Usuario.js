'use server'
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'

//crud
//TODO: Create
export async function createUser(correo, contrasenia) {

    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const response = await sql`
        INSERT INTO Usuarios (correo, contrasenia) VALUES (${correo}, ${hashedPassword}) RETURNING *;`;
    //omitir contrsenia
    const bypassPassword = response.rows.map(row =>{
        const { contrasenia, ...user} = row; // Utilizando destructuring para excluir el campo 'password'
        return user;
    });
    //retornar todo los datos del usuario creado excepto la contrasenia
    return bypassPassword[0];
   // return response.rows[0];
}


//filtros
//obtener usuario por
export async function getUserByEmail(correo) {
    const response = await sql`SELECT * FROM Usuarios WHERE correo = ${correo}`;
    return response;
};
