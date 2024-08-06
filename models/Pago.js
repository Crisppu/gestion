import { sql } from "@vercel/postgres";

//TODO CRUD
//Read
export async function getAllPayments(){
   const response= await sql`SELECT * FROM Pagos`;
  return response;
}