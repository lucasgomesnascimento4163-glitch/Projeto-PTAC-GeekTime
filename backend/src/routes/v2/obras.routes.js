import { Router } from 'express';
import {
  createObra,
  deleteObra,
  getObra,
  listFavoritas,
  listObrasV2,
  updateObra
} from "../../controllers/obras.controller.js";
import { valida } from '../../middlewares/valida.js';
import { obraSchema, updateObraSchema } from '../../schemas/obra.schema.js';

const router = Router();

router.post('/', valida(obraSchema), createObra);
router.get('/', listObrasV2);
router.get('/favoritas', listFavoritas);
router.get('/:id', getObra);
router.put('/:id', valida(updateObraSchema), updateObra);
router.delete('/:id', deleteObra);

export default router;
