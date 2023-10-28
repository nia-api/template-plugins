import { Router } from 'express'
import { getMsg } from './../utils/getMsg'

const router = Router()

// path /template-plugins/helloWorld/sayHelloWorld
router.get('/sayHelloWorld', (request, response) => {
    response.send(getMsg())
})

export default router
