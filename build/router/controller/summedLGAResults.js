"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("./../../database/connection"));
var summedLGAResults = function (req, res) {
    var query = "SELECT polling_unit_id FROM polling_unit WHERE lga_id='" + req.params.LGA + "'";
    var allResults = [];
    var arr = [];
    connection_1.default.query(query, function (err, results) {
        var i = 1;
        results.forEach(function (result) {
            var selectPURes = "SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid=" + result.polling_unit_id;
            connection_1.default.query(selectPURes, function (error, resultt) {
                if (resultt[0]) {
                    allResults.push(resultt);
                }
                if (i >= results.length) {
                    allResults.forEach(function (r) {
                        r.forEach(function (el) {
                            var entry = arr.filter(function (e) { return e.party_abbreviation === el.party_abbreviation; })[0];
                            if (entry) {
                                entry.party_score += el.party_score;
                            }
                            else {
                                entry = {
                                    party_abbreviation: el.party_abbreviation,
                                    party_score: el.party_score
                                };
                            }
                            arr.push(entry);
                        });
                    });
                    res.status(err ? 500 : 200).send({
                        results: allResults,
                        summed: __spread(new Set(arr.map(function (item) { return item.party_abbreviation; }))).map(function (m) {
                            return arr.filter(function (f) { return m === f.party_abbreviation; })[0];
                        })
                    });
                }
                i += 1;
            });
        });
    });
};
exports.default = summedLGAResults;
