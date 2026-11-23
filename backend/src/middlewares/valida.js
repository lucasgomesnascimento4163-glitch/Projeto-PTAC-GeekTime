import { erroFormat } from './errorHandler.js';

export function valida(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(
        erroFormat(400, 'Dados inválidos', result.error.flatten().fieldErrors)
      );
    }

    req.body = result.data;
    next();
  };
}
