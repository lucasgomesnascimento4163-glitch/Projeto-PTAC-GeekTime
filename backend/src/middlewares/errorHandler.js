export function errorHandler(error, _req, res, _next) {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido' });
  }

  const status = error.statusCode || 500;
  if (status === 500) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
  res.status(status).json({ erro: error.message });
}
