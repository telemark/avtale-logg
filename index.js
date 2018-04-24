const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handler = require('./lib/handler')
const handleLogs = require('./lib/handler-logs')
const config = require('./config')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
router.use(jwt({secret: config.JWT_SECRET}).unless({path: ['/']}))
router.use(handleUnauthorized)

// ROUTES
router.get('/', handler.getFrontpage)
router.put('/agreements', handleLogs.addAgreement)
router.get('/agreements/:id', handleLogs.getAgreement)
router.post('/agreements/search', handleLogs.searchAgreements)
router.post('/agreements/:id', handleLogs.updateAgreement)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
