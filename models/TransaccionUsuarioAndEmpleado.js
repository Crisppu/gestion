import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt'

export async function createUserAndEmployee(data){
    const hashedPassword = await bcrypt.hash(data.contrasenia, 10);
    console.log(data);
    console.log(hashedPassword);
    const response = await sql`SELECT agregar_usuario_y_empleado(
        ${data.cui},
        ${data.nit},
        ${data.nombre},
        ${data.apellido},
        ${data.id_municipio},
        ${data.direccion},
        ${data.telefono},
        ${data.genero},
        ${data.fecha_nacimiento},
        ${data.estado_civil},
        ${data.id_profesion},
        ${data.salario_base},
        ${data.posicion},
        ${data.fecha_contratacion},
        ${data.correo},
        ${hashedPassword},
        ${data.id_rol},
        ${data.createBy}
        );`
    return response;
}
