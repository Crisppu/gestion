export async function FunctionAgregarUsuario_y_empleado (client) {
    try {
        await client.sql`CREATE OR REPLACE FUNCTION agregar_usuario_y_empleado(
        cui VARCHAR,
        nit VARCHAR,
        nombre VARCHAR,
        apellido VARCHAR,
        telefono VARCHAR,
        direccion VARCHAR,
        genero INT,
        fecha_nacimiento DATE,
        estado_civil INT,
        profesion VARCHAR,
        posicion VARCHAR,
        fecha_contratacion DATE,
        departamento VARCHAR,
        correo VARCHAR,
        contrasenia VARCHAR,
        id_rol UUID
        )
        RETURNS VOID
        LANGUAGE plpgsql
        AS $$
        DECLARE
        id_usuario UUID;
        BEGIN
        -- Agregar usuario y obtener ID
        INSERT INTO Usuarios (correo, contrasenia)
        VALUES (correo, contrasenia)
        RETURNING id INTO id_usuario;

        -- Agregar empleado con el ID del usuario obtenido
        INSERT INTO Empleados (cui, nit, nombre, apellido, telefono, direccion, genero, fecha_nacimiento, estado_civil, profesion, posicion, fecha_contratacion, departamento, id_rol, id_usuario)
        VALUES (cui, nit, nombre, apellido, telefono, direccion, genero, fecha_nacimiento, estado_civil, profesion, posicion, fecha_contratacion, departamento, id_rol, id_usuario);

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
