var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Restaurant Webservices' });
});

module.exports = router;

/* Create Food Service. */
router.post('/addFood', function(req,res,next){
try{
	var reqObj = req.body;
	console.log(reqObj);
	req.getConnection(function(err, conn){
		if(err)
		{
			console.error('SQL Connection error: ', err);
			return next(err);
		}
		else
		{
			var insertSql = "INSERT INTO food SET ?";
			var insertValues = {
			"FoodName" : reqObj.FoodName,
			"Price" : reqObj.Price,
      "Value" : reqObj.Value,
      "Calories" : reqObj.Calories,
      "Type" : reqObj.Type
			};
			var query = conn.query(insertSql, insertValues, function (err, result){
				if(err){
				console.error('SQL error: ', err);
				return next(err);
				}
				console.log(result);
				var IdOfFood = result.insertId;
				res.json({"Food_ID":IdOfFood});
			});
		}
		});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

/* Get Food Service. */
router.get('/food/:id?', function(req, res, next) {
    try {
      var foodId = req.params.id
    	/*var anything = req.param('roleId');*/
  		var query = url.parse(req.url,true).query;
  		console.log(query);

        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('SELECT * FROM restaurant.food where Food_id = ?;',[foodId], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }
                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
router.get('/allfood', function(req, res, next) {
    try {
      var foodId = req.params.id
    	/*var anything = req.param('roleId');*/
  		var query = url.parse(req.url,true).query;
  		console.log(query);

        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('SELECT * FROM restaurant.food', function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }
                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

router.get('/CaloriesLessThan/:Calories?', function(req, res, next) {
    try {
      var foodCalories = req.params.Calories
    	/*var anything = req.param('roleId');*/
  		var query = url.parse(req.url,true).query;
  		console.log(query);

        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('SELECT * FROM restaurant.food where Calories <= ?;',[foodCalories], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }
                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

router.get('/selectFoodType/:Type?', function(req, res, next) {
    try {
      var foodType = req.params.Type
    	/*var anything = req.param('roleId');*/
  		var query = url.parse(req.url,true).query;
  		console.log(query);

        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('SELECT * FROM restaurant.food where Type = ?;',[foodType], function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }
                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});


router.get('/cheapestFood', function(req, res, next) {
    try {
      var foodType = req.params.Type
    	/*var anything = req.param('roleId');*/
  		var query = url.parse(req.url,true).query;
  		console.log(query);

        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                conn.query('SELECT Food_ID,FoodName,Price,Type FROM food ORDER BY cast(Price as unsigned) ASC LIMIT 5', function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex];
                        resEmp.push(empObj);
                    }
                    res.json(resEmp);

                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

/* Update Food Service. */
router.put('/food/:id', function(req,res,next){


try{
	var reqObj = req.body;
	console.log(reqObj);
	req.getConnection(function(err, conn){
		if(err)
		{
			console.error('SQL Connection error: ', err);
			return next(err);
		}
		else
		{
			var editsql = "UPDATE food SET FoodName= '" + reqObj.FoodName  +  "' , Price=  '" + reqObj.Price + "', Calories=  '" + reqObj.Calories + "', Type=  '" + reqObj.Type + "'  WHERE Food_ID= " + req.params.id;
			var query = conn.query(editsql, function (err, result){
				if(err){
				console.error('SQL error: ', err);
				return next(err);
				}
				console.log(result);
				var IdOfFood = req.params.id;
				res.json({"Food_ID":IdOfFood,"Price":reqObj.Price , "Calories":reqObj.Calories, "Type":reqObj.Type});
			});
		}
		});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

router.delete('/delete/:id', function(req, res, next) {
    var reqObj = req.body;
    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM food WHERE Food_ID = ' + req.params.id, function(err, result) {
            //if(err) throw err
            if (err) {
                console.error('SQL error: ', err);
                return next(err);
                res.redirect('/')
            } else {
                console.log("User deleted successfully! id = " + req.params.id + "or"+ reqObj.FoodName)
                // redirect to users list page
                res.redirect('/')
            }
        })
    })
})
