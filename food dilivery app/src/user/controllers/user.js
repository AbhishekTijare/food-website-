const User = require("../models/user");
const repo = require("../repositories/userRepo");
const jwt = require("jsonwebtoken");

// api/user/register - 
module.exports.register = async(req, res)=>{
    // 1. read req.body.
    // 2. Create a model for this data.
    console.log(req.body);
    const user = new User(req.body.name, req.body.email, req.body.password);
    const result = await repo.add(user);
    if(result){
        return res.end("User is added");
    }else{
        return res.end("User failed to add");
    }
}

 module.exports.login =  async (req,res)=>{
    //1. check if the email and password is correct or not 
    const email = req.body.email;
    const user = await repo.getByEmail(email);
    if (!user || user.password!= req.body.password){
         return res.status(400).send("Invalid Credentials");
    }else{
        //2. create a jwt( json web token) 
         const token = jwt.sign(
             {userid:user._id},
             "THISISMYPRIVATEKEY",
            //  {
            //     expierIn : "2h"
            //  }
         );
         return res.status(200).send(token);
        
         }
}
    
    //3. send jwt token in response


