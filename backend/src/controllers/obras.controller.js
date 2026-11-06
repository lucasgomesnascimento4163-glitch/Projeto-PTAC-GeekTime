import * as obrasService from "../services/obras.service.js";

export async function createObra(req, res) {
  const obra = await obrasService.createObra(req.body);
  res.status(201).json(obra);
}

export async function listObras(req, res) {
  res.json(await obrasService.findAll(req.query.tipo));
}

export async function listFavoritas(_req, res) {
  res.json(await obrasService.findFavoritas());
}

export async function getObra(req, res) {
  res.json(await obrasService.findById(Number(req.params.id)));
}

export async function updateObra(req, res) {
  res.json(await obrasService.updateObra(Number(req.params.id), req.body));
}

export async function deleteObra(req, res) {
  await obrasService.removeObra(Number(req.params.id), req.query.force === 'true');
  res.status(204).end();
}
