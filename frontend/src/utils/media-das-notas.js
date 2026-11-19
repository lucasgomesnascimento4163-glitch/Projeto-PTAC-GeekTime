export function mediaDasNotas(historico) {
  if (historico.length === 0) {
    throw new Error('Sem notas')
  }
  return historico.reduce((total, item) => total + item.nota, 0) / historico.length
}
