const mongoose = require('mongoose')


const validator = require('validator')
const bcrypt = require('bcryptjs')




// note, the review schema to be saved in the database
// should include the 
// time stamp, 
// comment content
// product infomation 


const ReviewSchema = new mongoose.Schema({
	title: String,
	date: String,
	name: Number,
	content: String,
	userId: String 			// correct type? 
	}
);

const ProductSchema = new mongoose.Schema({    
	name: String,
	img_url: String, 
	title_description: String,
	description: String, 
	reviews: [ReviewSchema]
});





const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };