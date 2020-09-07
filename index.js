require('dotenv').config()

var cors = require('cors')
const express = require('express');
const app = express();
const connection = require('./database');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//LOGIN
app.post('/check/:email&:pass', (req, res) => {
  connection.query("select * from heroku_4375be9c1b8e567.Users where Email= '" + req.params.email + "' and Password= '" + req.params.pass + "'",
    function (error, results) {
      if (error) throw error;
      if (results.length >= 1)
        res.json(results);
      else
        res.json(0);

    }
  );
});
//CHECK IF EMAIL EXISTS
app.post('/check/:email', (req, res) => {
  connection.query("select * from heroku_4375be9c1b8e567.Users where Email= '" + req.params.email + "'",
    function (error, results) {
      if (error) throw error;
      if (results.length >= 1)
        res.json(1);
      else
        res.json(0);

    }
  );
});

//CHECK WHICH QUESTION USER USED
app.post('/checkq/:email', (req, res) => {
  connection.query("select Question from heroku_4375be9c1b8e567.Users where Email= '" + req.params.email + "'",
    function (error, results) {
      if (error) throw error;
      if (results.length >= 1)
        res.json(results);
      else
        res.json(0);

    }
  );
});

//CHEC IF THE ANSWER IS CORRECT
app.post('/checka/:email&:ans', (req, res) => {
  connection.query("select * from heroku_4375be9c1b8e567.Users where Email= '" + req.params.email + "' and Answer= '" + req.params.ans + "'",
    function (error, results) {
      if (error) throw error;
      if (results.length >= 1)
        res.json(1);
      else
        res.json(0);

    }
  );
});

//UPDATE PASSWORD
app.patch('/update/:email&:pass', (req, res) => {
  connection.query("UPDATE `heroku_4375be9c1b8e567`.`Users` SET `Password` = '" + req.params.pass + "' WHERE (`Email` = '" + req.params.email + "');",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});


//Generel SELECT
app.post('/get/:bd', (req, res) => {
  connection.query("select * from " + req.params.bd + "",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});


//GET PRICES
app.post('/getprices', (req, res) => {
  connection.query("SELECT ls.min_price  'Min' ,min(lastweek.min_price) 'MinMin',max(lastweek.min_price) 'MaxMin', ls.avg_price 'Mean',min(lastweek.avg_price) 'MinMean',max(lastweek.avg_price) 'MaxMean', (ls.min_price-coalesce((SELECT min_price FROM heroku_4375be9c1b8e567.products_price_history WHERE idprod = '" + req.query.idprod + "'  Order by date DESC LIMIT 1,1),0)) 'MinDiff', (ls.avg_price-coalesce((SELECT avg_price FROM heroku_4375be9c1b8e567.products_price_history WHERE idprod = '" + req.query.idprod + "'  Order by date DESC LIMIT 1,1),0)) 'MeanDiff' FROM (SELECT * FROM heroku_4375be9c1b8e567.products_price_history WHERE idprod = '" + req.query.idprod + "' order by date desc limit 7) as lastweek  JOIN (SELECT * FROM heroku_4375be9c1b8e567.products_price_history WHERE idprod = '" + req.query.idprod + "' order by date desc limit 1) as ls  group by ls.min_price,ls.avg_price;",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//Get index product cards
app.post('/getcards', (req, res) => {
  connection.query("SELECT count(*) as nr_oferte,p.* FROM heroku_4375be9c1b8e567.products_price as pp JOIN heroku_4375be9c1b8e567.products as p on idprod=idproducts  WHERE availability != 0 group by idprod,p.prodtitle ORDER BY idproducts DESC",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//GET PRICES AND PREVIOUS PRICES
app.post('/getprevprices', (req, res) => {
  connection.query("SELECT idprod, date, min_price, avg_price FROM heroku_4375be9c1b8e567.products_price_history  WHERE idprod = '" + req.query.idprod + "' UNION SELECT idprod, DATE_ADD(date, INTERVAL 1 YEAR), min_price, avg_price FROM heroku_4375be9c1b8e567.products_price_history WHERE idprod = (SELECT idpreviousprod FROM heroku_4375be9c1b8e567.previous_product WHERE idcurrentprod = '" + req.query.idprod + "') UNION SELECT idprod, date, predicted_value 'min_price', '-1' FROM heroku_4375be9c1b8e567.products_predictions WHERE idprod = '" + req.query.idprod + "' ORDER BY date ;",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post('/getsites', (req, res) => {
  connection.query("SELECT pp.prodtitle, pp.availability, pp.price, pp.link, s.logo FROM heroku_4375be9c1b8e567.products_price as pp join sites as s WHERE pp.site = s.id and pp.idprod = '" + req.query.idprod + "' ORDER BY PRICE = 0, PRICE",
    function (error, results) {
      if (error) throw error;
      res.json(results);
    }
  );
});

//Get price history of a product
app.post('/gethistory', (req, res) => {
  connection.query("SELECT CAST(date AS DATE) as date, min_price, avg_price FROM heroku_4375be9c1b8e567.products_price_history WHERE idprod = '" + req.query.idprod + "';",
    function (error, results) {
      if (error) throw error;
      res.json(results);

    }
  );
});


//REGISTER
app.post('/register/:email&:pass&:name&:question&:answer', (req, res) => {
  connection.query("INSERT INTO heroku_4375be9c1b8e567.Users (`Name`, `Password`, `Email`, `Question`, `Answer`) VALUES ('" + req.params.name + "', '" + req.params.pass + "', '" + req.params.email + "', '" + req.params.question + "', '" + req.params.answer + "');",
    function (error, results) {
      if (error) throw error;
      res.json(results);

    }
  );
});


//Send contact message
app.post('/sendmessage', (req, res) => {
  connection.query("INSERT INTO `heroku_4375be9c1b8e567`.`contact_messages` (`customer_name`, `customer_email`, `customer_message`) VALUES ('" + req.query.name + "', '" + req.query.email + "', '" + req.query.message + "');",
    function (error, results) {

      if (error) throw error;
      res.json(results);
    }
  );
});

//ADD NEW PRODUCT
app.post('/add', (req, res) => {
  connection.query("INSERT INTO `heroku_4375be9c1b8e567`.`new_products` (`description`, `produrl`, `maker`) VALUES ('" + req.query.prodtitle + "', '" + req.query.produrl + "', '" + req.query.proddesc + "');",
    function (error, results) {

      if (error) throw error;
      res.json(results);
    }
  );
});


//Search engine
app.post('/search', (req, res) => {
  connection.query(`SELECT * FROM heroku_4375be9c1b8e567.products WHERE prodtitle LIKE '%` + req.query.prodtitle + `%';`,
    function (error, results) {
      if (error) throw error;
      res.json(results);

    }
  );
});

//FIND THE PRODUCT WITH ID = idprod
app.post('/product', (req, res) => {
  connection.query("SELECT * FROM heroku_4375be9c1b8e567.products  WHERE (`idproducts` = '" + req.query.idprod + "') ;",
    function (error, results) {
      if (error) throw error;
      res.json(results);

    }
  );
});


//Home page
app.get('/', (req, res) => res.send('Working!'));









// Port 8080 for Google App Engine
const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, console.log(`I'm listening on port ${port}`)); 