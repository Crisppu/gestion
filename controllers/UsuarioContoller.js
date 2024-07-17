'use server'

import { getUserByEmail } from "@/models/Usuario";
//crud
//TODO: Create - controller
export const createUserController = async (req, res) => {
    const {correo, contrasenia} = req.body;
    try {
        const newUser = await createUser({
            correo,
            contrasenia
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un nuevo usuario' });
    }

};

//filtros
export const getUserByEmailController = async (req, res) => {
    const { correo } = req.query;

    try {
        const user = await getUserByEmail(correo);

        if(!user.rows.length){
            res.status(200).json({ message: 'Correo no encontrado', data: null  });
        }else{
            res.status(200).json({ message: 'Correo encontrado', data: user.rows[0] });
        }
    } catch (error) {
        res.status(500).json({message:'Error al obtener los datos del usuario', error: error });
    }

};

























