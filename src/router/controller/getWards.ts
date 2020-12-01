import db from "./../../database/connection";

const getWards = (req: any, res: any) => {
    const query = `SELECT * FROM ward WHERE lga_id='${req.params.LGA}'`;
    db.query(query, (err: any, result: any) => {
        res.status(err?500:200).send({
            result
        })
    });
}

export default getWards;