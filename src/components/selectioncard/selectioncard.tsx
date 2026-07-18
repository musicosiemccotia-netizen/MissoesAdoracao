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

    expanded: boolean

    children?: React.ReactNode

}

// =======================================================
// COMPONENTE
// =======================================================

function SelectionCard({

    hino,

    actions,

    expanded,

    children

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

    onClick={() => actions.onRemover(hino.itemId)}

>

    ×

</button>

<p className="selectioncard-label">

    Versão

</p>

            <button

    type="button"

    className="selectioncard-version"

    onClick={() => actions.onTrocarVersao(hino.itemId)}

>

                {hino.versao.nome} ▼

            </button>

            <div
    className={
        expanded
            ? 'selectioncard-dropdown open'
            : 'selectioncard-dropdown'
    }
>
    {children}

</div>

        </div>

    )

}

export default SelectionCard