const STORAGE_KEY = 'missoes-adoracao:selecoes'

export function salvarSelecao(dados: unknown) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(dados)

    )

}

export function obterSelecao() {

    const dados = localStorage.getItem(STORAGE_KEY)

    if (!dados) {

        return null

    }

    return JSON.parse(dados)

}

export function limparSelecao() {

    localStorage.removeItem(STORAGE_KEY)

}