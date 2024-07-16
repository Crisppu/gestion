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
    const user = await getUserByEmail(correo);
    //console.log(user,'controll');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }

};

























