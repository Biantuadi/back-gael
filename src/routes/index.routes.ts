import { Router } from 'express';
import genericRoutes from './medias/index.routes';

import Album from '../models/medias/album.model';
import Song from '../models/medias/song.model';
import Event from '../models/medias/event.model';

import { authRoutes } from './user/auth.routes';
import { userRoutes } from './user/user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/songs', genericRoutes(Song));
router.use('/albums', genericRoutes(Album));
router.use('/events', genericRoutes(Event));

export default router;
