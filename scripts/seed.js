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
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
async function seedCreateDepartamentosEmpresa(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS DepartamentosEmpresa (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE
            );
        `;
        console.log(`Created "DepartamentosEmpresa" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Departamentos Empresa:', error);
        throw error;
    }
};
async function seedCreateProfesiones(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Profesiones (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE,
                id_departamentoEmpresa INTEGER NOT NULL,
                FOREIGN KEY (id_departamentoEmpresa) REFERENCES DepartamentosEmpresa(id) ON DELETE SET NULL
            );
        `;
        console.log(`Created "Profesiones" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Profesiones:', error);
        throw error;
    }
};


async function seedCreatePais(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Pais (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE
            );
        `;
        console.log(`Created "Pais" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Pais:', error);
        throw error;
    }
};
async function seedCreateDepartamentoPais(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS DepartamentosPais (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE,
                id_pais INTEGER NOT NULL,
                FOREIGN KEY (id_pais) REFERENCES Pais(id) ON DELETE SET NULL
            );
        `;
        console.log(`Created "DepartamentosPais" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Departamentos Pais:', error);
        throw error;
    }
};
//ins
async function seedCreateMunicipios(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Municipios (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL UNIQUE,
                id_departamento INTEGER NOT NULL,
                FOREIGN KEY (id_departamento) REFERENCES DepartamentosPais(id) ON DELETE SET NULL
            );
        `;
        console.log(`Created "Municipios" table`);
        return {createTable}
    }catch (error) {
        console.error('Error creating Municipios:', error);
        throw error;
    }
};


async function seedCreateEmpleados(client) {
   try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Empleados (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                cui varchar(50) NOT NULL UNIQUE,
                nit varchar(30) NOT NULL UNIQUE,
                nombre VARCHAR(30) NOT NULL,
                apellido VARCHAR(30) NOT NULL,
                telefono VARCHAR(20) NOT NULL,
                direccion VARCHAR(50) NOT NULL,
                id_municipio INTEGER NOT NULL,
                FOREIGN KEY (id_municipio) REFERENCES Municipios(id) ON DELETE SET NULL,
                genero INT NOT NULL CHECK (genero IN (0, 1, 2)),
                fecha_nacimiento DATE NOT NULL,
                estado_civil INT NOT NULL CHECK (estado_civil IN (0, 1, 2, 3)),
                id_profesion INTEGER NOT NULL,
                FOREIGN KEY (id_profesion) REFERENCES Profesiones(id) ON DELETE SET NULL,
                salario_base DECIMAL(10, 2) NOT NULL,
                posicion VARCHAR(50) NOT NULL,
                fecha_contratacion DATE NOT NULL,
                id_rol INTEGER NOT NULL,
                FOREIGN KEY (id_rol) REFERENCES Roles(id) ON DELETE SET NULL,
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
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
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_empleado INTEGER NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                fechaPago DATE,
                salarioBase DECIMAL(18,2),
                horasExtras DECIMAL(18,2),
                totalHorasExtras DECIMAL(18,2),
                descuentos DECIMAL(18,2),
                salarioNeto DECIMAL(18,2),
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
                updatedAt TIMESTAMP Default NULL,
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
// insert into "Pagos" (id_empleado ,fechapago, salariobase, horasextras, totalhorasextras, descuentos, salarioneto, id_usuario, createby, createdat, updateby, updatedat, status) values ('2023-01-01', 2000, 4, 4, 200, 900, '1', 'messi', '2023-01-01', 'null', 'null', 0);

async function seedCreateDescuentos(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Descuentos (
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_empleado INTEGER NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                tipoDescuento VARCHAR(100),
                monto DECIMAL(18,2),
                fechaDescuento DATE,
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
                updatedAt TIMESTAMP Default NULL,
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
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_empleado INTEGER NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id) ON DELETE CASCADE,
                nombreJornada INT CHECK (nombreJornada IN (0, 1, 2, 3, 4)),
                fecha DATE,
                horasTrabajadas DECIMAL(18,2),
                tasaPago DECIMAL(18,2),
                montoPagado DECIMAL(18,2),
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
                updatedAt TIMESTAMP Default NULL,
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
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_empleado INTEGER NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                fecha DATE,
                monto DECIMAL(18,2),
                motivo VARCHAR(255),
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE SET NULL,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
                updatedAt TIMESTAMP Default NULL,
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
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_empleado INTEGER NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                fecha DATE,
                monto DECIMAL(18,2),
                detalles VARCHAR(255),
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE SET NULL,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
                updatedAt TIMESTAMP Default NULL,
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
                id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_empleado INTEGER NOT NULL,
                FOREIGN KEY (id_empleado) REFERENCES Empleados(id),
                periodoInicio DATE,
                periodoFin DATE,
                salarioBruto DECIMAL(18,2),
                totalDescuentos DECIMAL(18,2),
                salarioNeto DECIMAL(18,2),
                createBy INTEGER NOT NULL,
                FOREIGN KEY (createBy) REFERENCES Usuarios(id) ON DELETE SET NULL,
                createdAt TIMESTAMP DEFAULT current_timestamp,
                updateBy INTEGER DEFAULT NULL,
                FOREIGN KEY (updateBy) REFERENCES Usuarios(id),
                updatedAt TIMESTAMP Default NULL,
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
async function createFunctionEmpleadosUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_empleados_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE Empleados
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_empleados_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_empleados_update_function:', error);
        throw new Error('Failed to fetch trg_empleados_update_function:');
    }
}
async function createTriggerEmpleadosUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_empleados_update
            AFTER UPDATE
            ON Empleados
            FOR EACH ROW
            EXECUTE PROCEDURE trg_empleados_update_function();
        `;
        console.log(`created "trg_empleados_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_empleados_update:', error);
        throw new Error('Failed to fetch trg_empleados_update.');
    }
};

async function createFunctionPagosUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_pagos_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE Pagos
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_pagos_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_pagos_update_function:', error);
        throw new Error('Failed to fetch trg_pagos_update_function:');
    }
}
async function createTriggerPagosUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_pagos_update
            AFTER UPDATE
            ON Pagos
            FOR EACH ROW
            EXECUTE PROCEDURE trg_pagos_update_function();
        `;
        console.log(`created "trg_pagos_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_pagos_update:', error);
        throw new Error('Failed to fetch trg_pagos_update.');
    }
};

async function createFunctionDescuentosUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_descuentos_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE Descuentos
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_descuentos_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_descuentos_update_function:', error);
        throw new Error('Failed to fetch trg_descuentos_update_function:');
    }
};
async function createTriggerDescuentosUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_descuentos_update
            AFTER UPDATE
            ON Descuentos
            FOR EACH ROW
            EXECUTE PROCEDURE trg_descuentos_update_function();
        `;
        console.log(`created "trg_descuentos_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_descuentos_update:', error);
        throw new Error('Failed to fetch trg_descuentos_update.');
    }
};
async function createFunctionHorasExtrasUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_horas_extras_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE HorasExtras
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_horas_extras_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_horas_extras_update_function:', error);
        throw new Error('Failed to fetch trg_horas_extras_update_function:');
    }
};
async function createTriggerHorasExtrasUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_horas_extras_update
            AFTER UPDATE
            ON HorasExtras
            FOR EACH ROW
            EXECUTE PROCEDURE trg_horas_extras_update_function();
        `;
        console.log(`created "trg_horas_extras_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_horas_extras_update:', error);
        throw new Error('Failed to fetch trg_horas_extras_update.');
    }
};
async function createFunctionIndemnizacionesUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_indemnizaciones_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE Indemnitizaciones
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_indemnizaciones_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_indemnizaciones_update_function:', error);
        throw new Error('Failed to fetch trg_indemnizaciones_update_function:');
    }
};
async function createTriggerIndemnizacionesUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_indemnizaciones_update
            AFTER UPDATE
            ON Indemnitizaciones
            FOR EACH ROW
            EXECUTE PROCEDURE trg_indemnizaciones_update_function();
        `;
        console.log(`created "trg_indemnizaciones_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_indemnizaciones_update:', error);
        throw new Error('Failed to fetch trg_indemnizaciones_update.');
    }
};
async function createFunctionLiquidacionesUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_liquidaciones_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE Liquidaciones
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_liquidaciones_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_liquidaciones_update_function:', error);
        throw new Error('Failed to fetch trg_liquidaciones_update_function:');
    }
};
async function createTriggerLiquidacionesUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_liquidaciones_update
            AFTER UPDATE
            ON Liquidaciones
            FOR EACH ROW
            EXECUTE PROCEDURE trg_liquidaciones_update_function();
        `;
        console.log(`created "trg_liquidaciones_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_liquidaciones_update:', error);
        throw new Error('Failed to fetch trg_liquidaciones_update.');
    }
};

async function createFunctionControlPagosUpdate(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_control_pagos_update_function()
                RETURNS TRIGGER AS $$
                BEGIN
                    UPDATE ControlPagos
                    SET updatedAt = current_timestamp
                    WHERE id = NEW.id;
                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            `;
            console.log(`created "trg_control_pagos_update_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_control_pagos_update_function:', error);
        throw new Error('Failed to fetch trg_control_pagos_update_function:');
    }
};
async function createTriggerControlPagosUpdate(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_control_pagos_update
            AFTER UPDATE
            ON ControlPagos
            FOR EACH ROW
            EXECUTE PROCEDURE trg_control_pagos_update_function();
        `;
        console.log(`created "trg_control_pagos_update" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_control_pagos_update:', error);
        throw new Error('Failed to fetch trg_control_pagos_update.');
    }

};
/**
 * TODO: ejemplo de funciones y triggers de insert en la tabla Empleados
 */
// async function createFunctionEmpleadosInsert(client) {
//     try {
//         const response = await client.sql`
//             CREATE OR REPLACE FUNCTION trg_empleados_insert_function()
//                 RETURNS TRIGGER AS $$
//                 BEGIN
//                     UPDATE Empleados
//                     SET createdAt = current_timestamp
//                     WHERE id = NEW.id;
//                     RETURN NEW;
//                 END;
//                 $$ LANGUAGE plpgsql;
//             `;
//             console.log(`created "trg_empleados_insert_function" function`);
//         return response;
//     }catch (error) {
//         console.error('Error al crear trg_Empleados_Insert_function:', error);
//         throw new Error('Failed to fetch trg_empleados_insert_function:');
//     }
// };

// async function createTriggerEmpleadosInsert(client){
//     try {
//         const response = await client.sql`
//             CREATE TRIGGER trg_empleados_insert
//             AFTER INSERT
//             ON Empleados
//             FOR EACH ROW
//             EXECUTE PROCEDURE trg_empleados_insert_function();
//         `;
//         console.log(`created "trg_Empleados_Insert" trigger`);
//     return response;
//     }catch (error) {
//         console.error('Error al crear trg_empleados_insert:', error);
//         throw new Error('Failed to fetch trg_empleados_insert.');
//     }
// };

async function main(){
    const client = await db.connect();
    await seedCreateRoles(client);
    await seedCreateUsuarios(client);
    await seedCreateDepartamentosEmpresa(client);
    await seedCreateProfesiones(client);
    await seedCreatePais(client);
    await seedCreateDepartamentoPais(client);
    await seedCreateMunicipios(client);
    await seedCreateEmpleados(client);
    await seedCreatePagos(client);
    await seedCreateDescuentos(client);
    await seedCreateHorasExtras(client);
    await seedCreateIndemnizaciones(client);
    await seedCreateLiquidaciones(client);
    await seedCreateControlPagos(client);
    //funciones y triggers para actualizar las tablas
    await createFunctionEmpleadosUpdate(client);
    await createTriggerEmpleadosUpdate(client);
    await createFunctionPagosUpdate(client);
    await createTriggerPagosUpdate(client);
    await createFunctionDescuentosUpdate(client);
    await createTriggerDescuentosUpdate(client);
    await createFunctionHorasExtrasUpdate(client);
    await createTriggerHorasExtrasUpdate(client);
    await createFunctionIndemnizacionesUpdate(client);
    await createTriggerIndemnizacionesUpdate(client);
    await createFunctionLiquidacionesUpdate(client);
    await createTriggerLiquidacionesUpdate(client);
    await createFunctionControlPagosUpdate(client);
    await createTriggerControlPagosUpdate(client);
    //funciones y triggers para insertar en la tabla Empleados
    // await createFunctionEmpleadosInsert(client);
    // await createTriggerEmpleadosInsert(client);
    await client.end();
};
main().catch((error) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        error,
    );
});

