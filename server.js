var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

// Database configuration
var config = {
  user : 'rakeshgsingh',
  database : 'rakeshgsingh',
  host : 'db.imad.hasura-app.io',
  port : '5432',
  password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
var htmlTemplate = `
        <!doctype html>
        <html>
            <head>
                <title> ${title}</title>
                <meta name="viewport" content ="width=device-width, initial-scale=1"/>
                 <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href='/'>HOME</a>
                    </div>
                        <hr/>
                    <div>
                        <h3>${heading}</h3>
                    </div>
                    <div> ${date.toDateString()}</div>
                    <div>
                       ${content}
                    </div>
                </div>
            </body>
        </html>
        `;
               return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    //How do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
} 

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input,'this-is-some-rendom-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res){
    //username,password
    //{"username":"rakesh", "password":"password"}
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES($1, $2)', [username, dbString], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            
            res.send('User succesfully created: ' + username);
        }
        
    });
});

app.post('/login', function(req, res){
    //username,password
    //{"username":"rakesh", "password":"password"}
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            if(result.rows.length === 0){
                res.send(403).send('username/password is invalid');
            }else {
                //Match the password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);// creating a hash basedon the password submited and the original salt
                if(hashPassword ===dbString){
                res.send('Credintials are correct');
                }else {
                    res.send(403).send('username/password is invalid');
                }
            }
        }      
      });
        
    });
// Connect the database for Table test
var pool = new Pool(config);
app.get('/test-db', function(req, res){
    //make a select request
    
    //return a response with the results
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
});

var counter=0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res){   //URL:/submit_name?name=xxxxxx
    //Get the name from request
    //var name = req.params.name;
    var name = req.query.name;
    names.push(name);
    //JSON - javascript object notation.
    res.send(JSON.stringify(names)); // it is a way to convert array to string.
    
});

app.get('/articles/:articleName', function(req,res){
    //articleName == articleOne.
    //articles[articleName]== {} content object for article one.
    var articleName = req.params.articleName;
    //SELECT * FROM article WHERE title = '\'; DELETE WHERE  a= 'asdf'
    //pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'",function(err, result){ --> not safe 
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
            }else {
            if(result.rows.length === 0){
            res.status(404).send('Article not found');
            } else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    }); 
 });

/*app.get('/:articleName', function(req,res){
    //articleName == articleOne.
    //articles[articleName]== {} content object for article one.
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});*/

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
