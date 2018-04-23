const { json, send } = require('micro')
const config = require('../config')
const mongojs = require('mongojs')
const db = mongojs(config.DB)
const agreements = db.collection('agreements')
const logger = require('./logger')

module.exports.addAgreement = async (request, response) => {
  const data = await json(request)
  agreements.save(data, (error, result) => {
    if (error) {
      logger('error', ['handler-agreements', 'addAgreement', error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-agreements', 'addAgreement', 'success'])
      send(response, 200, result)
    }
  })
}

module.exports.getAgreement = async (request, response) => {
  const { id } = request.params
  const agreementId = mongojs.ObjectId(id)
  logger('info', ['handler-agreements', 'getAgreement', 'id', id])
  agreements.find({_id: agreementId}, (error, documents) => {
    if (error) {
      logger('error', ['handler-agreements', 'getAgreement', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-agreements', 'getAgreement', 'id', id, 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.searchAgreements = async (request, response) => {
  const data = await json(request)
  logger('info', ['handler-agreements', 'searchAgreements', 'data', JSON.stringify(data)])
  agreements.find(data).sort({timeStamp: -1}, (error, documents) => {
    if (error) {
      logger('error', ['handler-agreements', 'searchAgreements', 'data', JSON.stringify(data), error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-agreements', 'searchAgreements', 'data', JSON.stringify(data), 'success'])
      send(response, 200, documents)
    }
  })
}

module.exports.updateAgreement = async (request, response) => {
  const { id } = request.params
  const agreementId = mongojs.ObjectId(id)
  const data = await json(request)
  logger('info', ['handler-agreements', 'updateAgreement', 'id', id])
  agreements.update({'_id': agreementId}, {'$set': data}, (error, document) => {
    if (error) {
      logger('error', ['handler-agreements', 'updateAgreement', 'id', id, error])
      send(response, 500, error)
    } else {
      logger('info', ['handler-agreements', 'updateAgreement', 'success', 'id', id])
      send(response, 200, document)
    }
  })
}
