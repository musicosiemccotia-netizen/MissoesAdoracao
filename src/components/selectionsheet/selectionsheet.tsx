    // =======================================================
    // IMPORTS
    // =======================================================

    import { useState } from 'react'

    import './selectionsheet.css'

    import type { HinoSelecionado } from '../../types/HinoSelecionado'
    import type { SelectionSheetActions } from '../../types/selectionsheetactions'
    import type { SelectionCardActions } from '../../types/selectioncardactions'

    import SelectionCard from '../selectioncard/selectioncard'
    import VersionSelector from '../versionselector/versionselector'

// =======================================================
// PROPRIEDADES
// =======================================================

type SelectionSheetProps = {

    aberto: boolean

    hinos: HinoSelecionado[]

    actions: SelectionSheetActions

    cardActions: SelectionCardActions

}

// =======================================================
// COMPONENTE
// =======================================================

function SelectionSheet({

    aberto,

    hinos,

    actions,

    cardActions

}: SelectionSheetProps) {

    const [openedItemId, setOpenedItemId] = useState<string | null>(null)    
    
    if (!aberto) return null

        return (

            <div
                className="selectionsheet-overlay"
                onClick={actions.onFechar}
            >

                <div
                    className="selectionsheet"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="selectionsheet-handle"></div>

<button
    type="button"
    className="selectionsheet-close"
    onClick={actions.onFechar}
    aria-label="Fechar"
>
    ✕
</button>

<h2>
    Minha Seleção
</h2>

                    <p>

                        {hinos.length} hino{hinos.length !== 1 ? 's' : ''} selecionado{hinos.length !== 1 ? 's' : ''}

                    </p>

                    <div className="selectionsheet-lista">

                        {

                            hinos.map((hino) => (

    <div
        key={hino.itemId}
        className="selectionsheet-item"
    >

<SelectionCard

    hino={hino}

    expanded={openedItemId === hino.itemId}

    actions={{

        ...cardActions,

        onTrocarVersao: () => {

            setOpenedItemId(

                openedItemId === hino.itemId

                    ? null

                    : hino.itemId

            )

        }

    }}

>

    <VersionSelector

        aberto={openedItemId === hino.itemId}

        versoes={hino.versoes}

        versaoAtual={hino.versao.nome}

        onSelecionar={(versao) => {

    cardActions.onSelecionarVersao(

        hino.itemId,

        versao

    )

    setOpenedItemId(null)

}}

        onVerTodas={() => {

    setOpenedItemId(null)

    actions.onFechar()

    cardActions.onTrocarVersao(hino.itemId)

}}

    />

</SelectionCard>

    </div>

))

                        }

                    </div>

                    <button
                        className="selectionsheet-concluir"
                        onClick={actions.onConcluir}
                    >

                        Concluir seleção

                    </button>

                </div>

            </div>

        )

    }

    export default SelectionSheet