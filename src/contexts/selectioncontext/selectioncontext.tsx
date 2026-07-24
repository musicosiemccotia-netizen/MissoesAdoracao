import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

import type { HinoSelecionado } from '../../types/HinoSelecionado'

type selectioncontexttype = {

    hinosSelecionados: HinoSelecionado[]

    setHinosSelecionados: React.Dispatch<React.SetStateAction<HinoSelecionado[]>>

}

export const selectioncontext = createContext<selectioncontexttype>(
    {} as selectioncontexttype
)

type props = {

    children: ReactNode

}

export function SelectionProvider({ children }: props) {

    const [hinosSelecionados, setHinosSelecionados] = useState<HinoSelecionado[]>([])

    return (
        <selectioncontext.Provider
            value={{
                hinosSelecionados,
                setHinosSelecionados
            }}
        >
            {children}
        </selectioncontext.Provider>
    )
}