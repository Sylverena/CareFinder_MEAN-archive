const apiKeyModel = require('../models/api-key-model')
const keygen = require('apikeygen')
const hospitalModel = require("../models/hospital-model");

const apiKeyController = {
    read: async  (req,res) => {
        const api_key = req.header("x-api-key");
        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();
        const access_level = api_doc.pop().access_level;
        if (access_level === 1)
        {
            let query = {};

            let queryString = req.query;

            console.log(queryString)
            if (queryString.key) {
                query.api_key = queryString.key;
            }
            const response = await apiKeyModel.find(query).exec();

            if (response.length === 0)
            {
                const error = new Error("Not found")
                res.status(404).json({
                    status: 404,
                    error: error.message,
                    response: {}
                });
                return;
            }

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
    post: async (req, res) => {
        let query = {api_key: keygen.apikey()};

        if (req.query.access_level === '1')
        {
            query.access_level = 1;
        }
        else
            query.access_level = 2;


        const key = await apiKeyModel.create(query);

        res.status(201).json({response: key});
    },
    delete: async (req,res) =>
    {
        const api_key = req.header("x-api-key");
        const api_doc = await apiKeyModel.find({api_key: api_key}).exec();
        const access_level = api_doc.pop().access_level;

        if (access_level === 1) {
            const queryString = req.query;

            if (!queryString.key) {
                const error = new Error("Bad request")
                res.status(400).json({
                    status: 400,
                    error: error.message,
                    response: {}
                });
                return;
            }

            const response = await apiKeyModel.findOneAndDelete({api_key: queryString.key}).exec();

            if (response.length === 0) {
                const error = new Error("Not found")
                res.status(404).json({
                    status: 404,
                    error: error.message,
                    response: {}
                });
            }
        }  else {
            const error = new Error("Unauthorized")
            res.status(403).json({
                status: 403,
                error: error.message,
                response: {}
            })
        }
    }
}

module.exports = apiKeyController;