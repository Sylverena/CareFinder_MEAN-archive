const mongoose = require('mongoose')

const apiKeySchema
    = new mongoose.Schema({
    api_key: {type: String, trim: true, unique: true},
    access_level: {type: Number}
})

module.exports = mongoose.model('api-keys', apiKeySchema)