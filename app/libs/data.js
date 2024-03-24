import { sql } from '@vercel/postgres';
// import {
//   CustomerField,
//   CustomersTableType,
//   InvoiceForm,
//   InvoicesTable,
//   LatestInvoiceRaw,
//   User,
//   Revenue,
// } from './definitions';
//para type js
// import { formatCurrency } from './utils'; //logica aparte

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
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)

        // console.log('Fetching revenue data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await sql`SELECT * FROM revenue`; //revenue-ingresos

        // console.log('Data fetch completed after 3 seconds.');
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}