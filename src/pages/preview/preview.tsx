import SelectionReceipt from '../../components/selectionreceipt'

import type { HinoSelecionado } from '../../types/HinoSelecionado'

import './preview.css'

import { useRef } from 'react'

import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

import ReceiptDownload, {
    type ReceiptDownloadRef
} from '../../components/receiptdownload/ReceiptDownload'

const identificacao = {

    primeiroNome: 'Daniel',

    sobrenome: 'Oliveira Santos',

    cargo: 'Missionário',

    congregacao: 'Congregação Cotia',

    culto: 'Missões'

}

const hinos: HinoSelecionado[] = [

    {
        itemId: '1',

        hinoId: '1',

        nome: 'Bondade de Deus',

        autor: 'Jenn Johnson',

        versao: {
            id: '1',
            nome: 'Original',
            tom: 'G',
            bpm: 72,
            letra: '',
            cifra: '',
            youtube: '',
            spotify: '',
            deezer: '',
            audio: '',
            appleMusic: '',
            observacao: ''
        },

        versoes: [
            {
                id: '1',
                nome: 'Original',
                tom: 'G',
                bpm: 72,
                letra: '',
                cifra: '',
                youtube: '',
                spotify: '',
                deezer: '',
                audio: '',
                appleMusic: '',
                observacao: ''
            }
        ]

    },

    {
        itemId: '2',

        hinoId: '2',

        nome: 'Deus Proverá',

        autor: 'Gabriela Gomes',

        versao: {
            id: '2',
            nome: 'Ao Vivo',
            tom: 'A',
            bpm: 74,
            letra: '',
            cifra: '',
            youtube: '',
            spotify: '',
            deezer: '',
            audio: '',
            appleMusic: '',
            observacao: ''
        },

        versoes: [
            {
                id: '2',
                nome: 'Ao Vivo',
                tom: 'A',
                bpm: 74,
                letra: '',
                cifra: '',
                youtube: '',
                spotify: '',
                deezer: '',
                audio: '',
                appleMusic: '',
                observacao: ''
            }
        ]

    }

]

function Preview() {

    const previewReceiptRef = useRef<HTMLDivElement>(null)

    const receiptDownloadRef = useRef<ReceiptDownloadRef>(null)

    async function baixarSelecao() {

        await receiptDownloadRef.current?.baixar()

    }

useEffect(() => {

    async function testarConexao() {

        const { data, error } = await supabase
            .from('hinos')
            .select('*')

        console.log('Dados:', data)

        console.log('Erro:', error)

    }

    testarConexao()

}, [])

    return (

       <main className="preview">

    <button onClick={baixarSelecao}>

        Baixar seleção

    </button>

    <SelectionReceipt
        ref={previewReceiptRef}
        identificacao={identificacao}
        hinos={hinos}
    />

    <ReceiptDownload

    ref={receiptDownloadRef}

    identificacao={identificacao}

    hinos={hinos}

/>

</main>

    )

}

export default Preview