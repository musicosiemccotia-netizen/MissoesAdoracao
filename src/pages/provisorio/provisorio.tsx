import { useEffect, useState } from 'react'

import { buscarSelecoes } from '../../services/provisorio.service'

import './provisorio.css'

function Provisorio() {

    const [selecoes, setSelecoes] = useState<any[]>([])

    useEffect(() => {

        async function carregar() {

            const dados = await buscarSelecoes()

            setSelecoes(dados)

        }

        carregar()

    }, [])

    return (

        <main className="provisorio">

            <h1>Painel Beta</h1>

            {

                selecoes.map(selecao => (

                    <section
                        key={selecao.id}
                        className="card"
                    >

                        <h2>{selecao.participante?.nome}</h2>

                        <p>{selecao.participante?.cargo}</p>

                        <p>{selecao.participante?.congregacao}</p>

                        <p><strong>Culto:</strong> {selecao.culto}</p>

                        <p>
                            {new Date(selecao.data_selecao)
                                .toLocaleString('pt-BR')}
                        </p>

                        <h3>Repertório</h3>

                        <ul>

                            {
                                selecao.repertorio.map((item: any) => (

                                    <li key={item.id}>
                                        {item.hino} ({item.versao})
                                    </li>

                                ))
                            }

                        </ul>

                    </section>

                ))

            }

        </main>

    )

}

export default Provisorio