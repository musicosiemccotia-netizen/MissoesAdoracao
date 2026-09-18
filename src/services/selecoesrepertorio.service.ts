import { supabase } from '../lib/supabase'

type CriarSelecaoRepertorio = {
  participanteId: string
  grupoMinisterioId: string | null
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
      grupo_ministerio_id: selecao.grupoMinisterioId,
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