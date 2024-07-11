
export async function createTriggerEmpleadosInsert(client){
    try {
        const response = await client.sql`
            CREATE TRIGGER trg_Empleados_Insert
            AFTER INSERT
            ON Empleados
            FOR EACH ROW
            EXECUTE PROCEDURE trg_Empleados_Insert_function();
        `;
    console.log(`created "trg_Empleados_Insert" trigger`);
    return response;
    }catch (error) {
        console.error('Error al crear trg_Empleados_Insert_trigger:', error);
        throw new Error('Failed to fetch createTriggerInsert.');
    }
}