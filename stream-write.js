var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();

app.post('*', function (req, res) {
   req.pipe(fs.createWriteStream('write.txt'));
   res.end('\n');
});
app.listen(3000);