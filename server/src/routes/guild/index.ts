import { Router } from 'express';
import { getGuildProfile, getGuildRoster } from '../../controllers/guildController';

const router = Router();

router.get('/info', getGuildProfile);
router.get('/roster', getGuildRoster);

export default router;