import dotenv from "dotenv";
import sql from "mssql";

dotenv.config({ path: ".env.local" });

const user = process.env.DB_USER || "sa";
const password = process.env.SA_PASSWORD || "";
const server = process.env.DB_SERVER || "localhost";
const database = process.env.DB_DATABASE || "master";

const config = {
  user,
  password,
  server,
  database,
  stream: false,
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

async function runQuery() {
  try {
    const pool = await sql.connect(config);
    const result = await sql.query`SELECT * FROM spt_fallback_db`;
    console.dir(result);
    pool.close();
  } catch (err) {
    console.error("SQL error", err);
  }
}

runQuery();
