import { z } from 'zod'

export const obraSchema = z.object({
  titulo: z.string().trim().min(1, 'titulo é obrigatório'),
  tipo: z.enum(['anime', 'manga'], { message: "tipo deve ser 'anime' ou 'manga'" }),
  totalUnidades: z.number().int().positive().nullable().optional(),
  progresso: z.number().int().min(0).default(0),
  favorito: z.boolean().default(false),
  nota: z.number().int().min(1).max(10).nullable().optional()
})

export const updateObraSchema = obraSchema.partial()
