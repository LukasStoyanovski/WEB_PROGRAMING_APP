const config = require('../../pkg/config');
const express = require('express');
const jwt = require('express-jwt');
const fileUpload = require('express-fileupload');
const storage = require('./handlers/storage');

const api = express();

// api.use(jwt({
//     secret: config.get('security').jwt_key,
//     algorithms: ['HS256']
// }).unless({
//     path:[
//         '/api/v1/storage/:filename'
//     ]
// }));
api.use(fileUpload());

api.post('/api/v1/storage', storage.upload);
api.get('/api/v1/storage/:filename', storage.download);
api.delete('/api/v1/storage/:filename', storage.remove);

api.listen(config.get('services').storage.port, err => {
    if (err) return console.log(err);
    console.log(`Service started on port ${config.get('services').storage.port}`);
});