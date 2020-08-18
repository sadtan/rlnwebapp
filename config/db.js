
module.exports = {
	connection: {
		host: "rlnprod.ccd10d51wnps.us-east-2.rds.amazonaws.com",
		user: process.env.SQL_USER,
		password: process.env.SQL_PASS
	},
	database: "undbtest",
	admins_table: "admins"
};
