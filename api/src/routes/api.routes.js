
// Archivo para manejar las rutas de la API
import Router from 'express';
import { methods as cardController } from '../controllers/card.controller';
import { methods as rarityController } from '../controllers/rarity.controller';

import { methods as tcgApiController } from '../controllers/tcgApi.controller';

const router = Router();

// Import routes
router.get('/api/import-cards', tcgApiController.importCards);
router.get('/api/import-rarities', tcgApiController.importRatities);

// Normal routes
router.get('/api/cards', cardController.getCards);
router.get('/api/rarities', rarityController.getRarities);

export default router;