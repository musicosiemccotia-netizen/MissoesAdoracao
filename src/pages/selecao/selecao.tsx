import background from '../../assets/images/background/background.png'

import './selecao.css'

function Selecao() {

  return (

    <main className="selecao">

      <div
        className="selecao-background"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

    </main>

  )

}

export default Selecao