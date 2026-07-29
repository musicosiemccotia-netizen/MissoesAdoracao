export function obterInicioSemana(data = new Date()): Date {

    const inicio = new Date(data)

    const dia = inicio.getDay()

    // Domingo = 0
    const diferenca = dia === 0
        ? -6
        : 1 - dia

    inicio.setDate(inicio.getDate() + diferenca)

    inicio.setHours(0, 0, 0, 0)

    return inicio

}

export function obterFimSemana(data = new Date()): Date {

    const fim = obterInicioSemana(data)

    fim.setDate(fim.getDate() + 6)

    // Domingo às 12:00
    fim.setHours(12, 0, 0, 0)

    return fim

}