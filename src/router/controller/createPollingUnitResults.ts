import db from "./../../database/connection";

const createPollingUnitResults = (req: any, res: any) => {    
    const {polling_unit_uniqueid, party_abbreviation, party_score, entered_by_user, user_ip_address} = req.body;
    const selectQuery = `SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid='${req.body.polling_unit_uniqueid}' AND party_abbreviation='${party_abbreviation}'`;
    db.query(selectQuery, (error, results) => {
        if (results[0]) {
            return res.status(400).send({
                response: "party has already been inserted"
            })
        }
        const query = `INSERT INTO announced_pu_results (\`polling_unit_uniqueid\`, \`party_abbreviation\`, \`party_score\`, \`entered_by_user\`, \`date_entered\`, \`user_ip_address\`) VALUES
                        ('${polling_unit_uniqueid}', '${party_abbreviation}', ${party_score}, '${entered_by_user}', '${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}', '192.168.1.101')`;
        db.query(query, (err: any, result: any) => {
            res.status(err?500:200).send({
                result
            })
        });
    })
    
}

export default createPollingUnitResults;