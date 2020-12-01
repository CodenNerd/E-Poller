import db from "./../../database/connection";

const getStates = (req: any, res: any) => {
    const query = "SELECT * FROM states";
    db.query(query, (err: any, result: any) => {
        res.status(err?500:200).send({
            result
        })
    });
}

export default getStates;