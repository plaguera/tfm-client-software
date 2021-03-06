var path = require('path');
var express = require('express');
const PORT = process.env.PORT || 3000;

var app = express();
console.log(process.cwd());
app.use('/public', express.static(path.join(process.cwd(), 'dist')))
app.get('/', (req, res) => res.send('Serving /client.js'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));