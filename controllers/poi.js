const bodyParser = require('body-parser');
const conn = require('../routes/mysqlconn');

exports.review = async(req, res) => {
	try {
		conn.query(`SELECT * FROM poinstofinterest WHERE id=?`, [req.params.id],
		(error, results, fields) => {
			if(erorr) {
				res.status(500).json({error: error});
			} else if (results){
				res.json(results);
			}
		});
	} catch (e) {
		console.log(`Error ${e}`);
	}
}
exports.recent = async(req, res) => {
		try {
			conn.query(`SELECT * FROM pointsofinterest ORDER BY ID DESC LIMIT 10`, 
					(error, results, fields) => {
							if (error) {
									res.status(500).json({error:error});
							} else {
									res.render('home', {
											root:results
									});
							}
					}
			);
		} catch (e) {
			console.log(`Error ${e} has occured`);
		}
}

exports.recommend = async(req, res) => {
		try {
			conn.query(`UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE id=?`, [req.params.id],
			(error, results, fields) => {
				if(error) {
						res.status(500).json({error:error});
				} else if(results.affectedRows==1) {
						res.json({'message': 'Recomendation sent!'});
				} else {
						res.status(404).json({error: 'ID not found!'});
				}
			});
		} catch(e) {
			console.log(`Error ${e} has occured!`);
		}
}

exports.search = async(req, res) => {
		try {
		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
			(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json(results);
				}
		});
		} catch (e) {
			console.log(`Error ${e} has occured`);
		}
}

exports.add = async(req, res) => {
		try {
				if(!req.body.name || !req.body.type || !req.body.country || !req.body.region || !req.body.lon || !req.body.lat || !req.body.description) {
					res.status(402).json({error: "Add Error - Null value"});
				} else {
					conn.query(`INSERT INTO pointsofinterest( name, type, country, region, lon, lat, description) VALUES(?, ?, ?, ?, ?, ?, ?)`, [req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], 
					(error, results, fields) => {
					if (error) {
						res.status(500).json({error:error});
					} else {
						res.json({success:1});
					}
			});} 
		} catch (e) {
				console.log(`Error ${e} has occured`);
		}
}

// function simpleCheck(req) {
	// Object.values(req).forEach(value => {
		// console.log(value);
		// return true;
	// });
// }
// 
// function isEmptyJson(arguments) {
	// console.log(arguments);
		// Object.values(argument).forEach(element => {
			// console.log(element);
				// if(element === typeof('string') || element instanceof String) {
					// console.log("String");
				// } else if (element instanceof Number) {
					// console.log("Number");
				// } else {
					// console.log("False");
					// return false;
				// }
			// });
// 
		// return true;
	/*try {
		JSON.parse(str);
    } catch (err) {
        return false;
    }	
	console.log("check pass");
	return true;*/
// }
