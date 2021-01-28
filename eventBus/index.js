const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('https://4000-daac66df-85fc-40b8-8dd2-fd5026da8f90.ws-us03.gitpod.io/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('https://4003-daac66df-85fc-40b8-8dd2-fd5026da8f90.ws-us03.gitpod.io/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('https://4001-daac66df-85fc-40b8-8dd2-fd5026da8f90.ws-us03.gitpod.io/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('https://4002-daac66df-85fc-40b8-8dd2-fd5026da8f90.ws-us03.gitpod.io/events', event).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005')
}) 