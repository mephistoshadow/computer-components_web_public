/* Users model */
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// We'll make this model in a different way

const ReviewSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true, 
		minLength: 1
	},
	time: String,
	content: {
		type: String,
		required: true,
		minLength: 1
	},
	userId: {
		type: String
	},
	username: String

});


const ProductSchema = new mongoose.Schema({    
	name: {
		type: String,
		unique: true
	},
	
	img_url: String, 
	title_description: String,
	description: String, 
	reviews: [ReviewSchema]
});


const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true, // trim whitespace
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 2
	},
	
	role: String,
	wish_list : [ProductSchema],
	comment_history: [ProductSchema],
	all_product:[ProductSchema]
})

// Our own student finding function 
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this

	return User.findOne({email: email}).then((user) => {
		if (!user) {
			return Promise.reject()
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			})
		})
	})
}

// This function runs before saving user to database
UserSchema.pre('save', function(next) {
	const user = this

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(user.password, salt, (error, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next();
	}

})




const Product = mongoose.model('Product', ProductSchema);

const User = mongoose.model('User', UserSchema)

module.exports = { User, Product }