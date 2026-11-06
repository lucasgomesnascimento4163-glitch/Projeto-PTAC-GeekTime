import express from 'express';
import cors from 'cors';
import obrasRouter from "./routes/obras.routes.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
const PORT = 3000;
 
app.use('/obras', obrasRouter);
 
app.use((_req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use(errorHandler);
 
app.listen(PORT, (erro) => {
  if (erro) {
    console.error(`Não foi possível iniciar na porta ${PORT}: ${erro.message}`);
    process.exit(1);
  }
  console.log(`Server rodando em http://localhost:${PORT}`);
});
 