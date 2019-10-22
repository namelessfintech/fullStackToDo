let express = require("express");
let app = express();
let mongoDb = require('mongodb');
let db
const path = require("path");

let connStr = "mongodb+srv://root:rootuser@todotest-tokig.mongodb.net/toDoTest1?retryWrites=true&w=majority"
mongoDb.connect(connStr,{useNewUrlParser:true},(err,client)=>{
  db = client.db();
  app.listen(3000, () => {
    console.log("server is running...");
  });
})

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname+'/index.html'))

  res.send(`<!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Simple To-Do App</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
          </head>
          <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form action='/create-item' method='POST'>
                <div class="d-flex align-items-center">
                  <input autofocus autocomplete="off" class="form-control mr-3" name='item' type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul class="list-group pb-5">
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #1</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #2</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #3</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            </ul>
            
          </div>

          </body>
          </html>`);
});

app.post("/create-item", (req, res) => {
  console.log('console this works')
  console.log(req.body.item)
  db.collection('items').insertOne({text:req.body.item},()=>{
    res.send("this end point is working");
  })
  
});

