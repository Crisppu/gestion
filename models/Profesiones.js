import { sql } from '@vercel/postgres';

//crud
//TODO: Create
//read
export async function getAllProfessions() {
    const response = await sql`SELECT * FROM Profesiones`;
    return response;
};