export function filtrarMelhoresNotas(obras) {
  return obras.filter((obra) => obra.nota >= 8)
}
