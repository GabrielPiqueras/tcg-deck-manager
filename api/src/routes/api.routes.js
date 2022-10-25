
// Archivo para manejar las rutas de la API
import Router from 'express';
import { methods as cardController } from '../controllers/card.controller';

const router = Router();

router.get('/api/cards', cardController.getCards);

export default router;