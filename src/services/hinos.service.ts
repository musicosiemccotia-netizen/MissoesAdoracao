import { supabase } from '../lib/supabase'

export async function buscarHinos(texto: string) {
  // Busca os hinos
  const { data: hinos, error: erroHinos } = await supabase
  .from('hinos')
  .select('*')
  .ilike('nome', `%${texto}%`)
  .order('nome')
  
  if (erroHinos) throw erroHinos

  if (!hinos || hinos.length === 0) {
    return []
  }

  // Busca as versões
  const { data: versoes, error: erroVersoes } = await supabase
    .from('versoes')
    .select('*')
    .in(
      'hino_id',
      hinos.map((h) => h.id)
    )

  if (erroVersoes) throw erroVersoes

  // Monta exatamente o formato esperado pelo Selecao.tsx
  
console.log(hinos)
console.log(versoes)
  
  return hinos.map((hino) => ({
    id: hino.id,
    nome: hino.nome,
    autor: hino.compositor,
    categoria: hino.categoria,

    versoes:
      versoes
        ?.filter((v) => v.hino_id === hino.id)
        .map((v) => ({
          id: v.id,
          nome: v.nome_versao,
          tom: v.tom,
          bpm: v.bpm,
          letra: v.link_letra,
          cifra: v.link_cifra,
          spotify: v.link_spotify,
          deezer: v.link_deezer,
          youtube: v.link_video,
          audio: v.link_audio,
          appleMusic: v.link_apple_music,
          observacao: v.observacao
        })) ?? []
  }))
}