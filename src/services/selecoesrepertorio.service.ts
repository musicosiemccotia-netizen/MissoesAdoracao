import { supabase } from '../lib/supabase'

type CriarSelecaoRepertorio = {
  participanteId: string
  culto: string
  data: string
}

type SelecaoCriada = {
  id: string
  dataSelecao: string
}

export async function criarSelecaoRepertorio(
  selecao: CriarSelecaoRepertorio
): Promise<SelecaoCriada> {

  const { data, error } = await supabase
    .from('selecoes_repertorio')
    .insert({
      participante_id: selecao.participanteId,
      culto: selecao.culto,
      data_selecao: selecao.data
    })
    .select('id, data_selecao')
    .single()

  if (error) {
    throw error
  }

  return {
    id: data.id,
    dataSelecao: data.data_selecao
  }
}