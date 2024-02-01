const mongoose = require("mongoose");

const connectdb =() =>{
    return mongoose.connect('mongodb://127.0.0.1:27017/admission1234')
    .then(()=>{
        console.log("connecting success")
    }).catch((error)=>{
        console.log("error")
    })
};

module.exports=connectdb