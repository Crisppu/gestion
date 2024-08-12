import { sql } from '@vercel/postgres';

//crud
//TODO: Create
//read
export async function getAllDepartamentsCuontries() {
    const response = await sql`SELECT * FROM DepartamentosPais`;
    return response;
};