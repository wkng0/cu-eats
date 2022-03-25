const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    dishesID: {type: String, require},
    name: {type: String, require},
    varients: [],
    prices: [],
    category: {type: String, require},
    image: {type: String, require},
    description: {type: String, require: false},  
},{
    timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
