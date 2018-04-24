const { json, send } = require('micro')
const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const logs = db.collection('logs')
const logger = require('./logger')

module.exports.addAgreement = async (request, response) => {
  const data = await json(request)
  logs.save(data, (error, result) => {
    if (error) {
      logger('error', ['handler-logs', 'addAgreement', error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-logs', 'addAgreement', 'success'])
      send(response, 200, result)
    }
  })
}

module.exports.getAgreement = async (request, response) => {
  const { id } = request.params
  const agreementId = mongojs.ObjectId(id)
  logger('info', ['handler-logs', 'getAgreement', 'id', id])
  logs.find({_id: agreementId}, (error, documents) => {
    if (error) {
      logger('error', ['handler-logs', 'getAgreement', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-logs', 'getAgreement', 'id', id, 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.searchAgreements = async (request, response) => {
  const data = await json(request)
  logger('info', ['handler-logs', 'searchAgreements', 'data', JSON.stringify(data)])
  logs.find(data).sort({timeStamp: -1}, (error, documents) => {
    if (error) {
      logger('error', ['handler-logs', 'searchAgreements', 'data', JSON.stringify(data), error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-logs', 'searchAgreements', 'data', JSON.stringify(data), 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.updateAgreement = async (request, response) => {
  const { id } = request.params
  const agreementId = mongojs.ObjectId(id)
  const data = await json(request)
  logger('info', ['handler-logs', 'updateAgreement', 'id', id])
  logs.update({'_id': agreementId}, {'$set': data}, (error, document) => {
    if (error) {
      logger('error', ['handler-logs', 'updateAgreement', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-logs', 'updateAgreement', 'success', 'id', id])
      send(response, 200, document)
    }
  })
}
