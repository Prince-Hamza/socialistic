import express from 'express'
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/create',createPost)
router.get('/:id', getPost)
router.put('/:id/update', updatePost)
router.delete('/:id/delete', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)

export default router