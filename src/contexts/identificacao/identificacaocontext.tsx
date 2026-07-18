import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

import type { identificacao } from '../../types/identificacao'

type identificacaocontexttype = {

    identificacao: identificacao

    setidentificacao: React.Dispatch<React.SetStateAction<identificacao>>

}

const identificacaoinicial: identificacao = {

    primeiroNome: '',

    sobrenome: '',

    cargo: '',

    congregacao: '',

    culto: ''

}

export const identificacaocontext = createContext<identificacaocontexttype>(
    {} as identificacaocontexttype
)

type props = {

    children: ReactNode

}

export function IdentificacaoProvider({ children }: props) {

    const [identificacao, setidentificacao] = useState(identificacaoinicial)

    return (
        <identificacaocontext.Provider
            value={{
                identificacao,
                setidentificacao
            }}
        >
            {children}
        </identificacaocontext.Provider>
    )
}