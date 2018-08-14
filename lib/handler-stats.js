const { send } = require('micro')
const { parse } = require('url')
const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')
const logger = require('./logger')

exports.total = async (request, response) => {
  const { status } = request.params
  const { query } = await parse(request.url, true)
  let q = query || {}
  if (status) {
    q = Object.assign({}, q, {status: status})
  }
  logger('info', ['handler-stats', 'total', 'status', status || 'any'])
  logs.count(q, (error, count) => {
    if (error) {
      logger('error', ['handler-stats', 'total', error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-stats', 'total', 'success', count])
      send(response, 200, {total: count})
    }
  })
}

exports.status = async (request, response) => {
  logger('info', ['handler-stats', 'status'])
  const { query } = await parse(request.url, true)
  const q = query || {}
  logs.aggregate([{'$match': q}, {'$group': {'_id': '$status', 'total': {'$sum': 1}}}])
    .sort({'total': -1}, (error, data) => {
      if (error) {
        logger('error', ['handler-stats', 'status', error])
        send(response, 500, error)
      } else {
        logger('info', ['handler-stats', 'status', 'success'])
        send(response, 200, data)
      }
    })
}

exports.types = async (request, response) => {
  logger('info', ['handler-stats', 'types'])
  const { query } = await parse(request.url, true)
  const q = query || {}
  logs.aggregate([{'$match': q}, {'$group': {'_id': '$agreementType', 'total': {'$sum': 1}}}])
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

exports.read = async (request, response) => {
  logger('info', ['handler-stats', 'read'])
  const { query } = await parse(request.url, true)
  const q = query || {}
  logs.aggregate([{'$match': q}, {'$group': {'_id': '$readStatus', 'total': {'$sum': 1}}}])
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

exports.agreements = async (request, response) => {
  logger('info', ['handler-stats', 'agreements'])
  const { query } = await parse(request.url, true)
  const q = query || {}
  logs.aggregate([{'$match': q}, {'$group': {'_id': '$agreementId', 'status': {'$addToSet': '$status'}}}, {'$group': {'_id': '$status', 'total': {'$sum': 1}}}])
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
