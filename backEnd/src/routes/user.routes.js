import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { loginUser, resisterUser, userSList } from '../controllers/user.controller.js'
import { authorityCheck } from '../middlewares/authorityCheck.middleware.js'

export const userRoutes=Router()

userRoutes.route("/resister").post(upload.none(),resisterUser)
userRoutes.route("/log-in").post(upload.none(),loginUser)
userRoutes.route('/users-list').get(authorityCheck,userSList)


