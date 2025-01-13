import { Router } from 'express';
import { getGuildProfile, getGuildRoster, fetchAvatarsHandler } from '../../controllers/guildController';
import BattleNetService from '../../services/battlenetService';

const router = Router();

router.get('/info', getGuildProfile);
router.get('/roster', getGuildRoster);
router.post('/fetchAvatars', fetchAvatarsHandler);

export default router;