import { supabase } from '../lib/supabase'

export async function buscarSelecoes() {

    const hoje = new Date()

    const primeiroDia = new Date(hoje)
    primeiroDia.setDate(hoje.getDate() - hoje.getDay() + 1)
    primeiroDia.setHours(0, 0, 0, 0)

    const ultimoDia = new Date(primeiroDia)
    ultimoDia.setDate(primeiroDia.getDate() + 6)
    ultimoDia.setHours(23, 59, 59, 999)

    const { data: selecoes, error: erroSelecoes } = await supabase
        .from('selecoes_repertorio')
        .select('*')
        .gte('data_selecao', primeiroDia.toISOString())
        .lte('data_selecao', ultimoDia.toISOString())
        .order('data_selecao', { ascending: false })

    if (erroSelecoes) throw erroSelecoes

    const { data: participantes, error: erroParticipantes } = await supabase
        .from('participantes')
        .select('*')

    if (erroParticipantes) throw erroParticipantes

    const { data: itens, error: erroItens } = await supabase
        .from('itens_selecao')
        .select('*')

    if (erroItens) throw erroItens

    return selecoes.map(selecao => ({

        ...selecao,

        participante: participantes.find(
            p => p.id === selecao.participante_id
        ),

        repertorio: itens.filter(
            i => i.selecao_id === selecao.id
        )

    }))

}