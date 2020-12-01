import mysql from 'mysql';
import dbConfig from "./config";

let db: any;
function handleDisconnect() {
    db = mysql.createPool(dbConfig)

    db.getConnection((err: any, conn: any)=>{
        console.log(err || "Db connected")
        conn.release();
        if(err) setTimeout(handleDisconnect, 2000);
    })

    db.on('error', function(err: any) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
}

handleDisconnect();
export default db;
