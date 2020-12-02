import { Router, json } from 'express';
import getStates from './controller/getStates';
import getLGAs from "./controller/getLGAs";
import getWards from "./controller/getWards";
import getPollingUnits from "./controller/getPollingUnits";
import getPollingUnitResults from "./controller/getPollingUnitResults";
import createPollingUnitResults from "./controller/createPollingUnitResults";
import summedLGAResults from './controller/summedLGAResults';

const router = Router();
router.use(json());

router.get('/states', getStates)
router.get('/states/:state/LGAs', getLGAs);
router.get('/LGAs/:LGA/wards', getWards);
router.get('/LGAs/:LGA/wards/:ward/pollingUnits', getPollingUnits)
router.get('/pollingUnits/:pollingUnit/results', getPollingUnitResults);
router.get('/LGAs/:LGA/summedresults', summedLGAResults);
router.post('/pollingUnits/:pollingUnit/results', createPollingUnitResults)

export default router;
