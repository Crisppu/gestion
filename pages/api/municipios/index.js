import { getAllMunicipiosController } from "@/controllers/MunicipiosController";

const getAllMunicipiosRequest = async (req, res) => {
    if (req.method === 'GET') {
      await getAllMunicipiosController(req, res);
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`) // Método no permitido
    }
};
export default getAllMunicipiosRequest;