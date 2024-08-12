import { sql } from '@vercel/postgres';

//crud
//TODO: Create
//read
export async function getAllMunicipios() {
    const response = await sql`SELECT * FROM Municipios`;
    return response;
};