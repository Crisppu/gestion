import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'
export async function createUserAndEmployee(data){
    const hashedPassword = await bcrypt.hash(data.contrasenia, 10);
    const response = await sql`SELECT agregar_usuario_y_empleado(
    ${data.cui},
    ${data.nit},
    ${data.nombre},
    ${data.apellido},
    ${data.telefono},
    ${data.direccion},
    ${data.genero},
    ${data.fecha_nacimiento},
    ${data.estado_civil},
    ${data.profesion},
    ${data.posicion},
    ${data.fecha_contratacion},
    ${data.departamento},
    ${data.correo},
    ${hashedPassword},
    ${data.id_rol}
    );`
    return response;
}
