'use server'

import { getUserByEmail } from "@/models/Usuario";

export const getUserByEmailHandler = async (req, res) => {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    //console.log(user,'controll');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }

};

























