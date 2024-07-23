'use server'
import getAllPaymentsController from "@/controllers/PagoController";


const getAllPaymentsRequest = async (req, res) => {
    if (req.method === 'GET') {
      await getAllPaymentsController(req, res);
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`) // Método no permitido
    }
};
export default getAllPaymentsRequest;