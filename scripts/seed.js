const { db } = require('@vercel/postgres');
async function seedCreateRoles(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Roles (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
                contrasenia VARCHAR(80) NOT NULL
            );
        `;
        console.log(`Created "Usuarios" table`);
        return {createTable}

    } catch (error) {
        console.error('Error creating Usuarios:', error);
        throw error;
    }

};

async function seedCreateProfesiones(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Profesiones (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE
            );
        `;
        console.log(`Created "Profesiones" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Profesiones:', error);
        throw error;
    }
};
//insert into "Profesiones" (nombre_profesion, salario_base) values ('Administrador', 10000);

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
                genero INT NOT NULL CHECK (genero IN (0, 1, 2)),
                fecha_nacimiento DATE NOT NULL,
                estado_civil INT NOT NULL CHECK (estado_civil IN (0, 1, 2, 3)),
                id_profesion INTEGER NOT NULL,
                FOREIGN KEY (id_profesion) REFERENCES Profesiones(id) ON DELETE SET NULL,
                salario_base DECIMAL(10, 2) NOT NULL,
                posicion VARCHAR(50) NOT NULL,
                fecha_contratacion DATE NOT NULL,
                departamento VARCHAR(60) NOT NULL,
                id_rol INTEGER NOT NULL,
                FOREIGN KEY (id_rol) REFERENCES Roles(id) ON DELETE SET NULL,
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
                id_empleado UUID NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
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
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
                id_empleado UUID NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                tipoDescuento VARCHAR(100),
                monto DECIMAL(18,2),
                fechaDescuento DATE,
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
                id_empleado UUID NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                nombreJornada INT CHECK (nombreJornada IN (0, 1, 2, 3, 4)),
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
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
                id_empleado UUID NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                fecha DATE,
                monto DECIMAL(18,2),
                motivo VARCHAR(255),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
                id_empleado UUID NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                fecha DATE,
                monto DECIMAL(18,2),
                detalles VARCHAR(255),
                id_usuario UUID NOT NULL,
                FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
                createBy UUID,
                createdAt TIMESTAMP,
                updateBy UUID,
                updatedAt TIMESTAMP,
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
                id_empleado UUID NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
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
                status INT NOT NULL default 0 CHECK (status IN (0, 1, 2, 3))
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
    await seedCreateProfesiones(client);
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

