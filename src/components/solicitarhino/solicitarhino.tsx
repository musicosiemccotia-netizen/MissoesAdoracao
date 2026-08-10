import { useState } from 'react'

import './solicitarhino.css'

type Props = {
    aberto: boolean

    onAdicionar: (
        nomeHino: string,
        nomeVersao: string,
        youtube: string
    ) => void

    onFechar: () => void
}

function SolicitarHino({
    aberto,
    onAdicionar,
    onFechar
}: Props) {

    if (!aberto) {
        return null
    }

    const [nomeHino, setNomeHino] = useState('')
    const [nomeVersao, setNomeVersao] = useState('')
    const [youtube, setYoutube] = useState('')

    const [erro, setErro] = useState('')

    function adicionar() {

        const hinoVazio = nomeHino.trim() === ''
        const versaoVazia = nomeVersao.trim() === ''

        if (hinoVazio || versaoVazia) {

            setErro(
                'Informe o nome do hino e o nome da versão para continuar.'
            )

            return
        }

        setErro('')

        onAdicionar(
            nomeHino.trim(),
            nomeVersao.trim(),
            youtube.trim()
        )
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
                    Não encontrou o hino?
                </h2>

                <p className="solicitarhino-subtitulo">
                    Informe os dados abaixo para adicionar
                    este hino à sua seleção.
                </p>

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
                    Adicionar à minha seleção
                </button>

            </div>

        </div>

    )
}

export default SolicitarHino