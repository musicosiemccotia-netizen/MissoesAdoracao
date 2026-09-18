// =======================================================
// IMPORTS
// =======================================================

// React
import { useContext, useState } from 'react'

// React Router
import { useNavigate } from 'react-router-dom'

// Assets
import background from '../../assets/images/background/background.png'
import botaoContinuar from '../../assets/images/identificacao/botao-continuar.png'
import logo from '../../assets/images/identificacao/logo.png'

// Contexts
import { identificacaocontext } from '../../contexts/identificacao/identificacaocontextvalue'

// CSS
import './identificacao.css'

const gruposMinisterio = [
  'Semeadores de Cristo',
  'Betel',
  'GELC',
  'Pequeninos de Jesus',
  'Herdeiros de Cristo'
]

const cultosCorrespondentes: Record<string, string> = {
  Betel: 'Betel',
  GELC: 'Gelc',
  'Pequeninos de Jesus': 'Herdeiros de Cristo e Pequeninos de Jesus',
  'Herdeiros de Cristo': 'Herdeiros de Cristo e Pequeninos de Jesus'
}

// =======================================================
// ESTADOS
// =======================================================

function Identificacao() {

  const [primeiroNome, setPrimeiroNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [cargo, setCargo] = useState('')
  const [congregacao, setCongregacao] = useState('')
  const [culto, setCulto] = useState('')
  const [ehGrupoMinisterio, setEhGrupoMinisterio] = useState(false)
  const [grupoMinisterio, setGrupoMinisterio] = useState('')
  const [editandoGrupoMinisterio, setEditandoGrupoMinisterio] = useState(false)
  const [grupoCultoPendente, setGrupoCultoPendente] = useState('')

  const [mensagemErro, setMensagemErro] = useState('')
  const [erroPrimeiroNome, setErroPrimeiroNome] = useState(false)
  const [erroSobrenome, setErroSobrenome] = useState(false)
  const [erroCargo, setErroCargo] = useState(false)
  const [erroCongregacao, setErroCongregacao] = useState(false)
  const [erroCulto, setErroCulto] = useState(false)
  const [erroGrupoMinisterio, setErroGrupoMinisterio] = useState(false)
  

  // =======================================================
  // HOOKS
  // =======================================================

  const navigate = useNavigate()
  
  const { setidentificacao } =
      useContext(identificacaocontext)

  function selecionarGrupoMinisterio(grupo: string) {
    setGrupoMinisterio(grupo)
    setEditandoGrupoMinisterio(false)
    setErroGrupoMinisterio(false)
    setGrupoCultoPendente(cultosCorrespondentes[grupo] ? grupo : '')
    if (mensagemErro !== '') setMensagemErro('')
  }

  function responderCultoDoGrupo(aceitou: boolean) {
    if (aceitou) {
      setCulto(cultosCorrespondentes[grupoCultoPendente])
      setErroCulto(false)
    }

    setGrupoCultoPendente('')
  }

function continuar() {

  const primeiroNomeVazio = primeiroNome.trim() === ''
  const sobrenomeVazio = sobrenome.trim() === ''
  const cargoVazio = cargo === ''
  const congregacaoVazia = congregacao === ''
  const cultoVazio = culto === ''
  const grupoMinisterioVazio = ehGrupoMinisterio && grupoMinisterio === ''

  setErroPrimeiroNome(primeiroNomeVazio)
  setErroSobrenome(sobrenomeVazio)
  setErroCargo(cargoVazio)
  setErroCongregacao(congregacaoVazia)
  setErroCulto(cultoVazio)
  setErroGrupoMinisterio(grupoMinisterioVazio)

  if (
    primeiroNomeVazio ||
    sobrenomeVazio ||
    cargoVazio ||
    congregacaoVazia ||
    cultoVazio ||
    grupoMinisterioVazio
  ) {

    setMensagemErro(
      grupoMinisterioVazio
        ? 'Selecione o grupo/ministério para continuar.'
        : 'Complete os campos marcados com (*) para continuar.'
    )

    return

  }

  setMensagemErro('')

setidentificacao({
  
    primeiroNome,
    sobrenome,
    cargo,
    congregacao,

    culto,

    ehGrupoMinisterio,

    grupoMinisterio
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

  const novoCargo = e.target.value

  setCargo(novoCargo)

  if (novoCargo === '') {
    setEhGrupoMinisterio(false)
    setGrupoMinisterio('')
    setEditandoGrupoMinisterio(false)
    setGrupoCultoPendente('')
    setErroGrupoMinisterio(false)
    if (mensagemErro !== '') setMensagemErro('')
  }

  if (novoCargo !== '') {
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

        {cargo !== '' && (
        <div className="grupo-identificacao">

          <label className="grupo-identificacao-opcao">
            <input
              type="checkbox"
              checked={ehGrupoMinisterio}
              onChange={(e) => {
                const marcado = e.target.checked

                setEhGrupoMinisterio(marcado)
                setEditandoGrupoMinisterio(marcado)

                if (!marcado) {
                  setGrupoMinisterio('')
                  setGrupoCultoPendente('')
                  setErroGrupoMinisterio(false)
                  if (mensagemErro !== '') setMensagemErro('')
                }
              }}
            />
            Grupo / Ministério
          </label>

          {ehGrupoMinisterio && grupoMinisterio === '' && (
            <>
            <label className="identificacao-label">
              Grupo / Ministério *
            </label>
            <select
              className={`identificacao-select ${erroGrupoMinisterio ? 'erro' : ''}`}
              value={grupoMinisterio}
              onChange={(e) => {
                setGrupoMinisterio(e.target.value)
                setEditandoGrupoMinisterio(e.target.value === '')
                setGrupoCultoPendente(cultosCorrespondentes[e.target.value] ? e.target.value : '')

                if (e.target.value !== '') {
                  setErroGrupoMinisterio(false)
                  if (mensagemErro !== '') setMensagemErro('')
                }
              }}
            >
              <option value="">Selecione...</option>
              {gruposMinisterio.map((grupo) => (
                <option key={grupo}>{grupo}</option>
              ))}
            </select>
            </>
          )}

          {ehGrupoMinisterio && grupoMinisterio !== '' && !editandoGrupoMinisterio && (
            <button
              type="button"
              className="grupo-identificacao-selecionado"
              onClick={() => setEditandoGrupoMinisterio(true)}
            >
              <span>{grupoMinisterio}</span>
              <span aria-hidden="true">›</span>
            </button>
          )}

          {ehGrupoMinisterio && grupoMinisterio !== '' && editandoGrupoMinisterio && (
            <div
              className="grupo-identificacao-opcoes"
              role="listbox"
              aria-label="Grupo / Ministério"
            >
              {gruposMinisterio.map((grupo) => (
                <button
                  type="button"
                  className={`grupo-identificacao-opcao-item ${grupo === grupoMinisterio ? 'selecionado' : ''}`}
                  key={grupo}
                  onClick={() => {
                    selecionarGrupoMinisterio(grupo)
                  }}
                >
                  {grupo}
                </button>
              ))}
            </div>
          )}

          {grupoCultoPendente !== '' && (
            <div className="grupo-culto-pergunta">
              <p>
                Deseja selecionar também o culto de {grupoCultoPendente}?
              </p>
              <div className="grupo-culto-acoes">
                <button
                  type="button"
                  onClick={() => responderCultoDoGrupo(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => responderCultoDoGrupo(false)}
                >
                  Não
                </button>
              </div>
            </div>
          )}

        </div>
        )}

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

  <option value="Cotia">Cotia</option>
  <option value="Sede Nacional">Sede Nacional</option>
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

  const novoCulto = e.target.value

  setCulto(novoCulto)

  if (novoCulto !== '') {
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
  <option>Público (Domingo)</option>
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