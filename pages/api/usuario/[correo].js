'use server'
import { getUserByEmailController } from "@/controllers/UsuarioContoller";

const userByEmailRequest = async (req, res) => {
    if (req.method === 'GET') {
      await getUserByEmailController(req, res);
    } else {
      res.status(405).end(); // Método no permitido
    }
};
export default userByEmailRequest;