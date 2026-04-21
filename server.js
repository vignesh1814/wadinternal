//Create a Node.js server using http, os, path ,events modules 
const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');


const eventEmitter = new EventEmitter();


eventEmitter.on('request_received', (url) => {
    console.log(`Request received for url: ${url}`);
});


eventEmitter.on('event_page_visited', (time) => {
    console.log(`Event page was visited at time: ${time}`);
});


const server = http.createServer((req, res) => {

  
    eventEmitter.emit('request_received', req.url);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        res.write("<h1>Welcome to Node.js Server</h1><p>This server has os ,path ,event modules </p>");
    }

    else if (req.url === '/os') {
        res.write("<h2>OS Module Information</h2>");
        res.write(`Platform: ${os.platform()}<br>`);
        res.write(`CPU Architecture: ${os.arch()}<br>`);
        res.write(`Free Memory: ${os.freemem()}<br>`);
        res.write(`Total Memory: ${os.totalmem()}<br>`);
    }

    else if (req.url === '/path') {
        res.write("<h2>Path Module Information</h2>");
        const filePath = __filename;

        res.write(`File Name: ${path.basename(filePath)}<br>`);
        res.write(`Directory: ${path.dirname(filePath)}<br>`);
        res.write(`Extension: ${path.extname(filePath)}<br>`);
    }

    else if (req.url === '/event') {

       
        eventEmitter.emit('event_page_visited', new Date().toLocaleString());

        res.write("<h2>Event Module Demo</h2>");
        res.write("Check console for event message!");
    }

    else {
        res.write("<h2>404 - Page Not Found</h2>");
    }

    res.end();
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});