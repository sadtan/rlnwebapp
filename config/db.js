
module.exports = {
	connection: {
		host: "database-1.ccd10d51wnps.us-east-2.rds.amazonaws.com",
		user: process.env.SQL_USER,
		password: process.env.SQL_PASS
	},
	database: "undbtest",
	admins_table: "admins"
};
