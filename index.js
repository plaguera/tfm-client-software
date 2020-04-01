var staticFile = require('connect-static-file');
var path = require('path');
var express = require('express');
const PORT = process.env.PORT || 3000;

var app = express();
app.use('/client.js', staticFile(path.join(process.cwd(), 'dist/client.js'), {}));
app.get('/', (req, res) => res.send('Serving /client.js'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));