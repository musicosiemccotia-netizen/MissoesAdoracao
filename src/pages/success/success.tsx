import { useNavigate } from 'react-router-dom'
import fundo from '../../assets/images/background/background-com-barra.png'

import './success.css'

function Success() {

    const navigate = useNavigate()
    
    return (

        <div
    className="success"
    style={{ backgroundImage: `url(${fundo})` }}
>

    <div className="success-overlay" />

    <div className="success-content">

        <div className="success-icon">
            ✓
        </div>

        <h1>
            Seleção enviada!
        </h1>

        <p>
            Agradecemos por sua disponibilidade em
            servir ao Senhor através do louvor.
        </p>

        <p>
            Em breve você receberá as informações
            sobre os ensaios.
        </p>

        <div className="success-slogan">

            🌱 Missões por Cristo, Realizar! 

        </div>

        <button
            className="success-button"
            onClick={() => navigate('/')}
        >
            Voltar ao início
        </button>

    </div>

</div>

    )

}

export default Success