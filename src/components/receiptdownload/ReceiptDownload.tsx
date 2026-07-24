import {
    forwardRef,
    useImperativeHandle,
    useRef
} from 'react'

import { toPng } from 'html-to-image'

import SelectionReceipt from '../selectionreceipt'

import type { identificacao } from '../../types/identificacao'
import type { HinoSelecionado } from '../../types/HinoSelecionado'



type ReceiptDownloadProps = {

    identificacao: identificacao

    hinos: HinoSelecionado[]

    dataSelecao?: string

}

export type ReceiptDownloadRef = {

    baixar: () => Promise<void>

}

const ReceiptDownload = forwardRef<ReceiptDownloadRef, ReceiptDownloadProps>(({

    identificacao,
    hinos,
    dataSelecao

}, ref) => {

    const receiptRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({

        async baixar() {

    console.log('Entrou no baixar')

    console.log(receiptRef.current)

    if (!receiptRef.current) return

    const dataUrl = await toPng(receiptRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: '#fcfbf8'
    })

    console.log(dataUrl)

    const link = document.createElement('a')

    link.download = `Meu Repertório - ${identificacao.primeiroNome} ${identificacao.sobrenome}.png`

    link.href = dataUrl

    link.click()
}
    }))

return (
    <div
        style={{
            position: 'fixed',
            left: '-10000px',
            top: 0,
            pointerEvents: 'none'
        }}
    >
        <SelectionReceipt
            ref={receiptRef}
            identificacao={identificacao}
            hinos={hinos}
            dataSelecao={dataSelecao}
        />
    </div>
)

})

export default ReceiptDownload