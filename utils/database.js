const mysql = require('mysql');
const config = require('../config/default.json');

// const connection = mysql.createConnection(config.mysql);
// connection.connect();

const pool = mysql.createPool(config.mysql);

module.exports = {
    load : function(sql) {
        return new Promise(function(resolve, reject) {
            pool.query(sql, function(error, result, fields) {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    },
    add : function(table, obj) {
        return new Promise(function(resolve, reject) {
            var sql = 'insert into ' + table + ' set ?';
            pool.query(sql, obj, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            resolve(results);
            });
        });
    },
    detele : function(id) {
        return new Promise(function(resolve, reject) {
            var sql = 'delete from customercart where productId = ' + id;
            pool.query(sql, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            resolve(results);
            });
        });
    },
    update : function(id) {
        return new Promise(function(resolve, reject) {
            var sql = 'delete from customercart where productId = ' + id;
            pool.query(sql, function(error, results, fields) {
            if (error) {
                return reject(error);
            }
            resolve(results);
            });
        });
    }

};

