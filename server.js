//Create a node server using http ,os,path and events module
const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('request_received', (url) => {
    console.log(`Request received for: ${url}`);
});

eventEmitter.on('event_page_visited', (time) => {
    console.log('event page visited at ${time}');
});

