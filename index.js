const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handler = require('./lib/handler')
const handleLogs = require('./lib/handler-logs')
const handleStats = require('./lib/handler-stats')
const config = require('./config')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
router.use(jwt({secret: config.JWT_SECRET}).unless({path: ['/', '/stats/total', /\/stats\/total/i, '/stats/types', '/stats/read', '/stats/agreements']}))
router.use(handleUnauthorized)

// ROUTES
router.get('/', handler.getFrontpage)
router.put('/agreements', handleLogs.addAgreement)
router.get('/agreements/:id', handleLogs.getAgreement)
router.get('/agreements/parts/:id', handleLogs.getAgreementParts)
router.post('/agreements/search', handleLogs.searchAgreements)
router.post('/agreements/:id', handleLogs.updateAgreement)
router.get('/stats/total', handleStats.total)
router.get('/stats/total/:status', handleStats.total)
router.get('/stats/types', handleStats.types)
router.get('/stats/read', handleStats.read)
router.get('/stats/agreements', handleStats.agreements)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
