// =======================================================
// IMPORTS
// =======================================================

import { useEffect, useRef, useState } from 'react'

import background from '../../assets/images/background/background.png'
import logo from '../../assets/images/selecao/logo.png'
import hinos from '../../data/hinos'
import CardHino from '../../components/CardHino/CardHino'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import type { HinoSelecionado } from '../../types/HinoSelecionado'
import FloatingSelection from '../../components/FloatingSelection/FloatingSelection'
import SelectionSheet from '../../components/selectionsheet/selectionsheet'

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
     const [bottomSheetModo, setBottomSheetModo] = useState<'add' | 'edit'>('add')
     const [editingSelectedId, setEditingSelectedId] = useState<number | null>(null)
    const [hinosSelecionados, setHinosSelecionados] = useState<HinoSelecionado[]>([])
    const [floatingExpandido, setFloatingExpandido] = useState(false)
    const floatingSelectionTimer = useRef<number | null>(null)
    const [selectionSheetAberto, setSelectionSheetAberto] = useState(false)

    // =======================================================
    // EFEITOS
    // =======================================================

    useEffect(() => {
        if (!floatingExpandido) {
            return
        }

        if (floatingSelectionTimer.current) {
            clearTimeout(floatingSelectionTimer.current)
        }

        floatingSelectionTimer.current = window.setTimeout(() => {
            setFloatingExpandido(false)
        }, 3000)

        return () => {
            if (floatingSelectionTimer.current) {
                clearTimeout(floatingSelectionTimer.current)
            }
        }
    }, [floatingExpandido])

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

function selecionarHino(versao: string) {
    if (!hinoSelecionado) return
    if (bottomSheetModo === 'add') {
        setHinosSelecionados((lista) => [
            ...lista,
            {
                id: hinoSelecionado.id,
                nome: hinoSelecionado.nome,
                autor: hinoSelecionado.autor,
                versao,
            },
        ])

        setBottomSheetAberto(false)
        setFloatingExpandido(true)
    } else {
        // edit mode: update versão do hino selecionado na lista
        if (editingSelectedId == null) return

        setHinosSelecionados((lista) =>
            lista.map((item) =>
                item.id === editingSelectedId ? { ...item, versao } : item
            )
        )

        setBottomSheetAberto(false)
        setEditingSelectedId(null)
        setBottomSheetModo('add')
    }
}

function trocarVersao(id: number) {
    const original = hinos.find((h) => h.id === id)
    if (!original) return

    setEditingSelectedId(id)
    setHinoSelecionado(original)
    setBottomSheetModo('edit')
    setBottomSheetAberto(true)
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
                                    setBottomSheetModo('add')
                                    setEditingSelectedId(null)

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
                        modo={bottomSheetModo}
                        onSelecionar={selecionarHino}
                        onFechar={() => {
                            setBottomSheetAberto(false)
                            setHinoSelecionado(null)
                            setEditingSelectedId(null)
                            setBottomSheetModo('add')
                        }}
                    />

{

    hinosSelecionados.length > 0 && (

        <FloatingSelection

    quantidade={hinosSelecionados.length}

    expandido={floatingExpandido}

    onAbrirSelecao={() => {

    setSelectionSheetAberto(true)

}}

/>

    )

}

<SelectionSheet

    aberto={selectionSheetAberto}

    hinos={hinosSelecionados}

    actions={{

        onFechar: () => {

            setSelectionSheetAberto(false)

        },

        onConcluir: () => {

            console.log('Concluir seleção')

        }

    }}

    cardActions={{

        onTrocarVersao: (id: number) => {
            trocarVersao(id)
        },

        onRemover: (id: number) => {

            setHinosSelecionados((lista) => {

                const novaLista = lista.filter((hino) => hino.id !== id)

                if (novaLista.length === 0) {

                    setSelectionSheetAberto(false)

                }

                return novaLista

            })

        }

    }}

/> 

          </main>

)

}

export default Selecao