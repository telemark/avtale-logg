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

module.exports.getAgreementParts = async (request, response) => {
  const { id } = request.params
  logger('info', ['handler-logs', 'getAgreementParts', 'partId', id])
  logs.find({partId: id}, (error, documents) => {
    if (error) {
      logger('error', ['handler-logs', 'getAgreementParts', 'partId', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-logs', 'getAgreementParts', 'partId', id, 'got part'])
      if (documents.length === 1) {
        const part = documents[0]
        const agreementId = part.agreementId
        logger('info', ['handler-logs', 'getAgreementParts', 'agreementId', agreementId, 'looking up parts'])
        logs.find({agreementId: agreementId}, (error, documents) => {
          if (error) {
            logger('error', ['handler-logs', 'getAgreementParts', 'agreementId', agreementId, error])
            send(response, 500, error)
          } else {
            logger('info', ['handler-logs', 'getAgreementParts', 'agreementId', agreementId, 'success'])
            send(response, 200, documents)
          }
        })
      } else {
        logger('error', ['handler-logs', 'getAgreementParts', 'partId', id, 'documents', documents.length])
        const error = new Error(`Unexpected number of documents. Expected 1, found ${documents.length}`)
        send(response, 500, error.message)
      }
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
