import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useRef } from 'react'

import fundo from '../../assets/images/background/background-com-barra.png'

import './success.css'

import { selectioncontext } from '../../contexts/selectioncontext/selectioncontext'
import { identificacaocontext } from '../../contexts/identificacao/identificacaocontext'

import ReceiptDownload, {
    type ReceiptDownloadRef
} from '../../components/receiptdownload/ReceiptDownload'

function Success() {

    const navigate = useNavigate()
    
const location = useLocation()

const dataSelecao =
    location.state?.dataSelecao as string | undefined

console.log('location.state:', location.state)
console.log('dataSelecao:', dataSelecao)

const { identificacao } = useContext(identificacaocontext)

const { hinosSelecionados } = useContext(selectioncontext)

const receiptDownloadRef = useRef<ReceiptDownloadRef>(null)

    return (

        <div
    className="success"
    style={{ backgroundImage: `url(${fundo})` }}
>

    <div className="success-overlay" />

    <div className="success-content">

        <div className="success-icon">
            ✓
        </div>

        <h1>
            Seleção enviada!
        </h1>

        <p>
            Agradecemos por sua disponibilidade em
            servir ao Senhor através do louvor.
        </p>

        <p>
            Em breve você receberá as informações
            sobre os ensaios.
        </p>

        <div className="success-slogan">

            🌱 Missões por Cristo, Realizar! 

        </div>

        <button
            className="success-button"
            onClick={() => navigate('/')}
        >
            Voltar ao início
        </button>

        <button
    className="success-download"
    onClick={async () => {
        await receiptDownloadRef.current?.baixar()
    }}
>
    📄 Baixar meu repertório
</button>

    </div>

<ReceiptDownload
    ref={receiptDownloadRef}
    identificacao={identificacao}
    hinos={hinosSelecionados}
    dataSelecao={dataSelecao}
/>

</div>

    )

}

export default Success