import express from 'express'
import { deleteUser, followUser, getAllUsers, getUser, queryUser, unfollowUser, updateUser } from '../controllers/UserController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router()

router.get('/:id', getUser)
router.get('/:name/search', queryUser)
router.get('/', getAllUsers)
router.put('/:id', authMiddleWare, updateUser)
router.delete('/:id', authMiddleWare, deleteUser)
router.put('/:id/follow', authMiddleWare, followUser)
router.put('/:id/unfollow', authMiddleWare, unfollowUser)

export default router