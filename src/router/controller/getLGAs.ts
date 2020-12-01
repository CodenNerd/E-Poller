import db from "./../../database/connection";

const getLGAs = (req: any, res: any) => {
    const query = `SELECT * FROM lga where state_id='${req.params.state}'`;
    db.query(query, (err: any, result: any) => {
        res.status(err?500:200).send({
            result
        })
    });
}

export default getLGAs;