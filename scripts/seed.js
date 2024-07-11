const { db } = require('@vercel/postgres');
async function seedCreateRoles(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Roles (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                nombre VARCHAR(40) NOT NULL UNIQUE
            );
        `;
        console.log(`Created "Roles" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Roles:', error);
        throw error;
    }
};

async function seedCreateUsuarios(client){
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Usuarios(
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                correo VARCHAR(30) NOT NULL UNIQUE,
                password VARCHAR(40) NOT NULL
            );
        `;
        console.log(`Created "Usuarios" table`);
        return {createTable}

    } catch (error) {
        console.error('Error creating Usuarios:', error);
        throw error;
    }

};

async function seedCreateEmpleados(client) {
   try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Empleados (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                cui varchar(50) NOT NULL UNIQUE,
                nit varchar(30) NOT NULL UNIQUE,
                nombre VARCHAR(30) NOT NULL,
                apellido VARCHAR(30) NOT NULL,
                telefono VARCHAR(20) NOT NULL,
                direccion VARCHAR(50) NOT NULL,
                genero INT NOT NULL CHECK (genero IN (0, 1)),
                fecha_nacimiento DATE NOT NULL,
                estado_civil INT NOT NULL CHECK (estado_civil IN (0, 1, 2, 3)),
                profesion VARCHAR(50) NOT NULL,
                posicion VARCHAR(50) NOT NULL,
                fecha_contratacion DATE NOT NULL,
                departamento VARCHAR(60) NOT NULL,
                id_rol UUID NOT NULL,
                FOREIGN KEY (id_rol) REFERENCES Roles(id),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "Empleados" table`);
        return {createTable}
    }catch (error) {
       console.error('Error creating Empleados:', error);
       throw error;
    }
};

async function seedCreatePagos(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Pagos (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                fechaPago DATE,
                salarioBase DECIMAL(18,2),
                horasExtras DECIMAL(18,2),
                totalHorasExtras DECIMAL(18,2),
                descuentos DECIMAL(18,2),
                salarioNeto DECIMAL(18,2),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "Pagos" table`);
        return {createTable}

    }catch (error) {
       console.error('Error creating Pagos:', error);
       throw error;
    }
};

async function seedCreateDescuentos(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Descuentos (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                tipoDescuento VARCHAR(100),
                monto DECIMAL(18,2),
                fechaDescuento DATE,
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "Descuentos" table`);
        return {createTable}
    }catch (error) {
       console.error('Error creating Descuentos:', error);
       throw error;
    }
};

async function seedCreateHorasExtras(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS HorasExtras (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                fecha DATE,
                horasTrabajadas DECIMAL(18,2),
                tasaPago DECIMAL(18,2),
                montoPagado DECIMAL(18,2),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "HorasExtras" table`);
        return {createTable}
    }catch (error) {
       console.error('Error creating HorasExtras:', error);
       throw error;
    }
};

async function seedCreateIndemnizaciones(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Indemnitizaciones (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                fecha DATE,
                monto DECIMAL(18,2),
                motivo VARCHAR(255),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "Indemnitizaciones" table`);
        return {createTable}
    }catch (error) {
       console.error('Error creating Indemnitizaciones:', error);
       throw error;
    }
};

async function seedCreateLiquidaciones(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Liquidaciones (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                fecha DATE,
                monto DECIMAL(18,2),
                detalles VARCHAR(255),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "Liquidaciones" table`);
        return {createTable}
    }catch (error) {
       console.error('Error creating Liquidaciones:', error);
       throw error;
    }
};

async function seedCreateControlPagos(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS ControlPagos (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                periodoInicio DATE,
                periodoFin DATE,
                salarioBruto DECIMAL(18,2),
                totalDescuentos DECIMAL(18,2),
                salarioNeto DECIMAL(18,2),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                deletedBy UUID,
                deletedAt TIMESTAMP,
                isDeleted BOOLEAN DEFAULT true
            );
        `;
        console.log(`Created "ControlPagos" table`);
        return {createTable}
    }catch (error) {
       console.error('Error creating ControlPagos:', error);
       throw error;
    }
};

async function createFunctionEmpleadosInsert(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_empleados_insert_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE Empleados
                    SET createBy = id_usuario,
                        createdAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_empleados_insert_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_Empleados_Insert_function:', error);
        throw new Error('Failed to fetch trg_empleados_insert_function:');
    }
};

async function createTriggerEmpleadosInsert(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_empleados_insert
            AFTER INSERT
            ON Empleados
            FOR EACH ROW
            EXECUTE PROCEDURE trg_empleados_insert_function();
        `;
        console.log(`created "trg_Empleados_Insert" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_empleados_insert:', error);
        throw new Error('Failed to fetch trg_empleados_insert.');
    }
};

async function main(){
    const client = await db.connect();
    await seedCreateRoles(client);
    await seedCreateUsuarios(client);
    await seedCreateEmpleados(client);
    await seedCreatePagos(client);
    await seedCreateDescuentos(client);
    await seedCreateHorasExtras(client);
    await seedCreateIndemnizaciones(client);
    await seedCreateLiquidaciones(client);
    await seedCreateControlPagos(client);
    await createFunctionEmpleadosInsert(client);
    await createTriggerEmpleadosInsert(client);
    await client.end();
};
main().catch((error) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        error,
    );
});

