import db from "./../../database/connection";

const getPollingUnits = (req: any, res: any) => {
    const query = `SELECT * FROM polling_unit WHERE lga_id='${req.params.LGA}' AND ward_id='${req.params.ward}'`;
    db.query(query, (err: any, result: any) => {
        res.status(err?500:200).send({
            result
        })
    });
}

export default getPollingUnits;