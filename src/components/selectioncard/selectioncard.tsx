// =======================================================
// IMPORTS
// =======================================================

import type { HinoSelecionado } from '../../types/HinoSelecionado'
import type { SelectionCardActions } from '../../types/selectioncardactions'

import './selectioncard.css'

// =======================================================
// PROPRIEDADES
// =======================================================

type SelectionCardProps = {

    hino: HinoSelecionado

    actions: SelectionCardActions

}

// =======================================================
// COMPONENTE
// =======================================================

function SelectionCard({

    hino,

    actions

}: SelectionCardProps) {

    return (

        <div className="selectioncard">

<h3>

    🎵 {hino.nome}

</h3>

<p className="selectioncard-author">

    {hino.autor}

</p>

<button

    type="button"

    className="selectioncard-remove"

    onClick={() => actions.onRemover(hino.id)}

>

    ×

</button>

<p className="selectioncard-label">

    Versão

</p>

            <button

    type="button"

    className="selectioncard-version"

    onClick={() => actions.onTrocarVersao(hino.id)}

>

                {hino.versao} ▼

            </button>

        </div>

    )

}

export default SelectionCard