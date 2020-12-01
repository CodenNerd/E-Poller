"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
var db;
function handleDisconnect() {
    db = mysql_1.default.createPool(config_1.default);
    db.getConnection(function (err, conn) {
        console.log(err || "Db connected");
        conn.release();
        if (err)
            setTimeout(handleDisconnect, 2000);
    });
    db.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        }
        else { // connnection idle timeout (the wait_timeout
            throw err; // server variable configures this)
        }
    });
}
handleDisconnect();
exports.default = db;
