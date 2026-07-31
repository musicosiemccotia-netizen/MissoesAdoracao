// =======================================================
// IMPORTS
// =======================================================

import { useEffect, useRef, useState } from 'react'

import background from '../../assets/images/background/background.png'
import logo from '../../assets/images/selecao/logo.png'
import { buscarHinos } from '../../services/hinos.service'
import CardHino from '../../components/CardHino/CardHino'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import FloatingSelection from '../../components/FloatingSelection/FloatingSelection'
import SelectionSheet from '../../components/selectionsheet/selectionsheet'
import generateId from '../../utils/generateid'
import { useNavigate } from 'react-router-dom'
import { salvarSelecao } from '../../services/salvarselecao.service'

import { useContext } from 'react'
import { identificacaocontext } from '../../contexts/identificacao/identificacaocontext'
import { selectioncontext } from '../../contexts/selectioncontext/selectioncontext'
import type { Hino } from '../../types/hino'

import './selecao.css'

// =======================================================
// COMPONENTE
// =======================================================

function Selecao() {

// =======================================================
// ESTADOS
// =======================================================

    const [pesquisa, setPesquisa] = useState('')
    const [hinos, setHinos] = useState<Hino[]>([])
    const [pesquisando, setPesquisando] = useState(false)
    const [bottomSheetAberto, setBottomSheetAberto] = useState(false)
    const [hinoSelecionado, setHinoSelecionado] =
    useState<Hino | null>(null)
    const [bottomSheetModo, setBottomSheetModo] = useState<'add' | 'edit'>('add')
    const [editingItemId, setEditingItemId] = useState<string | null>(null)
    const { hinosSelecionados, setHinosSelecionados } = useContext(selectioncontext)
    const [floatingExpandido, setFloatingExpandido] = useState(false)
    const [floatingMensagem, setFloatingMensagem] = useState<string | undefined>(undefined)
    const floatingSelectionTimer = useRef<number | null>(null)
    const [selectionSheetAberto, setSelectionSheetAberto] = useState(false)
    const navigate = useNavigate()
    const { identificacao } = useContext(identificacaocontext)
    const [enviando, setEnviando] = useState(false)
    

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

                versao: hinoSelecionado.versoes.find(
                    (item: any) => item.nome === versao
                )!,

                versoes: hinoSelecionado.versoes,
            },
        ])

        setFloatingMensagem('Hino adicionado')
        setFloatingExpandido(true)

        setPesquisa('')
        setHinos([])

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

        setPesquisa('')
        setHinos([])

        setFloatingMensagem('Versão atualizada')
        setFloatingExpandido(true)

    }
}

function trocarVersao(itemId: string) {
    const itemSelecionado = hinosSelecionados.find(
        (item) => item.itemId === itemId
    )

    if (!itemSelecionado) return

    setEditingItemId(itemId)

    setHinoSelecionado({
        id: itemSelecionado.hinoId,
        nome: itemSelecionado.nome,
        autor: itemSelecionado.autor,
        categoria: '',
        versoes: itemSelecionado.versoes
    })

    setBottomSheetModo('edit')
    setBottomSheetAberto(true)
}
        
    // =======================================================
    // DADOS
    // =======================================================

    useEffect(() => {
    if (pesquisa.trim().length < 3) {
        setHinos([])
        return
    }

    const timeout = setTimeout(async () => {
        try {
            const resultado = await buscarHinos(pesquisa)
            setHinos(resultado)
        } catch (error) {
            console.error(error)
        }
    }, 300)

    return () => clearTimeout(timeout)
}, [pesquisa])

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

                        hinos.map((hino) => (

                            <CardHino
                                key={hino.id}
                                nome={hino.nome}
                                autor={hino.autor}
                                versao="Selecionar versão"
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

    enviando={enviando}

    actions={{

        onFechar: () => {

            setSelectionSheetAberto(false)

        },

        onConcluir: async () => {

        if (enviando) {
            return
        }

        if (hinosSelecionados.length === 0) {

        alert('Selecione pelo menos um hino.')

        return

    }

try {

    setEnviando(true)

    // Permite que o React renderize o botão antes da requisição
    await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
    )

    const resultado = await salvarSelecao({

        participante: {

            primeiroNome: identificacao.primeiroNome,

            sobrenome: identificacao.sobrenome,

            cargo: identificacao.cargo,

            congregacao: identificacao.congregacao

        },

        culto: identificacao.culto,

        data: new Date().toISOString(),

        hinos: hinosSelecionados

    })

    navigate('/success', {
        state: {
            dataSelecao: resultado.dataSelecao
        }
    })

} catch (error) {

            console.error(error)

            alert('Não foi possível salvar sua seleção. Tente novamente.')

            setEnviando(false)

        }

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