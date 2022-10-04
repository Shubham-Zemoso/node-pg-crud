import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();
export default new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: 5432,
});
