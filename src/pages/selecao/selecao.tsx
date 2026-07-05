import background from '../../assets/images/background/background.png'
import logo from '../../assets/images/selecao/logo.png'

import './selecao.css'

function Selecao() {

  return (

    <main className="selecao">

  <div
    className="selecao-background"
    style={{ backgroundImage: `url(${background})` }}
  ></div>

  <div className="selecao-content">

  <img
    src={logo}
    alt="Logo"
    className="selecao-logo"
  />

  <p className="mensagem-semeando">
    Ainda estamos semeando.
    <br />
    Se Deus permitir, logo, logo teremos frutos.
  </p>

</div>

</main>

  )

}

export default Selecao