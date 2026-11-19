import { describe, it, expect } from 'vitest'
import { mediaDasNotas } from './media-das-notas'

describe('mediaDasNotas', () => {
  it('devolve 8 para as notas 7, 8 e 9', () => {
    const historico = [{ nota: 7 }, { nota: 8 }, { nota: 9 }]

    expect(mediaDasNotas(historico)).toBe(8)
  })

  it('lança erro quando não há notas', () => {
    expect(() => mediaDasNotas([])).toThrow('Sem notas')
  })
})
