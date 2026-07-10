// =======================================================
// IMPORTS
// =======================================================

import './CardHino.css'

// =======================================================
// PROPRIEDADES
// =======================================================

type CardHinoProps = {

    nome: string

    autor: string

    versao: string

    onClick?: () => void

}

// =======================================================
// COMPONENTE
// =======================================================

function CardHino({

    nome,

    autor,

    versao,

    onClick

}: CardHinoProps) {

    return (

        <div
            className="card-hino"
            onClick={onClick}
        >

            <div className="card-info">

                <h2>{nome}</h2>

                <p>{autor}</p>

                <span>{versao}</span>

            </div>

            <div className="card-arrow">

                →

            </div>

        </div>

    )

}

export default CardHino