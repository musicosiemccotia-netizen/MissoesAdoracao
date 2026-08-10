// =======================================================
// IMPORTS
// =======================================================

import { useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import fundo from '../../assets/images/background/background-com-barra.png'

import ReceiptDownload, {
    type ReceiptDownloadRef
} from '../../components/receiptdownload/receiptdownload'

import { identificacaocontext } from '../../contexts/identificacao/identificacaocontext'
import { selectioncontext } from '../../contexts/selectioncontext/selectioncontext'

import './success.css'

// =======================================================
// COMPONENTE
// =======================================================

function Success() {

    // =======================================================
    // HOOKS
    // =======================================================

    const navigate = useNavigate()
    const location = useLocation()

    const receiptDownloadRef = useRef<ReceiptDownloadRef>(null)

    // =======================================================
    // CONTEXTOS
    // =======================================================

    const {
        identificacao,
        setidentificacao
    } = useContext(identificacaocontext)

    const {
        hinosSelecionados,
        setHinosSelecionados
    } = useContext(selectioncontext)

    // =======================================================
    // DADOS
    // =======================================================

    const dataSelecao =
        location.state?.dataSelecao as string | undefined

    // =======================================================
    // JSX
    // =======================================================

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
                    onClick={() => {

                        setHinosSelecionados([])

                        setidentificacao({
                            primeiroNome: '',
                            sobrenome: '',
                            cargo: '',
                            congregacao: '',
                            culto: ''
                        })

                        navigate('/')

                    }}
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