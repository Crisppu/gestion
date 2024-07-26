import TablaPagos from '@/components/Tablas/TablaPagos'
import { fetchAllPayments } from '@/services/PagoService/PagoApiService'
import React from 'react'

export default async function PagosPage() {
    const data = await fetchAllPayments();
    //console.log(data)
    return (
        <TablaPagos></TablaPagos>
    )
}

