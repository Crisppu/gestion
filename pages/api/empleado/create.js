import { createEmployeeController } from "@/controllers/EmpleadoController";

//post
const createEmployeeRequest = async (req, res) => {
    if (req.method === 'POST') {
      await createEmployeeController(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
};

export default createEmployeeRequest;

