// =======================================================
// IMPORTS
// =======================================================

import hinos from '../data/hinos'

// =======================================================
// TIPO
// =======================================================

export type BottomSheetContext = {

    aberto: boolean

    tipo: 'add' | 'edit'

    hino: typeof hinos[number] | null

    hinoSelecionadoId?: number

}