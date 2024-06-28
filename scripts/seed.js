const { db } = require('@vercel/postgres');

async function seedCreateRoles(client) {

    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS roles (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                role_name VARCHAR(255) NOT NULL
            );
      `;
      console.log(`Created "roles" table`);
      return {createTable}

    } catch (error) {
      console.error('Error creating roles:', error);
      throw error;
    }
}

async function seedCreateUsers(client) {

    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;
        console.log(`Created "users" table`);
        return {createTable}

    } catch (error) {
        console.error('Error creating users:', error);
        throw error;
    }
}

async function seedCreateDetailsUsers(client) {

    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS detailsUsers (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                cui text NOT NULL UNIQUE,
                nit text NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                sexo CHAR(1) NOT NULL,
                birthday DATE NOT NULL,
                estadoCivil VARCHAR(50) NOT NULL,
                profession VARCHAR(50) NOT NULL,
                id_role UUID NOT NULL,
                id_user UUID NOT NULL,
                FOREIGN KEY (id_role) REFERENCES roles(id),
                FOREIGN KEY (id_user) REFERENCES users(id)
            );
        `;
      console.log(`Created "detailsUsers" table`);
      return {createTable}

    } catch (error) {
      console.error('Error creating detailsUsers:', error);
      throw error;
    }
}

async function main(){
    const client = await db.connect();
    await seedCreateRoles(client);
    await seedCreateUsers(client);
    await seedCreateDetailsUsers(client);
    await client.end();
}
main().catch((error) => {
        console.error(
            'An error occurred while attempting to seed the database:',
            error,
        );
    }
);