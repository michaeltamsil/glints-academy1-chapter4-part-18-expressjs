let http = require('http')
let fs = require('fs')
let url = require('url')

// Create a server
http.createServer((request, response) => {
    // Parse the request containing file name
    let { pathname } = url.parse(request.url);

    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.")

    // Read the requested file content from file system
    fs.readFile(pathname.substr(1), (err, data) => {
        if (err) {
            console.log(err);
            // HTTP Status: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {
                'Content-type': 'text/html'
            })
        } else {
            // Page found
            // HTTP Status: 200: OK
            // Content Type: text/plain
            response.writeHead(200, {
                'Content-Type': 'text/html'
            })
            response.write(data.toString());
        }
        // Send the response body
        response.end()
    })
}).listen(8081)

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/')