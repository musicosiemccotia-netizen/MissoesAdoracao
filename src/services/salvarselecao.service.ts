import type { HinoSelecionado } from '../types/hinoselecionado'

import { obterOuCriarParticipante } from './participantes.service'
import { criarSelecaoRepertorio } from './selecoesrepertorio.service'
import { salvarItensSelecao } from './itensselecao.service'
import { buscarGrupoMinisterioId } from './gruposministerios.service'

type Participante = {
    primeiroNome: string
    sobrenome: string
    cargo: string
    congregacao: string
}

type SalvarSelecaoParams = {

    participante: Participante

    grupoMinisterio: string | null | undefined

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

    const grupoMinisterioId = params.grupoMinisterio
        ? await buscarGrupoMinisterioId(params.grupoMinisterio)
        : null

    const selecao =
        await criarSelecaoRepertorio({

            participanteId,

            grupoMinisterioId,

            culto: params.culto,

            data: params.data

        })

    await salvarItensSelecao(

        selecao.id,

        params.hinos

    )

    return {

        dataSelecao: selecao.dataSelecao

    }

}