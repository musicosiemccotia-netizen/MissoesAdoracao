import './BottomSheet.css'

import hinos from '../../data/hinos'

type Props = {

    aberto: boolean

    hino: typeof hinos[number] | null

    onSelecionar: () => void

    onFechar: () => void

}

function BottomSheet({

    aberto,

    hino,

    onSelecionar,

    onFechar

}: Props) {

  if (!aberto) return null

  return (

    <div
      className="overlay"
      onClick={onFechar}
    >

      <div
        className="bottom-sheet"
        onClick={(e) => e.stopPropagation()}
      >

        <h2>{hino?.nome}</h2>

        <p>{hino?.autor}</p>

        <h3 className="titulo-versoes">

    VERSÕES ({hino?.versoes.length})

</h3>

<div className="lista-versoes">

    {

        hino?.versoes.map((versao) => (

            <div
                className="card-versao"
                key={versao.nome}
            >

                <span>

                    {versao.nome}

                </span>

                <button
                    className="botao-adicionar"
                    onClick={onSelecionar}
                >

                    +

                </button>

            </div>

        ))

    }

</div>

<div className="solicitar-versao">

    <p>

        Não encontrou a versão?

    </p>

    <button>

        + Solicitar

    </button>

</div>

      </div>

    </div>

  )

}

export default BottomSheet