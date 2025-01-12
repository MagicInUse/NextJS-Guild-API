import { Router } from 'express';
import guildRoutes from './guild';

const router = Router();

router.use('/guild', guildRoutes);

export default router;