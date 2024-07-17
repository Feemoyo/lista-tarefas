import mysql from "mysql";

export const db = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "B33DR1LL",
	  database: "crud"
});

export default db;
