    // =======================================================
    // IMPORTS
    // =======================================================

    import './selectionsheet.css'

    import type { HinoSelecionado } from '../../types/HinoSelecionado'
    import type { SelectionSheetActions } from '../../types/selectionsheetactions'
import type { SelectionCardActions } from '../../types/selectioncardactions'

import SelectionCard from '../selectioncard/selectioncard'

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

                    <h2>

                        Minha Seleção

                    </h2>

                    <p>

                        {hinos.length} hino{hinos.length !== 1 ? 's' : ''} selecionado{hinos.length !== 1 ? 's' : ''}

                    </p>

                    <div className="selectionsheet-lista">

                        {

                            hinos.map((hino) => (

                                <SelectionCard

                                    key={hino.id}

                                    hino={hino}

                                    actions={cardActions}

                                />
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