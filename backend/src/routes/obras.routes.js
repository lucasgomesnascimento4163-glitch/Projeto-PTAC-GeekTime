import { Router } from 'express';
import {
  createObra,
  deleteObra,
  getObra,
  listFavoritas,
  listObras,
  updateObra
} from "../controllers/obras.controller.js";
import { valida } from '../middlewares/valida.js';
import { obraSchema, updateObraSchema } from '../schemas/obra.schema.js';

const router = Router();

router.post('/', valida(obraSchema), createObra);
router.get('/', listObras);
router.get('/favoritas', listFavoritas);
router.get('/:id', getObra);
router.put('/:id', valida(updateObraSchema), updateObra);
router.delete('/:id', deleteObra);

export default router;
