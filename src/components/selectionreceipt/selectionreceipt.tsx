import { forwardRef } from 'react'

import './selectionreceipt.css'

import type { identificacao } from '../../types/identificacao'
import type { HinoSelecionado } from '../../types/HinoSelecionado'
import logo from '../../assets/images/home/logo.png'

type SelectionReceiptProps = {

    identificacao: identificacao

    hinos: HinoSelecionado[]

    dataSelecao?: string

    exportMode?: boolean

}

const SelectionReceipt = forwardRef<HTMLDivElement, SelectionReceiptProps>(({

    identificacao,
    hinos,
    dataSelecao,
    exportMode = false

}, ref) => {

const partesCulto = identificacao.culto.match(/^(.*)\s+\((.*)\)$/)

const dataFormatada = dataSelecao
    
    ? new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      })
          .format(new Date(dataSelecao))
          .replace(',', ' •')
    : ''

    return (

        <div
            ref={ref}
            className={`selection-receipt ${exportMode ? 'selection-receipt-export' : ''}`}
        >

            <div className="receipt-header-divider"></div>

            <header className="receipt-header">

    <img
        src={logo}
        alt="Missões Adoração"
        className="receipt-logo"
    />

    <h1 className="receipt-app-name">

        MISSÕES ADORAÇÃO

    </h1>

    <p className="receipt-subtitle">

        Comprovante de Seleção

    </p>

</header>

            <section className="receipt-info">

                <div className="receipt-block">

                    <span className="receipt-label">

                        {identificacao.cargo.toUpperCase()}

                    </span>

                    <h1 className="receipt-name">

                        {identificacao.primeiroNome} {identificacao.sobrenome}

                    </h1>

                </div>

                <div className="receipt-row">

    <div className="receipt-block">

        <span className="receipt-label">
            CONGREGAÇÃO
        </span>

        <h2 className="receipt-value">
            {identificacao.congregacao}
        </h2>

    </div>

    <div className="receipt-block">

        <span className="receipt-label">
            CULTO
        </span>

        <h2
            className="receipt-culto-value">

            {partesCulto ? (
                <>
                    {partesCulto[1]}
                    <br />
                    <span className="receipt-culto-complemento">
                        ({partesCulto[2]})
                    </span>
                </>
            ) : (
                identificacao.culto
            )}

        </h2>

    </div>

</div>

                <div className="receipt-block">

                    <span className="receipt-date-label">

                        Selecionado em

                    </span>

                    <p className="receipt-date">

                        {dataFormatada}

                    </p>

                </div>

            </section>

            <div className="receipt-divider"></div>

            <section className="receipt-songs">

                <span className="receipt-title">

                    REPERTÓRIO
                </span>

                <div className="receipt-list">

                    {hinos.map((hino) => (

                        <div
                            key={hino.itemId}
                            className="receipt-song"
                        >

                            <strong>

                                {hino.nome}

                            </strong>

                            <p>

                                {hino.versao.nome}

                            </p>

                        </div>

                    ))}

                    <footer className="receipt-footer">

    <p className="receipt-footer-slogan">

        MISSÕES POR CRISTO, REALIZAR

    </p>

    <p className="receipt-footer-site">

        missoes-adoracao.vercel.app

    </p>

</footer>

                </div>

            </section>

        </div>

    )

})

export default SelectionReceipt