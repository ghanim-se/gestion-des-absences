import express from 'express'
import { createStudentCtrl, deleteStudentCtrl, getStudentsCtrl, updateStudentCtrl } from '../controllers/admin/studentCtrl'
import { adminAuth } from '../middlewares/adminAuth'

const router = express.Router()


router.get('/students', adminAuth, getStudentsCtrl)

router.get('/add_student', adminAuth, createStudentCtrl)
.post('/add_student', adminAuth, createStudentCtrl)

router.get('/update_student/:id', adminAuth, updateStudentCtrl)
.post('/update_student/:id', adminAuth, updateStudentCtrl)

router.get('/delete_student/:id', adminAuth, deleteStudentCtrl)


export {router as studentsRouter}