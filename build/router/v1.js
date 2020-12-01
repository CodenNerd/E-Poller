"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getStates_1 = __importDefault(require("./controller/getStates"));
// import getLGAs from "./controller/getLGAs";
// import getWards from "./controller/getWards";
// import getPollingUnits from "./controller/getPollingUnits";
// import getPollingUnitResults from "./controller/getPollingUnitResults";
// import getLGASummedResults from "./controller/getLGASummedResults";
// import createPollingUnitResults from "./controller/createPollingUnitResults";
var router = express_1.Router();
router.use(express_1.json());
router.get('/states', getStates_1.default);
// router.get('/states/:state/LGAs', getLGAs);
// router.get('/LGAs/:LGA/wards', getWards);
// router.get('/wards/:ward/pollingUnits', getPollingUnits)
// router.get('/pollingUnits/:pollingUnit/results', getPollingUnitResults);
// router.get('LGAs/:LGA/summedResults', getLGASummedResults);
// router.post('/pollingUnits/:pollingUnit/results', createPollingUnitResults)
exports.default = router;
