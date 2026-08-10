// =======================================================
// IMPORTS
// =======================================================

import { useNavigate } from 'react-router-dom'

import background from '../../assets/images/background/background-com-barra.png'
import botaoComecar from '../../assets/images/home/botao-comecar.png'
import logo from '../../assets/images/home/logo.png'
import missoes from '../../assets/images/home/missoes.png'
import adoracao from '../../assets/images/home/adoracao.png'
import bemVindo from '../../assets/images/home/bem-vindo.png'

import './Home.css'


// =======================================================
// COMPONENTE
// =======================================================

function Home() {

    // =======================================================
    // HOOKS
    // =======================================================

    const navigate = useNavigate()


    // =======================================================
    // JSX
    // =======================================================

    return (

        <main className="home">

            <div
                className="home-background"
                style={{ backgroundImage: `url(${background})` }}
            ></div>

            <div className="content">

                <img
                    src={logo}
                    alt="Logo"
                    className="logo"
                />

                <img
                    src={missoes}
                    alt="Missões"
                    className="missoes"
                />

                <img
                    src={adoracao}
                    alt="Adoração"
                    className="adoracao"
                />

                <img
                    src={bemVindo}
                    alt="Seja bem-vindo"
                    className="bem-vindo"
                />

                <button
                    className="start-button"
                    onClick={() => navigate('/identificacao')}
                >

                    <img
                        src={botaoComecar}
                        alt="Começar"
                    />

                </button>

            </div>

        </main>

    )

}

export default Home