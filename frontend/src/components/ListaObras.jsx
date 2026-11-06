import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from '../api'

const criarObra = (dados) => apiPost('/obras', dados)
const atualizarObra = (id, novosDados) => apiPut(`/obras/${id}`, novosDados)
const excluirObra = (id) => apiDelete(`/obras/${id}`)

const CATEGORIAS = [
  { id: 'todos', nome: 'Todos', jp: '全部' },
  { id: 'anime', nome: 'Animes', jp: 'アニメ' },
  { id: 'manga', nome: 'Mangás', jp: 'マンガ' },
  { id: 'favoritas', nome: 'Favoritas', jp: 'お気に入り' },
]

const caminhoDe = (filtro) => {
  if (filtro === 'favoritas') return '/obras/favoritas'
  if (filtro === 'todos') return '/obras'
  return `/obras?tipo=${filtro}`
}

const combina = (filtro, obra) => {
  if (filtro === 'todos') return true
  if (filtro === 'favoritas') return obra.favorito
  return obra.tipo === filtro
}

function mensagemDeErro(e) {
  if (e.name === 'ApiError' && e.status >= 500) return 'Erro no servidor. Tente de novo em instantes.'
  if (e instanceof TypeError) return 'Falha de rede.'
  return e.message
}

export default function ListaObras() {
  const [obras, setObras] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [editando, setEditando] = useState(null)
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    const controle = new AbortController()
    const signal = controle.signal

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
        const data = await apiGet(caminhoDe(filtro), { signal })
        setObras(data)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(mensagemDeErro(e))
        }
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    return () => controle.abort()
  }, [filtro])

  async function tentarExcluir(id) {
    const prev = obras
    setObras(prev.filter(o => o.id !== id))
    try {
      await excluirObra(id)
    } catch (e) {
      setObras(prev)
      setErro(mensagemDeErro(e))
    }
  }

  async function tentarAtualizar(id, novosDados) {
    try {
      setErro(null)
      const editada = await atualizarObra(id, novosDados)
      setObras(prev => prev
        .map(o => o.id === editada.id ? editada : o)
        .filter(o => combina(filtro, o)))
      return true
    } catch (e) {
      setErro(mensagemDeErro(e))
      return false
    }
  }

  async function tentarSalvar(e) {
    e.preventDefault()
    const f = e.target
    const dados = {
      titulo: f.titulo.value,
      tipo: f.tipo.value,
      totalUnidades: f.totalUnidades.value ? Number(f.totalUnidades.value) : null,
      progresso: Number(f.progresso.value),
      nota: f.nota.value ? Number(f.nota.value) : null
    }

    setErro(null)

    if (editando.id) {
      if (await tentarAtualizar(editando.id, dados)) setEditando(null)
      return
    }

    try {
      const nova = await criarObra(dados)
      if (combina(filtro, nova)) setObras(prev => [...prev, nova])
      setEditando(null)
    } catch (e) {
      setErro(mensagemDeErro(e))
    }
  }

  return (
    <div>
      <nav className="categorias">
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            className={`categoria ${filtro === c.id ? 'ativa' : ''}`}
            aria-pressed={filtro === c.id}
            onClick={() => setFiltro(c.id)}
          >
            <span className="categoria-nome">{c.nome}</span>
            <span className="categoria-jp">{c.jp}</span>
          </button>
        ))}
      </nav>

      <div className="barra">
        <h2>{CATEGORIAS.find(c => c.id === filtro).nome}</h2>
        <button className="primario" onClick={() => setEditando({})}>Nova obra</button>
      </div>

      {erro && <p className="erro">Erro: {erro}</p>}

      {editando && (
        <form className="form" key={editando.id ?? 'nova'} onSubmit={tentarSalvar}>
          <h3>{editando.id ? 'Editar obra' : 'Nova obra'}</h3>
          <label className="campo-largo">
            Título
            <input type="text" name="titulo" defaultValue={editando.titulo} required />
          </label>
          <label>
            Tipo
            <select name="tipo" defaultValue={editando.tipo ?? 'anime'}>
              <option value="anime">Anime</option>
              <option value="manga">Mangá</option>
            </select>
          </label>
          <label>
            Total de episódios ou capítulos
            <input type="number" name="totalUnidades" min="1" defaultValue={editando.totalUnidades ?? ''} />
          </label>
          <label>
            Onde parei
            <input type="number" name="progresso" min="0" defaultValue={editando.progresso ?? 0} required />
          </label>
          <label>
            Nota de 1 a 10
            <input type="number" name="nota" min="1" max="10" defaultValue={editando.nota ?? ''} />
          </label>
          <div className="campo-largo acoes">
            <button type="submit" className="primario">Salvar</button>
            <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </form>
      )}

      {carregando && <p className="aviso">Carregando...</p>}

      {!carregando && obras.length === 0 && (
        <p className="aviso">Nenhuma obra aqui ainda. Use Nova obra para cadastrar a primeira.</p>
      )}

      {!carregando && obras.length > 0 && (
        <ul className="cards">
          {obras.map((o) => (
            <li key={o.id} className="card">
              <div className="card-topo">
                <span className={`tag ${o.tipo}`}>{o.tipo === 'anime' ? 'Anime' : 'Mangá'}</span>
                <button
                  className="icone"
                  aria-label={o.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  onClick={() => tentarAtualizar(o.id, { favorito: !o.favorito })}
                >
                  {o.favorito ? '★' : '☆'}
                </button>
              </div>

              <h3>{o.titulo}</h3>

              <p className="progresso">
                {o.tipo === 'anime' ? 'Episódio' : 'Capítulo'} {o.progresso}
                {o.totalUnidades ? ` de ${o.totalUnidades}` : ''}
              </p>
              {o.totalUnidades && <progress value={o.progresso} max={o.totalUnidades} />}

              {o.nota && <p className="nota">Nota {o.nota}/10</p>}
              {o.historico?.length > 0 && (
                <p className="historico">
                  Histórico: {o.historico
                    .map(h => `${h.nota} (${new Date(h.data).toLocaleDateString('pt-BR')})`)
                    .join(', ')}
                </p>
              )}

              <div className="acoes">
                <button
                  className="primario"
                  aria-label="Registrar mais um episódio ou capítulo"
                  onClick={() => tentarAtualizar(o.id, { progresso: o.progresso + 1 })}
                >
                  +1
                </button>
                <button onClick={() => setEditando(o)}>Editar</button>
                <button onClick={() => tentarExcluir(o.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
