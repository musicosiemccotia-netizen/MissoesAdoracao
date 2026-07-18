// =======================================================
// AÇÕES DO SELECTION CARD
// =======================================================

export type SelectionCardActions = {

    onTrocarVersao: (itemId: string) => void

    onSelecionarVersao: (itemId: string, versao: string) => void

    onRemover: (itemId: string) => void

}