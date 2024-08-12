import TablaPagos from '@/components/Tablas/TablaPagos'
import { fetchAllPayments } from '@/services/PagoService/PagoApiService'
import React from 'react'

export default async function PagosPage() {
    const dataPagos = await fetchAllPayments();
    //console.log(dataPagos)
    return (
        <TablaPagos dataPagos={dataPagos.data}></TablaPagos>
    )
}

