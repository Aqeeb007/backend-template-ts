import { Router } from 'express'
import ApiController from '../controller/apiController'
const router = Router()

router.route('/self').get(ApiController.self)
router.route('/health').get()

export default router
