import { supabase } from '../lib/supabase'

type Participante = {
  primeiroNome: string
  sobrenome: string
  cargo: string
  congregacao: string
}

export async function obterOuCriarParticipante(
  participante: Participante
): Promise<string> {

  const nome = `${participante.primeiroNome} ${participante.sobrenome}`

  // Procura participante existente
  const { data: existente, error: erroBusca } = await supabase
    .from('participantes')
    .select('id')
    .eq('nome', nome)
    .eq('cargo', participante.cargo)
    .eq('congregacao', participante.congregacao)
    .maybeSingle()

  if (erroBusca) {
    throw erroBusca
  }

  if (existente) {
    return existente.id
  }

  // Cadastra novo participante
  const { data: novoParticipante, error: erroCadastro } = await supabase
    .from('participantes')
    .insert({
      nome,
      cargo: participante.cargo,
      congregacao: participante.congregacao
    })
    .select('id')
    .single()

  if (erroCadastro) {
    throw erroCadastro
  }

  return novoParticipante.id
}