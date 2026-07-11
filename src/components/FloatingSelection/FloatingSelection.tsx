// =======================================================
// IMPORTS
// =======================================================

import './FloatingSelection.css'

import MusicIcon from '../../assets/icons/music.svg?react'

// =======================================================
// PROPRIEDADES
// =======================================================

type FloatingSelectionProps = {

    quantidade: number

    expandido: boolean

    onAbrirSelecao: () => void

}

// =======================================================
// COMPONENTE
// =======================================================

function FloatingSelection({

    quantidade,

    expandido,

    onAbrirSelecao

}: FloatingSelectionProps) {

return (

    <button
        className="floating-selection"
        onClick={onAbrirSelecao}
    >

        <div
            className={`floating-panel ${expandido ? 'expandido' : 'recolhido'}`}
        >

            <div className="floating-content">

                <span className="floating-texto">

                    🎵 {quantidade} hino{quantidade > 1 ? 's' : ''} selecionado{quantidade > 1 ? 's' : ''}

                </span>

                <span className="floating-link">

                    Abrir seleção →

                </span>

            </div>

        </div>

        <div
               className={`floating-icon ${expandido ? 'ativo' : 'inativo'}`}
        >

            <MusicIcon className="icone" />

            <span className="contador">

                {quantidade}

            </span>

        </div>

    </button>

)

}

export default FloatingSelection