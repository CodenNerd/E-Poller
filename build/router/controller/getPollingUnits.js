"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("./../../database/connection"));
var getPollingUnits = function (req, res) {
    var query = "SELECT * FROM polling_unit WHERE lga_id='" + req.params.LGA + "' AND ward_id='" + req.params.ward + "'";
    connection_1.default.query(query, function (err, result) {
        res.status(err ? 500 : 200).send({
            result: result
        });
    });
};
exports.default = getPollingUnits;
