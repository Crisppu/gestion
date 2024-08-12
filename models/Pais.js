import { sql } from '@vercel/postgres';

//crud
//TODO: Create
//read
export async function getAllCountries() {
    const response = await sql`SELECT * FROM Pais`;
    return response;
};