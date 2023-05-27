import express from 'express'
import { createUserCtrl, deleteUserCtrl, getUsersCtrl, updateUserCtrl } from '../controllers/admin/userCtrl'
import { adminAuth } from '../middlewares/adminAuth'

const router = express.Router()

router.get('/users', adminAuth, getUsersCtrl)

router.get('/add_user', adminAuth, createUserCtrl)
.post('/add_user', adminAuth, createUserCtrl)

router.get('/update_user/:id', adminAuth, updateUserCtrl)
.post('/update_user/:id', adminAuth, updateUserCtrl)

router.get('/delete_user/:id', adminAuth, deleteUserCtrl)

export { router as usersRouter }