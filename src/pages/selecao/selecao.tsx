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
import generateId from '../../utils/generateid'
import { useNavigate } from 'react-router-dom'
import { salvarSelecao } from '../../utils/storage'
import { useContext } from 'react'
import { identificacaocontext } from '../../contexts/identificacao/identificacaocontext'

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
    const [editingItemId, setEditingItemId] = useState<string | null>(null)
    const [hinosSelecionados, setHinosSelecionados] = useState<HinoSelecionado[]>([])
    const [floatingExpandido, setFloatingExpandido] = useState(false)
    const [floatingMensagem, setFloatingMensagem] = useState<string | undefined>(undefined)
    const floatingSelectionTimer = useRef<number | null>(null)
    const [selectionSheetAberto, setSelectionSheetAberto] = useState(false)
    const navigate = useNavigate()
    const { identificacao } = useContext(identificacaocontext)

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

function fecharBottomSheet() {
    setBottomSheetAberto(false)
    setHinoSelecionado(null)
    setEditingItemId(null)
    setBottomSheetModo('add')
}

function selecionarHino(versao: string) {
    if (!hinoSelecionado) return

    if (bottomSheetModo === 'add') {
        setHinosSelecionados((lista) => [
            ...lista,
            {
                itemId: generateId(),

                hinoId: hinoSelecionado.id,

                nome: hinoSelecionado.nome,

                autor: hinoSelecionado.autor,

                versao:

                    hinoSelecionado.versoes.find(

                        (item) => item.nome === versao

                    )!,

                versoes: hinoSelecionado.versoes,

            },
        ])

        setFloatingMensagem('Hino adicionado')
        setFloatingExpandido(true)
        fecharBottomSheet()
    } else {

        if (editingItemId == null) return

        setHinosSelecionados((lista) =>
    lista.map((item) => {

        if (item.itemId !== editingItemId) {

            return item

        }

        const versaoSelecionada = item.versoes.find(
            (versaoItem) => versaoItem.nome === versao
        )

        if (!versaoSelecionada) {
            return item
        }

        return {
            ...item,
            versao: versaoSelecionada
        }

    })
)

        fecharBottomSheet()

        setFloatingMensagem('Versão atualizada')
        setFloatingExpandido(true)

    }
}

function trocarVersao(itemId: string) {
    const itemSelecionado = hinosSelecionados.find((item) => item.itemId === itemId)

    if (!itemSelecionado) return

    const hinoOriginal = hinos.find((h) => h.id === itemSelecionado.hinoId)

    if (!hinoOriginal) return

    setEditingItemId(itemId)
    setHinoSelecionado(hinoOriginal)
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
                                    setEditingItemId(null)

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
                        onFechar={fecharBottomSheet}
                    />

{

    hinosSelecionados.length > 0 && (

        <FloatingSelection

            mensagem={floatingMensagem}

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

    if (hinosSelecionados.length === 0) {

        alert('Selecione pelo menos um hino.')

        return

    }

    salvarSelecao({

        data: new Date().toISOString(),

        hinos: hinosSelecionados

    })

    navigate('/success')

}

    }}

    cardActions={{

        onTrocarVersao: (itemId: string) => {
            trocarVersao(itemId)
        },

        onSelecionarVersao: (itemId: string, versao: string) => {

            setHinosSelecionados((lista) =>
                lista.map((hino) => {
                    if (hino.itemId !== itemId) {
                        return hino
                    }

                    const versaoSelecionada = hino.versoes.find(
                        (versaoItem) => versaoItem.nome === versao
                    )

                    if (!versaoSelecionada) {
                        return hino
                    }

                    return {
                        ...hino,
                        versao: versaoSelecionada,
                    }
                })
            )

            setFloatingMensagem('Versão atualizada')
            setFloatingExpandido(true)
        },

        onRemover: (itemId: string) => {

            setHinosSelecionados((lista) => {

                const novaLista = lista.filter((hino) => hino.itemId !== itemId)

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