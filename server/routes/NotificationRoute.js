import express from 'express'
import { getNotifications, notify } from '../controllers/NotificationController.js'

const router = express.Router()

router.post('/', notify)
router.get('/getNotifications', getNotifications)

export default router

