// =======================================================
// IMPORTS
// =======================================================

import { useState } from 'react'

import background from '../../assets/images/background/background.png'
import logo from '../../assets/images/selecao/logo.png'
import hinos from '../../data/hinos'
import CardHino from '../../components/CardHino/CardHino'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import type { HinoSelecionado } from '../../types/HinoSelecionado'

import './selecao.css'

// =======================================================
// COMPONENTE
// =======================================================

function Selecao() {

    // =======================================================
    // ESTADOS
    // =======================================================

    const [pesquisa, setPesquisa] = useState('')
    const [pesquisando, setPesquisando] = useState(false)
    const [bottomSheetAberto, setBottomSheetAberto] = useState(false)
    const [hinoSelecionado, setHinoSelecionado] = useState<
       typeof hinos[number] | null
    >(null)
      const [hinosSelecionados, setHinosSelecionados] = useState<HinoSelecionado[]>([])
    
    // =======================================================
    // FUNÇÕES
    // =======================================================

    function normalizarTexto(texto: string) {

    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()

}

function selecionarHino() {

    if (!hinoSelecionado) return

    setHinosSelecionados((lista) => [

        ...lista,

        {

            id: hinoSelecionado.id,

            nome: hinoSelecionado.nome,

            autor: hinoSelecionado.autor,

            versao: hinoSelecionado.versoes[0].nome

        }

    ])

    setBottomSheetAberto(false)

}
        
    // =======================================================
    // DADOS
    // =======================================================

    const hinosFiltrados = hinos.filter((hino) =>
       normalizarTexto(hino.nome).includes(
          normalizarTexto(pesquisa)
       )
    )

    // =======================================================
    // JSX
    // =======================================================

    return (

        <main className="selecao">

            <div
                className="selecao-background"
                style={{ backgroundImage: `url(${background})` }}
            ></div>

            <div
                className={`selecao-content ${pesquisando ? 'modo-pesquisa' : ''}`}
            >

                <img
                    src={logo}
                    alt="Logo"
                    className="selecao-logo"
                />

                <h1 className="titulo">
                    Seleção de Hinos
                </h1>

                <input
                    className="pesquisa"
                    type="text"
                    placeholder="Pesquisar hino..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    onFocus={() => setPesquisando(true)}
                    onBlur={() => {
                        if (pesquisa.trim() === '') {
                            setPesquisando(false)
                        }
                    }}
                />

                <div className="lista-hinos">

                    {
                        pesquisa.trim().length >= 3 &&

                        hinosFiltrados.map((hino) => (

                            <CardHino
                                key={hino.id}
                                nome={hino.nome}
                                autor={hino.autor}
                                versao={hino.versoes[0]?.nome ?? 'Original'}
                                onClick={() => {

                                    setHinoSelecionado(hino)

                                   setBottomSheetAberto(true)

                                }}
                            />

                        ))

                    }

                </div>

                    </div>

                    <BottomSheet
                        aberto={bottomSheetAberto}
                        hino={hinoSelecionado}
                        onSelecionar={selecionarHino}
                        onFechar={() => setBottomSheetAberto(false)}
                    />

{

    hinosSelecionados.length > 0 && (

        <div className="barra-selecao">

            <span>

                🎵 {hinosSelecionados.length} hino{hinosSelecionados.length > 1 ? 's' : ''} selecionado{hinosSelecionados.length > 1 ? 's' : ''}

            </span>

            <button>

                Ver seleção →

            </button>

        </div>

    )

}

          </main>

)

}

export default Selecao