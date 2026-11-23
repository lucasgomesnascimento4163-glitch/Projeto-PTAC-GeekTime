export function erroFormat(status, titulo, detalhe) {
  return { status, titulo, detalhe, timestamp: new Date().toISOString() };
}

export function errorHandler(err, _req, res, _next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json(erroFormat(400, 'JSON inválido', 'Corpo da requisição malformado'));
  }

  const status = err.status || err.statusCode || 500;
  const titulo = err.titulo || (status === 404 ? 'Não encontrado' : status === 409 ? 'Conflito' : status === 400 ? 'Requisição inválida' : 'Erro interno');
  const detalhe = status === 500 ? 'Erro interno do servidor' : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json(erroFormat(status, titulo, detalhe));
}
