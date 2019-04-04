const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handler = require('./lib/handler')
const handleLogs = require('./lib/handler-logs')
const handleStats = require('./lib/handler-stats')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
if (process.env.JWT_SECRET) {
  router.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/', /\/stats/i] }))
  router.use(handleUnauthorized)
}

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
router.get('/stats/status', handleStats.status)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
