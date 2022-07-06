const mongoDBConfig = require("../../../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

exports.add = async (restaurant)=>{
    const collection = mongoDBConfig.getCollection("Restaurant");
    try{
        await collection.insertOne({name:restaurant.name, location:restaurant.location, contact:restaurant.contact});
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
}

exports.update= async (restaurant)=>{
    const collection = mongoDBConfig.getCollection("Restaurant");
    try{
        //objectId converts string to objectId.
    const filter = {_id :ObjectId(restaurant._id)}
    const update ={$set:{name: restaurant.name, location: restaurant.location, contact: restaurant.contact }};
    await collection.findOneAndUpdate(filter, update);
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
}

exports.get = async ()=>{
    const collection = mongoDBConfig.getCollection("Restaurant");
    try{
    const results = await collection.find().toArray();
    return results;
    }catch (err){
        console.log(err);
        return -1;
    }
}

exports.getByLocation = async (_location)=>{
    const collection = mongoDBConfig.getCollection("Restaurant");
    try{
    const filterExpression= {location:_location} 
    const results = await collection.find(filterExpression).toArray();
    return results;
    }catch (err){
        console.log(err);
        return -1;
    }
}

exports.getById = async(id)=>{
    const collection = mongoDBConfig.getCollection("Restaurant");
    try{
        const filterExpression= {_id:ObjectId(id)}; 
        const results = await collection.find(filterExpression).toArray();
        return results;
        }catch (err){
            console.log(err);
            return -1;
        
       }
}

 exports.delete = async(id)=>{
    const collection = mongoDBConfig.getCollection("Restaurant");
    try{
        const filter ={_id:ObjectId(id)};
       await collection.findOneAndDelete(filter);
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
 }

 exports.filter = async(name,location)=>{
     const collection = mongoDBConfig.getCollection("Restaurant");
      const results = await collection.find({
         $and:[
             {name: {$regex: name}},
             {location: location}
         ]
     }).toArray();
     return results;
 }


