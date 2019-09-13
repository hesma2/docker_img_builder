import express from 'express'
import bodyParser from 'body-parser'

var builder = require('./service/builder/build');
var downloader = require('./service/downloader/download');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/imgInfo', (request, response) => {
    console.log('receive POST request');
    console.log(request.body);
    response.status(200).send();

    const osName = request.body.osName;
    const osTag = request.body.osTag;
    const fileName = osName + "_" + osTag + ".tar";
    const filePath = "service/builder/img/";

    builder.build(request.body.osName, request.body.osTag);

    // downloader.download(
    //     fileName, filePath
    // );
})

app.get('/api/download', (request, response) => {
    console.log('receive Get request');
    console.log(request.query);

    const osName = request.query.osName;
    const osTag = request.query.osTag;
    const fileName = osName + "_" + osTag + ".tar";
    const filePath = "./service/builder/img/";

    response.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    response.setHeader('Content-Type', 'application/x-tar');

    const fs = require('fs');
    const fileStream = fs.createReadStream(filePath + fileName);

    fileStream.pipe(response);

    // response.download(filePath + fileName, err => {
    //     if (err) { response.sendStatus(err.status); }
    // });
})

app.listen(port, err => {
    if (err) throw Error(err)
    else console.log(`listening on port ${port}`)
})
