export async function FunctionAgregarUsuario_y_empleado (client) {
    /**
    SELECT agregar_usuario_y_empleado(
    '1222222222222',
    '223456789',
    'Juan',
    'Perez',
    '3456789',
    'calle 123',
    1,
    1,
    '2023-01-01',
    1,
    1,
    3000,
    'nose',
    '2023-01-01',
    'criyattojin2@gmail.com',
    'perromon12',
    2);
    */
    try {
        await client.sql`CREATE OR REPLACE FUNCTION agregar_usuario_y_empleado(
        cui VARCHAR(50),
        nit VARCHAR(30),
        nombre VARCHAR(30),
        apellido VARCHAR(30),
        id_municipio INTEGER,
        direccion VARCHAR(50),
        telefono VARCHAR(20),
        genero INT,
        fecha_nacimiento DATE,
        estado_civil INT,
        id_profesion INTEGER,
        salario_base DECIMAL(10, 2),
        posicion VARCHAR(50),
        fecha_contratacion DATE,
        correo VARCHAR(30),
        contrasenia VARCHAR(80),
        id_rol INTEGER,
        createBy INTEGER
        )
        RETURNS VOID
        LANGUAGE plpgsql
        AS $$
        DECLARE
        id_usuario INTEGER;
        BEGIN
        -- Agregar usuario y obtener ID
        INSERT INTO Usuarios (correo, contrasenia)
        VALUES (correo, contrasenia)
        RETURNING id INTO id_usuario;

        -- Agregar empleado con el ID del usuario obtenido
        INSERT INTO Empleados (cui, nit, nombre, apellido,id_municipio, direccion, telefono, genero, fecha_nacimiento, estado_civil, id_profesion, salario_base, posicion, fecha_contratacion, id_rol, id_usuario, createBy)
        VALUES (cui, nit, nombre, apellido,id_municipio, direccion, telefono, genero, fecha_nacimiento, estado_civil, id_profesion, salario_base, posicion, fecha_contratacion, id_rol, id_usuario, createBy);

        EXCEPTION
        WHEN OTHERS THEN
            -- Revertir la transacción en caso de error
            ROLLBACK;
            RAISE;
        END;
        $$;
        `
        console.log(`created "agregar_usuario_y_empleado" function`);
        return {createTable}
    }catch (error) {
        console.error('Error al crear agregar_usuario_y_empleado:', error);
        throw new Error('Failed to fetch agregar_usuario_y_empleado:');
    }

}
