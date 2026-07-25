import type { HinoSelecionado } from '../types/HinoSelecionado'

import { obterOuCriarParticipante } from './participantes.service'
import { criarSelecaoRepertorio } from './selecoesrepertorio.service'
import { salvarItensSelecao } from './itensselecao.service'

type Participante = {
    primeiroNome: string
    sobrenome: string
    cargo: string
    congregacao: string
}

type SalvarSelecaoParams = {

    participante: Participante

    culto: string

    data: string

    hinos: HinoSelecionado[]

}

type SalvarSelecaoResultado = {

    dataSelecao: string

}

export async function salvarSelecao(
    params: SalvarSelecaoParams
): Promise<SalvarSelecaoResultado> {

    const participanteId =
        await obterOuCriarParticipante(params.participante)

    const selecao =
        await criarSelecaoRepertorio({

            participanteId,

            culto: params.culto,

            data: params.data

        })

    await salvarItensSelecao(

        selecao.id,

        params.hinos

    )

console.log('salvarSelecao:', selecao)

    return {

        dataSelecao: selecao.dataSelecao

    }

}