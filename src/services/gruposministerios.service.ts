import { supabase } from '../lib/supabase'

export async function buscarGrupoMinisterioId(
  nome: string
): Promise<string> {
  const { data, error } = await supabase
    .from('grupos_ministerios')
    .select('id')
    .eq('nome', nome)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error(`Grupo/ministério não encontrado: ${nome}`)
  }

  return data.id
}