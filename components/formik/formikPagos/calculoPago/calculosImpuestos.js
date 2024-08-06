/**
 * Retorna el valor de un número entero con dos decimales
 * @param {*} number
 * @returns
*/
function customRound(number) {
    //aproximacion cifra
    return parseFloat(number.toFixed(2));
}
/**
 * Retorna el valor del impuesto mensual de la ISR para el salario base indicado.
 * @param {*} salarioBase
 * @returns
 */
export function CalculoMensualISR(salarioBase,deducciones) {
    const salarioAnual = (salarioBase - deducciones) * 12;
    let calculoImpuesto = 0;
    if(salarioAnual <= 30000){
       return salarioAnual * 0;
    }else if(salarioAnual > 30000 && salarioAnual <= 60000){
        calculoImpuesto = ((salarioAnual - 30000) * 0.05)/12;
        return customRound(calculoImpuesto);
    }else if(salarioAnual >  60000){
        calculoImpuesto = (1500+((salarioAnual - 60000) * 0.10))/12;
        return customRound(calculoImpuesto);
    }
}

export function Deducciones(salarioBase) {
    const IGSS = 0.0483;
    const IRTRA = 0.01;
    const INTECAP = 0.01;
    const resultado = (customRound((salarioBase * IGSS)) + customRound((salarioBase * IRTRA)) + customRound((salarioBase * INTECAP)) );
    return customRound(resultado);
}

export function CalculoHorasExtrasEnDia(salarioBase, jornada) {

    if(jornada === 'diurna'){
        //30=mes, 8= horas/dia,150% de horas extras por ley
        return customRound(((salarioBase / 30)/8)*1.5);

    }else if(jornada === 'nocturna'){
        //30=mes, 8= horas/dia, 200% de horas extras por ley
        return customRound(((salarioBase / 30)/6)*2);
    }
    else if(jornada === 'mixto'){
        //30=mes, 7= horas/dia, 150% de horas extras por ley
        return customRound(((salarioBase / 30)/7)*1.5);
    }
    else if(jornada === 'feriado'){
        //30=mes, 8= horas/dia, 200% de horas extras por ley
        return customRound(((salarioBase / 30)/8)*2);
    }
    else if(jornada === 'no'){
        //30=mes, 8= horas/dia, 200% de horas extras por ley
        return customRound(((salarioBase / 30)/8));
    }

}
