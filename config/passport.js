"use strict"

var LocalStrategy = require("passport-local").Strategy;

// Setup the db model
var mysql = require("mysql");
var dbconfig = require("./db");

var sql = mysql.createConnection(dbconfig.connection);
sql.connect();
sql.query("USE " + dbconfig.database);

// expose this function to our app using module.exports
module.exports = function(passport) 
{
	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session

	// if (process.env.STAGE == "development")
	// {
	// 	setInterval(async function() {
	// 			sql.query("SELECT 1", function(
	// 				err,
	// 				rows
	// 			) {
	// 				//console.log("rows", rows);
	// 				if (err)
	// 				{
	// 					console.log(err);
	// 				}
	// 				console.log("REQ PASSPORT");
	// 			});
			
	// 	}, 140000); 
	// }
	

    passport.serializeUser(function(admin, done) 
    {
		done(null, admin.id);
	});

	// used to deserialize the user
    passport.deserializeUser(function(id, done) 
    {
		//sql.connect();
		sql.query("SELECT * FROM admins WHERE id = ? ", [id], function(
			err,
			rows
		) {
			//console.log("rows", rows);
			if (err)
			{
				done(err, null);
			}
			done(err, rows[0]);
		});
		//sql.end();
	});

	

	// =========================================================================
	// LOCAL SIGNUP ============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use(
		"local-signup",
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField: "name",
				passwordField: "pass",
				//codeField: "code",
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			function(req, name, password, done) {
				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already 
				//sql.connect();
				sql.query(
					"SELECT * FROM admins WHERE nombre = ?",
					[username],
					function(err, rows) {
						if (err) return done(err);
						if (rows.length) {
							return done(
								null,
								false,
								console.log("El admin ya existe")
							);
						} else {
							// if there is no user with that username
							// create the user
							var newAdminMysql = {
								user_name: name,
								user_password: password // use the generateHash function in our user model
							};
							console.log(newUserMysql);

							var insertQuery =
								"INSERT INTO admins ( name, pass ) values (?,?,?)";

							sql.query(
								insertQuery,
								[
									newAdminMysql.name,
									newAdminMysql.password
								],
								function(err, rows) {
									if (err) console.log(err);
									console.log(rows);
									newAdminMysql.id = rows.insertId;
									console.log("Admin Creado");
									return done(null, newUserMysql);
								}
							);
						}
					}
				);
				//sql.end();
			}
		)
	);

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use(
		"local-login",
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField: "admin_name",
				passwordField: "admin_pass",
				passReqToCallback : true // allows us to pass back the entire request to the callback
			},
			function(req, username, password, done) {

				//sql.connect();
				// console.log(username, password);
				// console.log(typeof username);

				var query =
					"SELECT * FROM admins WHERE nombre = '" +
					username +
					"'";

				//console.log(">> Login Query", query);

				sql.query(query, function(err, rows) {
					//console.log(rows);
					if (err) {
						console.log(err);
						return done(err);
					}

					if (!rows.length) {
						//console.log("done");
						return done(
							null,
							false,
							console.log(">> Usuario no encontrado")
						); // req.flash is the way to set flashdata using connect-flash
					}

					//console.log(">> Correct Query");

					// check password
					if (password != rows[0].pass) {
						//console.log("done");
						return done(
							null,
							false,
							//console.log(">> Contraseña incorrecta")
						); // create the loginMessage and save it to session as flashdata
                    }
                    
                    //console.log(">> Sesión iniciada correctamente.");
					//console.log(">> Selected Rows", rows[0]);
					
                    return done(null, rows[0]);
				});
			}
		)
	);
};
