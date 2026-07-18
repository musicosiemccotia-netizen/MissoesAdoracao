import { useState } from 'react'
import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import background from '../../assets/images/background/background.png'
import logo from '../../assets/images/identificacao/logo.png'
import botaoContinuar from '../../assets/images/identificacao/botao-continuar.png'



import { identificacaocontext } from '../../contexts/identificacao/identificacaocontext'

import './Identificacao.css'

function Identificacao() {

  const [primeiroNome, setPrimeiroNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [cargo, setCargo] = useState('')
  const [congregacao, setCongregacao] = useState('')
  const [culto, setCulto] = useState('')

  const [mensagemErro, setMensagemErro] = useState('')
  const [erroPrimeiroNome, setErroPrimeiroNome] = useState(false)
  const [erroSobrenome, setErroSobrenome] = useState(false)
  const [erroCargo, setErroCargo] = useState(false)
  const [erroCongregacao, setErroCongregacao] = useState(false)
  const [erroCulto, setErroCulto] = useState(false)
  
  const navigate = useNavigate()
  const { setidentificacao } = useContext(identificacaocontext)

// Limpando mensagem de erro diretamente nos handlers de input

function continuar() {

  const primeiroNomeVazio = primeiroNome.trim() === ''
  const sobrenomeVazio = sobrenome.trim() === ''
  const cargoVazio = cargo === ''
  const congregacaoVazia = congregacao === ''
  const cultoVazio = culto === ''

  setErroPrimeiroNome(primeiroNomeVazio)
  setErroSobrenome(sobrenomeVazio)
  setErroCargo(cargoVazio)
  setErroCongregacao(congregacaoVazia)
  setErroCulto(cultoVazio)

  if (
    primeiroNomeVazio ||
    sobrenomeVazio ||
    cargoVazio ||
    congregacaoVazia ||
    cultoVazio
  ) {

    setMensagemErro(
      'Complete os campos marcados com (*) para continuar.'
    )

    return

  }

  setMensagemErro('')

setidentificacao({
  primeiroNome,
  sobrenome,
  cargo,
  congregacao,
  culto
})

navigate('/selecao')

}

  return (
    <main className="identificacao">

      <div
        className="identificacao-background"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="identificacao-content">

        <img
          src={logo}
          alt="Logo"
          className="identificacao-logo"
        />

        <h1 className="identificacao-titulo">
          Área de Identificação
        </h1>

        <p className="identificacao-subtitulo">
          Informe seus dados para preparar sua lista de adoração.
        </p>

        <div className="campo campo1">

          <label className="identificacao-label">
            Primeiro nome *
          </label>

          <input
            className={`identificacao-input ${erroPrimeiroNome ? 'erro' : ''}`}
            type="text"
            placeholder="Exemplo: Maria"
            value={primeiroNome}
            onChange={(e) => {

  setPrimeiroNome(e.target.value)

  if (e.target.value.trim() !== '') {
    setErroPrimeiroNome(false)
    if (mensagemErro !== '') setMensagemErro('')
  }

}}
/>

        </div>

        <div className="campo campo2">

          <label className="identificacao-label">
            Sobrenome *
          </label>

          <input
            className={`identificacao-input ${erroSobrenome ? 'erro' : ''}`}
            type="text"
            placeholder="Exemplo: Lima de Sousa"
            value={sobrenome}
            onChange={(e) => {

  setSobrenome(e.target.value)

  if (e.target.value.trim() !== '') {
    setErroSobrenome(false)
    if (mensagemErro !== '') setMensagemErro('')
  }

}}
/>

        </div>

        <div className="campo campo3">

          <label className="identificacao-label">
            Cargo *
          </label>

<select
  className={`identificacao-select ${erroCargo ? 'erro' : ''}`}
  value={cargo}
  onChange={(e) => {

  setCargo(e.target.value)

  if (e.target.value !== '') {
    setErroCargo(false)
    if (mensagemErro !== '') setMensagemErro('')
  }

}}
>
  <option value="">Selecione...</option>

  <option>Cooperador(a)</option>
  <option>Obreiro(a)</option>
  <option>Diácono(a)</option>
  <option>Missionário(a)</option>
  <option>Presbítero</option>
  <option>Pastor</option>
</select>

        </div>

        <div className="campo campo4">

          <label className="identificacao-label">
            Congregação *
          </label>

<select
  className={`identificacao-select ${erroCongregacao ? 'erro' : ''}`}
  value={congregacao}
  onChange={(e) => {

  setCongregacao(e.target.value)

  if (e.target.value !== '') {
    setErroCongregacao(false)
    if (mensagemErro !== '') setMensagemErro('')
  }

}}
>
  <option value="">Selecione...</option>

  <option>Congregação Cotia</option>
  <option>Sede Nacional</option>
</select>

        </div>

        <div className="campo campo5">

          <label className="identificacao-label">
            Culto *
          </label>

<select
  className={`identificacao-select ${erroCulto ? 'erro' : ''}`}
  value={culto}
  onChange={(e) => {

  setCulto(e.target.value)

  if (e.target.value !== '') {
    setErroCulto(false)
    if (mensagemErro !== '') setMensagemErro('')
  }
  
}}
>
  <option value="">Selecione...</option>

  <option>Oração e Estudo</option>
  <option>Escola Bíblica de Sábado</option>
  <option>Público (Sábado)</option>
  <option>Missões</option>
  <option>Santa Ceia</option>
  <option>Betel</option>
  <option>Gelc</option>
  <option>Herdeiros de Cristo e Pequeninos de Jesus</option>
  <option>Culto Público (Domingo)</option>
</select>

        </div>

        <button
  className="continue-button"
  onClick={continuar}
>
  <img
    src={botaoContinuar}
    alt="Continuar"
  />
</button>

{mensagemErro && (
  <p className="mensagem-erro">
    {mensagemErro}
  </p>
)}

      </div>

    </main>
  )
}

export default Identificacao