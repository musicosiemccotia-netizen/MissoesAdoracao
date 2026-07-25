import type { Versao } from './versao'

export interface Hino {
  id: string

  nome: string

  autor: string

  categoria: string | null

  versoes: Versao[]
}