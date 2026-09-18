import { createContext } from 'react'
import type { HinoSelecionado } from '../../types/hinoselecionado'

type selectioncontexttype = {
    hinosSelecionados: HinoSelecionado[]
    setHinosSelecionados: React.Dispatch<React.SetStateAction<HinoSelecionado[]>>
}

export const selectioncontext = createContext<selectioncontexttype>(
    {} as selectioncontexttype
)
