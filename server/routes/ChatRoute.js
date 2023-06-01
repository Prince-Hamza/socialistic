import express from 'express'
import { createChat, findChat, userChats, onInteractionForChat } from '../controllers/ChatController.js';
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat)

router.post('/onInteractionForChat', onInteractionForChat)


export default router