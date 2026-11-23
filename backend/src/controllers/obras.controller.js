import * as obrasService from "../services/obras.service.js";
import { toObraDTO } from "../dtos/obra.dto.js";

export async function createObra(req, res) {
  const obra = await obrasService.createObra(req.body);
  res.status(201).json(toObraDTO(obra));
}

export async function listObras(req, res) {
  const obras = await obrasService.findAll(req.query.tipo);
  res.json(obras.map(toObraDTO));
}

export async function listObrasV2(req, res) {
  const obras = await obrasService.findAll(req.query.tipo);
  const data = obras.map(toObraDTO);
  res.json({
    data,
    meta: { total: data.length }
  });
}

export async function listFavoritas(_req, res) {
  const favoritas = await obrasService.findFavoritas();
  res.json(favoritas.map(toObraDTO));
}

export async function getObra(req, res) {
  const obra = await obrasService.findById(Number(req.params.id));
  res.json(toObraDTO(obra));
}

export async function updateObra(req, res) {
  const obra = await obrasService.updateObra(Number(req.params.id), req.body);
  res.json(toObraDTO(obra));
}

export async function deleteObra(req, res) {
  await obrasService.removeObra(Number(req.params.id), req.query.force === 'true');
  res.status(204).end();
}
