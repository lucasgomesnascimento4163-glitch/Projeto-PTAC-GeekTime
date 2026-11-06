import * as obrasModel from "../models/obras.model.js";

function serviceError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validarProgresso(obra) {
  if (obra.totalUnidades && obra.progresso > obra.totalUnidades) {
    throw serviceError(`progresso não pode passar do total (${obra.totalUnidades})`, 400);
  }
}

async function validarTituloUnico(titulo, idAtual) {
  const obras = await obrasModel.findAll();
  const repetido = obras.some(obra =>
    !obra.deletedAt &&
    obra.id !== idAtual &&
    obra.titulo.toLowerCase() === titulo.toLowerCase()
  );
  if (repetido) throw serviceError('título já cadastrado', 409);
}

export async function findAll(tipo) {
  const obras = await obrasModel.findAll();
  return obras.filter(obra => !obra.deletedAt && (!tipo || obra.tipo === tipo));
}

export async function findFavoritas() {
  const obras = await obrasModel.findAll();
  return obras.filter(obra => !obra.deletedAt && obra.favorito);
}

export async function findById(id) {
  const obra = await obrasModel.findById(id);
  if (!obra || obra.deletedAt) throw serviceError('Obra não encontrada', 404);
  return obra;
}

export async function createObra(payload) {
  await validarTituloUnico(payload.titulo);
  validarProgresso(payload);

  const historico = payload.nota
    ? [{ nota: payload.nota, data: new Date().toISOString() }]
    : [];

  return obrasModel.create({ ...payload, historico });
}

export async function updateObra(id, payload) {
  const obra = await findById(id);

  if (payload.titulo) await validarTituloUnico(payload.titulo, id);

  const atualizada = { ...obra, ...payload };
  validarProgresso(atualizada);

  if (payload.nota && payload.nota !== obra.nota) {
    atualizada.historico = [
      ...(obra.historico ?? []),
      { nota: payload.nota, data: new Date().toISOString() }
    ];
  }

  return obrasModel.update(id, atualizada);
}

export async function removeObra(id, force = false) {
  const obras = await obrasModel.findAll();
  const index = obras.findIndex(obra => obra.id === id);
  if (index === -1) throw serviceError('Obra não encontrada', 404);

  if (force) {
    obras.splice(index, 1);
  } else {
    if (obras[index].deletedAt) throw serviceError('Já removida', 409);
    obras[index] = { ...obras[index], deletedAt: new Date().toISOString() };
  }

  await obrasModel.saveAll(obras);
}
