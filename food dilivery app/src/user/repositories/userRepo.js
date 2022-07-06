const mongodbConfig= require("../../../config/mongodb");


exports.add = async (user)=>{
    const collection = mongodbConfig.getCollection("User");
    try{
        await collection.insertOne({name:user.name, email: user.email, password: user.password});
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
}

exports.getByEmail = async (_email)=>{
    const collection = mongodbConfig.getCollection("User");
    try{
        const user = await collection.findOne({email:_email});
        return user;
    }catch(err){
        console.log(err);
        return null;
    }
    
}