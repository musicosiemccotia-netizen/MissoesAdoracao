import { useState } from 'react'
import type { ReactNode } from 'react'

import type { HinoSelecionado } from '../../types/hinoselecionado'
import { selectioncontext } from './selectioncontextvalue'

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