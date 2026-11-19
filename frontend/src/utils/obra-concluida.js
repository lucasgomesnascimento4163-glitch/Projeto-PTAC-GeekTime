export function obraConcluida(obra) {
  return Boolean(obra.totalUnidades) && obra.progresso >= obra.totalUnidades
}
