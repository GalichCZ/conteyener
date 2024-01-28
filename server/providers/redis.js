const dotenv = require('dotenv');
const { createClient } = require('redis');

dotenv.config();

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
});

module.exports = client;
