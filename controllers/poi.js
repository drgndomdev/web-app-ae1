const bodyParser = require('body-parser');
const conn = require('../routes/mysqlconn');
// require router 

exports.home = async(req, res) => {
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
		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
		(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json(results);
				}
		});
}
