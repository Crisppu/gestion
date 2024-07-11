
export async function createFunctionEmpleadosInsert(client) {
    try {
        const response = await client.sql`
            CREATE OR REPLACE FUNCTION trg_Empleados_Insert_function()
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
            console.log(`created "trg_Empleados_Insert_function" function`);
        return response;
    }catch (error) {
        console.error('Error al crear trg_Empleados_Insert_function:', error);
        throw new Error('Failed to fetch createFunctionInsert.');
    }
};
