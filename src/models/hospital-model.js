const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    provider_id: {type: String, unique: true, trim: true},
    hospital_name: {type: String, trim: true},
    address: {type: String, trim: true},
    city: {type: String, trim: true},
    state: {type: String, trim: true},
    zip_code: {type: String, trim: true},
    county_name: {type: String, trim: true},
    phone_number: {
        _phone_number: {type: String, trim: true}
    },
    hospital_type: {type: String, trim: true},
    hospital_ownership: {type: String, trim: true},
    emergency_services: {type: Boolean},
    location: {
        _human_address: {
            address: {type: String, trim: true},
            city: {type: String, trim: true},
            state: {type: String, trim: true},
            zip: {type: String, trim: true}
        },
        _latitude: {type: String, trim: true},
        _longitude: {type: String, trim: true},
        _needs_recording: {type: Boolean}
    }
})


module.exports = mongoose.model('hospitals', hospitalSchema)