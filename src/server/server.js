const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// this is the in-memory database ;)
let counter = 0;

let careRequests = [];

app.get('/api/data', function (req, res) {
    counter++;
    return res.json({name: 'sunshine', counter: counter});
});

app.post('/api/care-requests', function (req, res) {
    try {
        const request = validateRequest(req.body);
        careRequests.push(request);
        return res.sendStatus(201);
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(400).send(e.message);
        } else {
            return res.sendStatus(500).send(e.message);
        }
    }
});

// TODO:  improve validation
function validateRequest(body) {
    if (!body.typeOfCare || !body.startTimestamp || !body.endTimestamp || !body.clientName || !body.information) {
        throw new ValidationError('Defined properties required for: typeOfCare, startTimestamp, endTimestamp, clientName, information');
    }
    return body;
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}

const server = app.listen(process.env.PORT || 8080);

module.exports = {app, server};
