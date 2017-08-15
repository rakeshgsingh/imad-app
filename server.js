var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;

var config = {
  user : 'rakeshgsingh',
  database : 'rakeshgsingh',
  host : 'db.imad.hasura-app.io',
  port : '5432',
  password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
   'article-one':{
        title :'Article-one | Rakesh Singh',
        heading :'Article-one',
        date :'5 july 2017',
        content :`<p> This is the first article. This is the first article. This is the first article. This is the first article.
                    This is the first article.This is the first article. This is the first article. This is the first article. 
                    This is the first article. This is the first article. This is the first article. This is the first article.
                    </p>
                    <p> This is the first article. This is the first article. This is the first article. This is the first article.
                    This is the first article.This is the first article. This is the first article. This is the first article. 
                    This is the first article. This is the first article. This is the first article. This is the first article.
                    </p>
                    <p> This is the first article. This is the first article. This is the first article. This is the first article.
                    This is the first article.This is the first article. This is the first article. This is the first article. 
                    This is the first article. This is the first article. This is the first article. This is the first article.
                    </p>`
    },
   'article-two':{
        title :'Article-two | Rakesh Singh',
        heading :'Article-two',
        date :'5 August 2017',
        content :`<p>
                    This is the Second article.
                </p>`
    },
   'article-three':{
        title :'Article-three | Rakesh Singh',
        heading :'Article-Three',
        date :'5 August 2017',
        content :`<p> 
                    This is the Third article.
                </p>`
    }
 };
 
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
                    <div> ${date}</div>
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

var pool = new pool(config);
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
    res.send(JSON.stringify(names)); // it is a way to conver array to string.
    
});

app.get('/:articleName', function(req,res){
    //articleName == articleOne.
    //articles[articleName]== {} content object for article one.
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

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
