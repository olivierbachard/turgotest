
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { zoomMettingsClient } from "./services/zoom.client";

app.get('/api/zoom/meetings/get', (req: any, res: any) => {
    console.log(req.body);
    zoomMettingsClient.getAll()
        .then(rsp => {
            res.send(rsp);
        });
});

app.post('/api/zoom/meetings/create', (req: any, res: any) => {
    console.log(req.body);
    zoomMettingsClient.create(req.body)
        .then(success => {
            res.send({ success: success });
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));