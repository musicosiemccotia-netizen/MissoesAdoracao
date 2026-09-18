import { useState } from 'react'
import type { ReactNode } from 'react'

import type { identificacao } from '../../types/identificacao'
import { identificacaocontext } from './identificacaocontextvalue'

const identificacaoinicial: identificacao = {

    primeiroNome: '',

    sobrenome: '',

    cargo: '',

    congregacao: '',

    culto: '',

    ehGrupoMinisterio: false,

    grupoMinisterio: ''

}

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