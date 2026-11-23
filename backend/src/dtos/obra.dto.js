export function toObraDTO(obra) {
  return {
    id: obra.id,
    titulo: obra.titulo,
    tipo: obra.tipo,
    totalUnidades: obra.totalUnidades ?? null,
    progresso: obra.progresso ?? 0,
    favorito: obra.favorito ?? false,
    nota: obra.nota ?? null,
    historico: obra.historico ?? []
  };
}
