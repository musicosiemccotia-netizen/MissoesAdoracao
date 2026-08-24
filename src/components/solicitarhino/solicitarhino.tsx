import { useState } from 'react'
import type { Hino } from '../../types/hino'

import './solicitarhino.css'

type Props = {
    aberto: boolean

    onAdicionar?: (
        nomeHino: string,
        nomeVersao: string,
        youtube: string
    ) => void

    onAdicionarVersao?: (
        nomeVersao: string,
        youtube: string
    ) => void

    hinoExistente?: Hino | null

    onFechar: () => void
}

function SolicitarHino({
    aberto,
    onAdicionar,
    onAdicionarVersao,
    hinoExistente,
    onFechar
}: Props) {

    if (!aberto) {
        return null
    }

    const [nomeHino, setNomeHino] = useState('')
    const [nomeVersao, setNomeVersao] = useState('')
    const [youtube, setYoutube] = useState('')

    const [erro, setErro] = useState('')
    const solicitandoVersao = hinoExistente != null && onAdicionarVersao != null

    function adicionar() {

        const versaoVazia = nomeVersao.trim() === ''

        if ((!solicitandoVersao && nomeHino.trim() === '') || versaoVazia) {

            setErro(
                solicitandoVersao
                    ? 'Informe o nome da versão para continuar.'
                    : 'Informe o nome do hino e o nome da versão para continuar.'
            )

            return
        }

        setErro('')

        if (solicitandoVersao) {
            onAdicionarVersao(nomeVersao.trim(), youtube.trim())
            return
        }

        onAdicionar?.(nomeHino.trim(), nomeVersao.trim(), youtube.trim())
    }

    return (

        <div
            className="solicitarhino-overlay"
            onClick={onFechar}
        >

            <div
                className="solicitarhino"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="solicitarhino-handle"></div>

                <button
                    type="button"
                    className="solicitarhino-close"
                    onClick={onFechar}
                    aria-label="Fechar"
                >
                    ✕
                </button>

                <h2>
                    {solicitandoVersao
                        ? 'Solicitar nova versão'
                        : 'Não encontrou o hino?'}
                </h2>

                <p className="solicitarhino-subtitulo">
                    {solicitandoVersao
                        ? 'Informe os dados abaixo para solicitar uma nova versão.'
                        : 'Informe os dados abaixo para adicionar este hino à sua seleção.'}
                </p>

                {solicitandoVersao ? (
                    <div className="solicitarhino-campo">

                        <label>
                            Hino
                        </label>

                        <input
                            type="text"
                            value={hinoExistente.nome}
                            readOnly
                        />

                    </div>
                ) : (
                    <div className="solicitarhino-campo">

                    <label>
                        Nome do hino *
                    </label>

                    <input
                        type="text"
                        placeholder="Exemplo: Só Tu És Santo"
                        value={nomeHino}
                        onChange={(e) => {
                            setNomeHino(e.target.value)

                            if (e.target.value.trim() !== '') {
                                setErro('')
                            }
                        }}
                    />

                    </div>
                )}

                <div className="solicitarhino-campo">

                    <label>
                        Nome da versão *
                    </label>

                    <input
                        type="text"
                        placeholder="Exemplo: Ao Vivo"
                        value={nomeVersao}
                        onChange={(e) => {
                            setNomeVersao(e.target.value)

                            if (e.target.value.trim() !== '') {
                                setErro('')
                            }
                        }}
                    />

                </div>

                <div className="solicitarhino-campo">

                    <label>
                        Link do YouTube
                        <span> (opcional)</span>
                    </label>

                    <input
                        type="url"
                        placeholder="https://youtube.com/..."
                        value={youtube}
                        onChange={(e) =>
                            setYoutube(e.target.value)
                        }
                    />

                </div>

                {erro && (

                    <p className="solicitarhino-erro">
                        {erro}
                    </p>

                )}

                <button
                    type="button"
                    className="solicitarhino-adicionar"
                    onClick={adicionar}
                >
                    {solicitandoVersao
                        ? 'Solicitar versão'
                        : 'Adicionar à minha seleção'}
                </button>

            </div>

        </div>

    )
}

export default SolicitarHino