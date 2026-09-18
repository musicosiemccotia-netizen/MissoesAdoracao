import { createContext } from 'react'
import type { identificacao } from '../../types/identificacao'

type identificacaocontexttype = {
    identificacao: identificacao
    setidentificacao: React.Dispatch<React.SetStateAction<identificacao>>
}

export const identificacaocontext = createContext<identificacaocontexttype>(
    {} as identificacaocontexttype
)
