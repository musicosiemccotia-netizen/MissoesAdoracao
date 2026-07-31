import { supabase } from '../lib/supabase'

interface Hino {
    id: string
    nome: string
    compositor: string
    categoria: string
}

export async function buscarHinosAleatorios() {
    const { data: hinos, error } = await supabase
        .rpc('buscar_hinos_aleatorios')

    if (error) throw error

    const listaHinos = (hinos ?? []) as Hino[]

    if (listaHinos.length === 0) {
        return []
    }

    const { data: versoes, error: erroVersoes } = await supabase
        .from('versoes')
        .select('*')
        .in(
            'hino_id',
            listaHinos.map((h) => h.id)
        )

    if (erroVersoes) throw erroVersoes

    return listaHinos.map((hino) => ({
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