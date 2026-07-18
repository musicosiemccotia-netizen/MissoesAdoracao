// =======================================================
// IMPORTS
// =======================================================

import './versionselector.css'

// =======================================================
// PROPRIEDADES
// =======================================================

type VersionSelectorProps = {
    aberto: boolean

    versoes: {
        nome: string
    }[]

    versaoAtual: string

    onSelecionar: (versao: string) => void

    onVerTodas: () => void
}

// =======================================================
// COMPONENTE
// =======================================================

function VersionSelector({
    aberto,
    versoes,
    versaoAtual,
    onSelecionar,
    onVerTodas,
}: VersionSelectorProps) {
    if (!aberto) {
        return null
    }

    return (
        <div className="versionselector">
            {versoes.map((versao) => (
                <button
                    key={versao.nome}
                    type="button"
                    className={`versionselector-item ${versao.nome === versaoAtual ? 'ativo' : ''}`}
                    onClick={() => onSelecionar(versao.nome)}
                >
                    {versao.nome}
                </button>
            ))}

            <button type="button" className="versionselector-more" onClick={onVerTodas}>
                Ver todas →
            </button>
        </div>
    )
}

export default VersionSelector
