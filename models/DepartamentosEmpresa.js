import { sql } from '@vercel/postgres';

//crud
//TODO: Create
//read
export async function getAllDepartamentsCompanie() {
    const response = await sql`SELECT * FROM DepartamentosEmpresa`;
    return response;
};