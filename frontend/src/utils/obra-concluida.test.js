import { describe, it, expect } from 'vitest'
import { obraConcluida } from './obra-concluida'

describe('obraConcluida', () => {
  it('devolve true quando o progresso chegou ao total', () => {
    expect(obraConcluida({ progresso: 28, totalUnidades: 28 })).toBe(true)
  })

  it('devolve false quando ainda faltam episódios', () => {
    expect(obraConcluida({ progresso: 12, totalUnidades: 28 })).toBe(false)
  })

  it('devolve false quando o total é desconhecido', () => {
    expect(obraConcluida({ progresso: 150, totalUnidades: null })).toBe(false)
  })
})
