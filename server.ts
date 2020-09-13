
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req: any, res: any) => {
    res.send({ express: 'Hello From Express' });
});

import { zoomMettingsClient } from "./services/zoom.client";

app.post('/api/zoom/meetings/create', (req: any, res: any) => {
    console.log(req.body);
    zoomMettingsClient.create(req.body)
        .then(success => {
            res.send({ success: success });
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));