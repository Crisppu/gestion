import createUserAndEmployeeController from "@/controllers/TransaccionUsuarioAndEmpleadoController";

//post
const createUserAndEmployeeRequest = async (req, res) => {
    if (req.method === 'POST') {
      await createUserAndEmployeeController(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
};

export default createUserAndEmployeeRequest;