import { supabase } from '../lib/supabase'

import type { HinoSelecionado } from '../types/hinoselecionado'

export async function salvarItensSelecao(
    selecaoId: string,
    hinos: HinoSelecionado[]
): Promise<void> {

    const itens = hinos.map((hino) => ({

        selecao_id: selecaoId,

        hino: hino.nome,

        versao: hino.versao.nome,

        link_youtube: hino.versao.youtube || null,

        pendente_cadastro: hino.pendenteCadastro ?? false

    }))

    const { error } = await supabase
        .from('itens_selecao')
        .insert(itens)

    if (error) {
        throw error
    }

}