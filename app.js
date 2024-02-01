const express = require('express')
const app = express()
const port = 3000
const web =require("./routes/web")
const connectdb =require("./db/connectdb")
//connect flash and session
const session=require('express-session')
const flash= require('connect-flash')


//messages
app.use(session({
  secret:'secret',
  cookie:{maxAge:6000},
  resave:false,
  saveUninitialized:false,
}));

//flash messages
app.use(flash());

//connectdb
connectdb();
//data get object //data get krne k liye
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))
//css link
app.use(express.static('public'))
//ejs setup
app.set('view engine', "ejs")
//route load
app.use("/",web);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
