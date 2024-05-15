const hospitalModel = require('../models/hospital-model')
const apiKeyModel = require('../models/api-key-model')

const hospitalsController = {
    read: async (req, res) => {
        const api_key = req.header("x-api-key");
        console.log(api_key)
        if (api_key === undefined)
        {
            const error = new Error("Bad request. Missing x-api-key header.")
            res.status(400).json({
                status: 400,
                error: error.message,
                response: {}
            });
            return;
        }

        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();

        if (api_doc.length === 0)
        {
            const error = new Error("Unauthorized")
            res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            });
            return;
        }


        let query = {};

        let queryString = req.query;

        if (queryString.provider_id) {
            query.provider_id = parseInt(queryString.provider_id);
        }
        if (queryString.city) {
            query.city = new RegExp(queryString.city, 'i');
        }
        if (queryString.state) {
            query.state = new RegExp(queryString.state, 'i');
        }
        if (queryString.county_name) {
            query.county_name = new RegExp(queryString.county_name, 'i');
        }
        if (queryString.hospital_name) {
            query.hospital_name = new RegExp(queryString.hospital_name, 'i');
        }
        if (queryString.hospital_type) {
            query.hospital_type = new RegExp(queryString.hospital_type, 'i');
        }
        if (queryString.hospital_ownership) {
            query.hospital_ownership = new RegExp(queryString.hospital_ownership, 'i');
        }
        if (queryString.emergency_services) {
            query.emergency_services = queryString.emergency_services === 'true';
        }

        const hospitals = await hospitalModel.find(query).exec();
        if (hospitals.length === 0)
        {
            const error = new Error("Resource not found.");
            res.status(404).json({
                status: 404,
                error: error.message,
                response: {}
            })
        }
        else
            res.json({response: hospitals});
    },
    create: async (req, res) => {
        const api_key = req.header("x-api-key");
        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();
        const access_level = api_doc.pop().access_level;
        if (access_level === 1)
        {
            const response = await hospitalModel.create(req.body);
            res.status(201).json({response: response});
        } else {
            const error = new Error("Unauthorized")
            res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            })
        }
    },
    update: async (req,res) => {
        const id = req.params.id;
        const api_key = req.header("x-api-key");
        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();
        const access_level = api_doc.pop().access_level;
        if (access_level === 1)
        {
            const response = await hospitalModel.findOneAndUpdate(
                {provider_id: id}, req.body, {upsert: true}
            ).exec();
            res.json({response: response});
        } else {
            const error = new Error("Unauthorized")
            res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            })
        }
    },
    patch: async (req,res) => {
        const id = req.params.id;
        const api_key = req.header("x-api-key");
        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();
        const access_level = api_doc.pop().access_level;
        if (access_level === 1)
        {
            const response = await hospitalModel.findOneAndUpdate(
                {provider_id: id}, req.body, {upsert: false}
            ).exec();
            res.json({response: response});
        } else {
            const error = new Error("Unauthorized")
            res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            })
        }
    },
    delete: async (req,res) =>
    {
        const id = req.params.id ? req.params.id : req.query.provider_id;
        if (id === null)
        {
            const error = new Error("Bad request")
            res.status(400).json({
                status: 400,
                error: error.message,
                response: {}
            });
            return;
        }

        const api_key = req.header("x-api-key");
        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();
        const access_level = api_doc.pop().access_level;
        if (access_level === 1)
        {
            const response = await hospitalModel.findOneAndDelete(
                {provider_id: id}).exec();
            res.json({response: response});
        } else {
            const error = new Error("Unauthorized")
            res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            })
        }
    }
}

module.exports = hospitalsController;