import { createUserController } from "@/controllers/UsuarioContoller";

//post
const createUserRequest = async (req, res) => {
    if (req.method === 'POST') {
      await createUserController(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
};

export default createUserRequest;