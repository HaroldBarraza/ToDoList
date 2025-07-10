import postgres from "postgres";
//Connect with the DataBase
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: {
    rejectUnauthorized: false,
  },
});

export default sql;
