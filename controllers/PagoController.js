import { getAllPayments } from "@/models/Pago";

export default async function getAllPaymentsController (req, res)  {
    try {
      const payments = await getAllPayments();
      if(!payments.rows.length){
        res.status(200).json({ message: 'No hay ningun registro de pagos', data: [] });
      }
      res.status(200).json({ message: 'Todos los pagos', data: payments.rows });

    } catch (error) {
      res.status(500).json({mensgge:'Error al mostrar todos los pagos', error: error });
    }
};