import { getAllCountriesController } from "@/controllers/PaisController";


const getAllCountriesRequest = async (req, res) => {
    if (req.method === 'GET') {
      await getAllCountriesController(req, res);
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`) // Método no permitido
    }
};
export default getAllCountriesRequest;