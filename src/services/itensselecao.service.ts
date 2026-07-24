import { supabase } from '../lib/supabase'

import type { HinoSelecionado } from '../types/HinoSelecionado'

export async function salvarItensSelecao(
  selecaoId: string,
  hinos: HinoSelecionado[]
): Promise<void> {

  const itens = hinos.map((hino) => ({

    selecao_id: selecaoId,

    hino: hino.nome,

    versao: hino.versao.nome

  }))

  const { error } = await supabase
    .from('itens_selecao')
    .insert(itens)

  if (error) {
    throw error
  }

}