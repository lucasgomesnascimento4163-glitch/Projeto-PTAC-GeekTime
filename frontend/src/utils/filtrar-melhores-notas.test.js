import { describe, it, expect } from 'vitest'
import { filtrarMelhoresNotas } from './filtrar-melhores-notas'

describe('filtrarMelhoresNotas', () => {
  it('mantém Frieren e deixa de fora Vagabond e a obra sem nota', () => {
    const frieren = { titulo: 'Frieren', nota: 9 }
    const vagabond = { titulo: 'Vagabond', nota: 6 }
    const semNota = { titulo: 'Dandadan', nota: null }

    expect(filtrarMelhoresNotas([frieren, vagabond, semNota])).toEqual([frieren])
  })

  it('conta a nota 8 como uma das melhores', () => {
    const bebop = { titulo: 'Cowboy Bebop', nota: 8 }

    expect(filtrarMelhoresNotas([bebop])).toEqual([bebop])
  })
})
