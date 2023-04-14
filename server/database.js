const mysql = require('mysql2')
const config = require('config')
const knex = require('knex')

const connection = require('knex')({
    client: 'mysql',
    connection: {
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        namedPlaceholders: true
    },
    searchPath: ['knex', 'public'],
})

module.exports = connection
