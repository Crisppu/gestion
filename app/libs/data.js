'use server'
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'

export async function getUser(email) {
    try {
      const user = await sql`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
}
export async function getUserAll() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const user = await sql`SELECT * FROM users `;
      console.log(user)
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
}

// Funcion para insertar un nuevo registro en la tabla
export async function createUserBD(userData) {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const response = await sql`
        INSERT INTO users (name, email, password) VALUES (${userData.username},${userData.email},${hashedPassword}) RETURNING *;`;

        const bypassPassword = response.rows.map(row =>{
            const { password, ...user} = row; // Utilizando destructuring para excluir el campo 'password'
            return user;
        })

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

// Todo aqui vamos a crear funcionalidades para agregar informacion a las tablas
//seguimos ....

//Todo - detailsUsers- CRUM
//Create- user
export async function CreateDetailUser(userData){
    try {
        const response = await sql`
            INSERT INTO detailsUsers (
            cui,nit,name,lastname,phone,address,gender,birthday,stateCivil,profession,id_role,id_user) VALUES
            (${userData.cui},${userData.nit},${userData.name},${userData.lastName},${userData.phone},${userData.address},${userData.gender},${userData.birthday},${userData.stateCivil},${userData.profession},${userData.id_role},${userData.id_user});`;
        return response;
    } catch (error) {
        console.error('error al crear un nuevo usuario:', error);
        throw new Error('Failed to fetch detailsUsers.');
    }
}
//Read=get - mostrar todos los registros de la tabla detailsUsers(SQL)
export async function GetDetailUser(){
    try {
        const response = await sql`
            SELECT * FROM detailsUsers;`;
        return response;
    } catch (error) {
        console.error('error al mostrar todos los usuarios:', error);
        throw new Error('Failed to fetch detailsUsers.');
    }
}

//Todo - Roles - CRUD
//Create- role
export async function CreateRole(roleData){
    try {
        const response = await sql`
            INSERT INTO roles (role_name) VALUES
            (${roleData.role_name});`;
            return response;
    } catch (error) {
        console.error('error al crear un nuevo rol:', error);
        throw new Error('Failed to fetch roles.');
    }
}
//Read=get - mostrar todos los registros de la tabla roles(SQL)
export async function GetRoles(){
    try {
        const response = await sql`
            SELECT * FROM roles;`;
        return response;
    } catch (error) {
        console.error('error al mostrar todos los roles:', error);
        throw new Error('Failed to fetch roles.');
    }
}
//Todo - Users - CRUD
//Create- user
export async function CreateUser(userData){
    try {
        const response = await sql`
            INSERT INTO users (email,password) VALUES
            (${userData.email},${userData.password});`;
            return response;
    } catch (error) {
        console.error('error al crear un nuevo usuario:', error);
        throw new Error('Failed to fetch users.');
    }
}
//Read=get - mostrar todos los registros de la tabla users(SQL)
export async function GetUser(){
    try {
        const response = await sql`
            SELECT * FROM users;`;
        return response;
    } catch (error) {
        console.error('error al mostrar todos los usuarios:', error);
        throw new Error('Failed to fetch users.');
    }
}