import { Router } from 'express';
import genericRoutes from './medias/main.routes';

import Album from '../models/medias/album.model';
import Song from '../models/medias/song.model';
import Event from '../models/medias/event.model';
import Streaming from '../models/medias/streaming.model';
import Radio from '../models/medias/radios.model';
import Podcast from '../models/medias/podcasts.model';
import Enseignement from '../models/medias/enseignement.model';

import { authRoutes } from './user/auth.routes';
import { userRoutes } from './user/user.routes';
import chatRoutes from './chats/chat.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/chats', chatRoutes);
router.use('/chats', genericRoutes(Album));
router.use('/songs', genericRoutes(Song));
router.use('/albums', genericRoutes(Album));
router.use('/events', genericRoutes(Event));
router.use('/streamings', genericRoutes(Streaming));
router.use('/radios', genericRoutes(Radio));
router.use('/podcasts', genericRoutes(Podcast));
router.use('/enseignements', genericRoutes(Enseignement));


export default router;