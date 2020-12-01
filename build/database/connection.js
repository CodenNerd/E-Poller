"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
var db = mysql_1.default.createConnection(config_1.default);
db.connect(function (err) {
    console.log(err || "Db connected");
});
exports.default = db;