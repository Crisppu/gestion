import { getAllProfessionsController } from "@/controllers/ProfesionesController";

const getAllProfessionsRequest = async (req, res) => {
    if (req.method === 'GET') {
      await getAllProfessionsController(req, res);
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`) // Método no permitido
    }
};
export default getAllProfessionsRequest;