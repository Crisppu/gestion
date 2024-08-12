import { getAllDepartamentsCuontriesController } from "@/controllers/DepartamentosPaisController";

const getAllDepartamentsCuontriesRequest = async (req, res) => {
    if (req.method === 'GET') {
      await getAllDepartamentsCuontriesController(req, res);
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`) // Método no permitido
    }
};
export default getAllDepartamentsCuontriesRequest;
