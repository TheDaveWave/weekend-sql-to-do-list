const pg = require('pg');

const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Connected to postgres');
});

pool.on('error', (error) => {
    console.log('Error connecting to postgres', error);
});

module.exports = pool;