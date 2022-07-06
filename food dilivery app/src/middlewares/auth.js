const jwt = require("jsonwebtoken");
// take request and verify wheter the token is passed and valid 


const authenticate =(req, res ,next) =>{
    // 1.Read token 
     const token = req.headers["authorization"];
     if (!token){
         return res.status(401).send("Unauthorised: Token required");
     } 
    //2. check if tgoken is valid 
    try {
        const payLoad = jwt.verify(token,"THISISMYPRIVATEKEY");
        req.userID =payLoad.userid;
        console.log(req.userID);
    }catch(err){
        return res.status(401).send("Unauthorized : Invalid token");
    }
    //3. if valid proceed to next middleware
    next();    
    
}
 module.exports = authenticate;