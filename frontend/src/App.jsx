import ListaObras from "./components/ListaObras"
import "./App.css"

export default function App () {
  return (
    <>
      <header className="topo">
        <h1 className="logo">
          <span className="logo-geek">Geek</span>
          <span className="logo-time">Time</span>
        </h1>
        <p className="slogan">Seu catálogo de animes e mangás</p>
      </header>
      <main className="conteudo">
        <ListaObras/>
      </main>
    </>
  )
}
