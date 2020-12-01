"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var v1_1 = __importDefault(require("./router/v1"));
var connection_1 = __importDefault(require("./database/connection"));
var exec_1 = __importDefault(require("./database/exec"));
var config_1 = require("./database/config");
var dotenv = __importStar(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv.config();
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: false }));
app.use('/api/v1', v1_1.default);
app.get('/', function (req, res) {
    res.send({ response: "Welcome to the home page" });
});
app.get('/createDB', function (req, res) {
    config_1.setDBExists(false);
    var query = "CREATE DATABASE " + process.env.DB_DB;
    connection_1.default.query(query, function (err, result) {
        res.send(err || result);
    });
});
app.get('/runMigrations', function (req, res) {
    config_1.setDBExists(true);
    var query = exec_1.default;
    connection_1.default.query(query, function (err, result) {
        res.send(err || result);
    });
});
app.use(function (req, res) {
    res.status(404).send({ response: "404 - route not found" });
});
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Listening on port " + port); });
exports.default = app;
