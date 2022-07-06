// Prototype for Restaurant

module.exports = class Restaurant{
    constructor(_name, _location, _contact,id){
        
        this._id =id;
        this.name = _name;
        this.location = _location;
        this.contact = _contact;
    }
    }