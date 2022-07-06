const Restaurant = require("../models/restaurant")
const repo =require("../repositories/restaurant");
const url = require("url");

exports.add = async (req, res)=>{
    
    const restaurant = new Restaurant(req.body.name, req.body.location, req.body.contact);
    const result = await repo.add(restaurant);
    if(result){
        return res.send("Restaurant is added");
    }else{
        return res.send("Failed to add restaurant");
    }
}

exports.update = async (req, res)=>{
    console.log(req.body);
    const restaurant = new Restaurant(req.body.name, req.body.location, req.body.contact , req.body.id);
    const result = await repo.update(restaurant);
    if(result){
        return res.send("Restaurant is updated");
    }else{
        return res.send("Failed to update restaurant");
    }
}

exports.get = async(req,res)=>{
    const results = await repo.get();
    if (results == -1 ){
        return res.send("Failed to get records");
    }else{
        return res.send(results);
    }
}


exports.getByLocation = async(req,res)=>{
    const results = await repo.getByLocation(req.params.city);
    if (results == -1 ){
        return res.send("Failed to get records");
    }else{
        return res.send(results);
    }
}

exports.getById = async (req,res)=>{
    const results = await repo.getById(req.params.id);
    if (results == -1 ){
        return res.send("Failed to get records");
    }else{
        return res.send(results);
    }
}

exports.delete= async(req,res)=>{
    const id = req.params.id;
    const result = await repo.delete(id);
    if(result){
        return res.send("Restaurant is delete");
    }else{
        return res.send("Failed to delete restaurant");
    }
}

exports.filter= async(req,res)=>{
    //step 1: parse query string 
    const params = url.parse(req.url,true).query;
    if (!params.name){
        const results = await repo.getByLocation(params.location);
        if (results == -1 ){
        return res.send("Failed to get records");
        }else{
        return res.send(results);
        }
    }else{
        const results = await repo.filter(params.name ,params.location);
        if (results == -1 ){
        return res.send("Failed to get records");
        }else{
        return res.send(results);
        }
    }

}