"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("./../../database/connection"));
var getPollingUnitResults = function (req, res) {
    var query = "SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid='" + req.params.pollingUnit + "'";
    connection_1.default.query(query, function (err, result) {
        res.status(err ? 500 : 200).send({
            result: result
        });
    });
};
exports.default = getPollingUnitResults;
