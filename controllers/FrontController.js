const UserModel =require("../models/User")
const bcrypt=require("bcrypt")
class FrontController{
  static login=async(req,res)=>{
    try{
      res.render("login",{msg:req.flash('success'),error:req.flash('error')});
    }catch(error){
        console.log(error);
    }
  };

  static register=async(req,res)=>{
    try{
      res.render("register",{msg: req.flash("error") }); //passing message
    }catch(error){
        console.log(error);
    }
  };

  static home=async(req,res)=>{
    try{
      res.render("home");
    }catch(error){
        console.log(error);
    }
  };
  //data insert
  static insertReg=async(req,res)=>{
    try{
      //console.log("insert data")
      //console.log(req.body);
      const {n, e, p, cp}= req.body;
      const user = await UserModel.findOne({email:e})
      if(user){
        req.flash("error","Email already exit");
        res.redirect("/register");
      }else{
        if(n && e && p && cp){
          if(p == cp){
            const hashpassword =await bcrypt.hash(p,10)
            const result =new UserModel({
              name:n,
              email:e,
              password:hashpassword,
            });
            await result.save()
            req.flash("success","register success plz login!");
            res.redirect("/");//route url

          }else{
            req.flash("error","password and cpassword Not same");
            res.redirect("/register");
          }
        }else{
          req.flash("error","All Field req");
          res.redirect("/register");

        }
           
      }

     

    }catch(error){
        console.log(error);
    }
  };

  static vlogin =async(req, res) =>{
    //console.log(req.body);
    try{
      const {e,p} =req.body;
      if(e && p){
        const user = await UserModel.findOne({email:e})

        if(user !=null){
          const isMatched =await bcrypt.compare(p, user.password)
          if(isMatched){
            
            res.redirect('/home')

          }else{
            req.flash('error', 'Email or password is not valid')
            res.redirect('/')
          }
        }else{
          req.flash('error','you are not a registered user')
          res.redirect('/')
        }
      }else{
        req.flash('error','All Fields Required')
        res.redirect('/')
      }
    }catch (error) {
      console.log(error);
    }
  };
}

module.exports=FrontController;