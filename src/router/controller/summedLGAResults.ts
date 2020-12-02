import db from "./../../database/connection";

const summedLGAResults = (req: any, res: any) => {    
    const query = `SELECT polling_unit_id FROM polling_unit WHERE lga_id='${req.params.LGA}'`;
    let allResults: any[] = [];
    const arr: any = [];
    db.query(query, (err: any, results: any) => {
        let i: number = 1;
        
        results.forEach((result: any) => {
            
            const selectPURes = `SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid=${result.polling_unit_id}`
            db.query(selectPURes, (error: any, resultt: any)=>{
                
                if(resultt[0]){
                    allResults.push(resultt)                    
                }
                if(i>=results.length){
                    allResults.forEach(r=>{
                        r.forEach((el: any) => {
                            let entry = arr.filter((e: any)=>e.party_abbreviation===el.party_abbreviation)[0]
                            if(entry){
                               entry.party_score += el.party_score
                            }else{
                                entry = {
                                    party_abbreviation: el.party_abbreviation,
                                    party_score: el.party_score
                                }
                            }
                            arr.push(entry);                            
                        });
                    })
                    res.status(err?500:200).send({
                        results: allResults,
                        summed: [...new Set(arr.map((item: { party_abbreviation: any; }) => item.party_abbreviation))].map(m=>{
                            return arr.filter((f: any)=>m===f.party_abbreviation)[0]
                        })
                    })
                }
                i+=1;
            })
        });
        
    });
}

export default summedLGAResults;