// Connect to Mongodb database.

const mongodb = require("mongodb");

const mongoDbClient = mongodb.MongoClient;

const url = "mongodb+srv://tabhi:abhi2001@cluster0.1vgwy.mongodb.net/FoodDeliveryAppDB?retryWrites=true&w=majority"

exports.localconnect = async ()=>{

    try{
        client = await mongoDbClient.connect(url);
        console.log("Db is connected");
    }catch(err){
        console.log(err);
    }

}

exports.getCollection = (collectionName)=>{
    return client.db('FoodDeliveryAppDB').collection(collectionName);
}