import express from 'express';
import cors from 'cors';
import obrasRouterV1 from "./routes/v1/obras.routes.js";
import obrasRouterV2 from "./routes/v2/obras.routes.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler, erroFormat } from "./middlewares/errorHandler.js";
import { conectar } from "./data/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
const PORT = 3000;

app.use('/api/v1/obras', obrasRouterV1);
app.use('/api/v2/obras', obrasRouterV2);

app.use((_req, res) => res.status(404).json(erroFormat(404, 'Não encontrado', 'Rota não encontrada')));
app.use(errorHandler);

try {
  await conectar();
} catch (erro) {
  console.error(`Não foi possível conectar ao MongoDB: ${erro.message}`);
  process.exit(1);
}

app.listen(PORT, (erro) => {
  if (erro) {
    console.error(`Não foi possível iniciar na porta ${PORT}: ${erro.message}`);
    process.exit(1);
  }
  console.log(`Server rodando em http://localhost:${PORT}`);
});
