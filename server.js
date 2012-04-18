var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    'html'  : 'text/html',
    'js'    : 'text/javascript',
    'css'   : 'text/css'
};

http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);

    path.exists(filename, function (exists) {
        if (!exists) {
            if (filename.indexOf('favico') == -1) {
                console.log('server: file not found (' + filename + ')');
            }
            response.end();
            return;
        }

        var extension = path.extname(filename).match(new RegExp('\.([^\.]+)$'));
        if (extension && extension.length > 0) {
            var mimeType = mimeTypes[extension[1]];
            response.writeHead(200, {'Content-Type': mimeType});
        } else {
            // This simple server isn't smart enough to redirect to directory indices
            console.log('server: invalid file extension');
            return;
        }

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);
    });
}).listen(8888);