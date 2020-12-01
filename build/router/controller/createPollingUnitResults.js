"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("./../../database/connection"));
var createPollingUnitResults = function (req, res) {
    var _a = req.body, polling_unit_uniqueid = _a.polling_unit_uniqueid, party_abbreviation = _a.party_abbreviation, party_score = _a.party_score, entered_by_user = _a.entered_by_user, user_ip_address = _a.user_ip_address;
    var selectQuery = "SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid='" + req.body.polling_unit_uniqueid + "' AND party_abbreviation='" + party_abbreviation + "'";
    connection_1.default.query(selectQuery, function (error, results) {
        if (results[0]) {
            return res.status(400).send({
                response: "party has already been inserted"
            });
        }
        var query = "INSERT INTO announced_pu_results (`polling_unit_uniqueid`, `party_abbreviation`, `party_score`, `entered_by_user`, `date_entered`, `user_ip_address`) VALUES\n                        ('" + polling_unit_uniqueid + "', '" + party_abbreviation + "', " + party_score + ", '" + entered_by_user + "', '" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "', '192.168.1.101')";
        connection_1.default.query(query, function (err, result) {
            res.status(err ? 500 : 200).send({
                result: result
            });
        });
    });
};
exports.default = createPollingUnitResults;
