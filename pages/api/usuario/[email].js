'use server'
import { getUserByEmailHandler } from "@/controllers/UsuariosContoller";

const responde = async (req, res) => {
    if (req.method === 'GET') {
      await getUserByEmailHandler(req, res);
    } else {
      res.status(405).end(); // Método no permitido
    }
};
export default responde;