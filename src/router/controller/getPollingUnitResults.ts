import db from "./../../database/connection";

const getPollingUnitResults = (req: any, res: any) => {
    const query = `SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid='${req.params.pollingUnit}'`;
    db.query(query, (err: any, result: any) => {
        res.status(err?500:200).send({
            result
        })
    });
}

export default getPollingUnitResults;