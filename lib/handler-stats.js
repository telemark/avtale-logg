const { send } = require('micro')
const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')
const logger = require('./logger')

exports.total = (request, response) => {
  const { status } = request.params
  const query = status ? {status: status} : {}
  logger('info', ['handler-stats', 'total', 'status', status || 'any'])
  logs.count(query, (error, count) => {
    if (error) {
      logger('error', ['handler-stats', 'total', error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-stats', 'total', 'success', count])
      send(response, 200, {total: count})
    }
  })
}

exports.types = (request, response) => {
  logger('info', ['handler-stats', 'types'])
  const query = {}
  logs.aggregate([{'$match': query}, {'$group': {'_id': '$agreementType', 'total': {'$sum': 1}}}])
    .sort({'total': -1}, (error, data) => {
      if (error) {
        logger('error', ['handler-stats', 'types', error])
        send(response, 500, error)
      } else {
        logger('info', ['handler-stats', 'types', 'success'])
        send(response, 200, data)
      }
    })
}

exports.read = (request, response) => {
  logger('info', ['handler-stats', 'read'])
  const query = {}
  logs.aggregate([{'$match': query}, {'$group': {'_id': '$readStatus', 'total': {'$sum': 1}}}])
    .sort({'total': -1}, (error, data) => {
      if (error) {
        logger('error', ['handler-stats', 'read', error])
        send(response, 500, error)
      } else {
        logger('info', ['handler-stats', 'read', 'success'])
        send(response, 200, data)
      }
    })
}

exports.agreements = (request, response) => {
  logger('info', ['handler-stats', 'agreements'])
  const query = {}
  logs.aggregate([{'$match': query}, {'$group': {'_id': '$agreementId', 'status': {'$addToSet': '$status'}}}, {'$group': {'_id': '$status', 'total': {'$sum': 1}}}])
    .sort({'total': -1}, (error, data) => {
      if (error) {
        logger('error', ['handler-stats', 'agreements', error])
        send(response, 500, error)
      } else {
        logger('info', ['handler-stats', 'agreements', 'success'])
        send(response, 200, data)
      }
    })
}
