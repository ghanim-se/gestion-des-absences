import express from 'express'
import { getModulesCtrl, createModuleCtrl, updateModuleCtrl, deleteModuleCtrl } from '../controllers/admin/moduleCtrl'
import { adminAuth } from '../middlewares/adminAuth'

const router = express.Router()

router.get('/modules', adminAuth, getModulesCtrl)

router.get('/add_module', adminAuth, createModuleCtrl)
.post('/add_module', adminAuth, createModuleCtrl)

router.get('/update_module/:id', adminAuth, updateModuleCtrl)
.post('/update_module/:id', adminAuth, updateModuleCtrl)

router.get('/delete_module/:id', adminAuth, deleteModuleCtrl)


export {router as modulesRouter}