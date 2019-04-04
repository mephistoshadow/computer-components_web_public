/* E4 server.js */

/**	


**/


'use strict';
const log = console.log;

const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const hbs = require('hbs');
var path = require('path');

// Mongoose
const { mongoose } = require('./db/mongoose');
//const { Product } = require('./models/product');
const { User, Product} = require('./models/user')

// Express
const port = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }))


app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "views"));

// static js directory
app.use(express.static(__dirname + '/FrontEnd'));

// Add express sesssion middleware
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))



// Middleware for authentication for resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.redirect('/login')
		})
	} else {
		res.redirect('/login')
	}
}

const sessionChecker = (req, res, next) => {
	if (req.session.user) {
		res.redirect('/user')
	} else {
		next();
	}
}



// Route for getting the main page
app.post('/users', (req, res) => {

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		role: req.body.role,
		wish_list: [],
		comment_history: []
		
	})

	// save user to database
	user.save().then((result) => {
		res.send(user)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})

})

app.get('/', sessionChecker, (req, res) => {
	res.redirect('/main')
})

// route for login
app.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/FrontEnd/html/login.html')
	})

	// route for login
app.route('/signup')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/FrontEnd/html/signup.html')
	})

// route for main
app.route('/main')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/FrontEnd/html/mainpage.html')
	})

app.route("/error").get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/FrontEnd/html/working.html')
	})

	
app.get('/user', (req, res) => {
	// check if we have active session cookie
	if (req.session.user) {
		res.render('user.hbs', {
			email: req.session.email,
			id_new: req.session.id

		})
	 } else {
		res.redirect('/login')
	 }
	 log(req.session);
})

app.get('/admin', (req, res) => {
	// check if we have active session cookie
	if (req.session.user) {
		//res.sendFile(__dirname + '/public/dashboard.html')
		res.render('admin.hbs', {
			email: req.session.email
		})
		
	 } else {
		res.redirect('/login')
	 }
})

app.get('/users', (req, res) => {
	// Add code here
	User.find({}).then((users) => {
		res.send({ users }) 
	}, (error) => {
		res.status(500).send(error)
	})
	

})

app.delete('/user/:id', (req, res) => {
	const id = req.params.id

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.redirect("/error")
	}

	// Otheriwse, findByIdAndRemove
	User.findByIdAndRemove(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send({ user })
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// User login and logout routes
app.post('/login', (req, res) => {
	const email = req.body.email
	const password = req.body.password
	log(email, password)
	
	User.findByEmailPassword(email, password).then((user) => {
		if(!user) {
			log("no such users!")
			res.redirect('/login')
		}
		
		else {
			// Add the user to the session cookie that we will
			// send to the client
			log("sucessful")
			req.session.user = user._id;
			req.session.email = user.email;
			req.session.role = user.role;
			log(user.role)
			
			if(user.role == "admin"){
				res.redirect('/admin')
			}
			else{
				res.redirect('/user')
			}
		}
	}).catch((error) => {
		res.status(400).redirect('/error')
	})
})

// User login and logout routes
app.post('/signup', (req, res) => {
	const email = req.body.email
	const password = req.body.password
	log(email, password)
	
	const user = new User({
		email: email,
		password: password,
		role: "user"
	})
	
	user.save().then((result) => {
		req.session.user = result._id;
		req.session.email = result.email;
		
		res.redirect("/user")
		
	}, (error) => {
		res.status(400).send(error)
	})
})

//user logout

app.get('/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/main')
		}
	})
})

// admin logout

app.get('/admin/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})


// get all products in wish_list for user by id
app.get('/user/wish_list/:email', (req, res) => {
	// Add code here
	const email = req.params.email;
	
	// if (!ObjectID.isValid(id)) {
	// 	return res.status(404).send()
	// }
	User.find({
        email:email
    }).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			log(user)
			res.send({ user })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})

})

app.get('/admin/product_list/:email', (req, res) => {
	// Add code here
	const email = req.params.email;
	
	// if (!ObjectID.isValid(id)) {
	// 	return res.status(404).send()
	// }
	User.find({
        email:email
    }).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			log(user)
			res.send({ user })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})

})

// post a product by product_id for user by id
app.post('/user/wish_list/:id/:product_id', (req, res) => {
	// Add code here
	const id = req.params.id;
	const pid = req.params.product_id;
	
	if (!ObjectID.isValid(pid)) {
		return res.status(404).send()
	}
	
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}
	var product = Product.findById(pid);
	
	User.findByIdAndUpdate(id, {$push: {wish_list: product}}, {new: true}).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			
			res.send({"Product" : product, "User" : user })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})
	

})



// get all comments for user by id
app.get('/user/comment_history/:id', (req, res) => {
	// Add code here
	const id = req.params.id;
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send({ user })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})

})

// post a comment  for user by id
app.post('/user/comment_history/:id', (req, res) => {
	// Add code here
	const id = req.params.id;
	
	var comment = {
		time : req.body.time,
		review : req.body.review
	}
	
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}
	User.findByIdAndUpdate(id, {$push: {comment_history: comment}}, {new: true}).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			
			res.send({"Comment" : comment, "User" : user })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})
	

})


// get specific product for specific user in their wish list
app.get('/user/wish_list/:id/:product_id', (req, res) => {
	// Add code here
	const id = req.params.id;
	const pid = req.params.product_id;
	
	if (!ObjectID.isValid(pid)) {
		return res.status(404).send()
	}
	User.findById(id).then((user) => {
		var product = user.wish_list.id(pid);
		if (!product) {
			res.status(404).send()
		} else {
			res.send({ product })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})
	

})

// get specific comment by comment_id for specific user by id in their comment history
app.get('/user/comment_history/:id/:comment_id', (req, res) => {
	// Add code here
	const id = req.params.id;
	const cid = req.params.comment_id;
	
	if (!ObjectID.isValid(cid)) {
		return res.status(404).send()
	}
	User.findById(id).then((user) => {
		var comment = user.comment_history.id(cid);
		if (!comment) {
			res.status(404).send()
		} else {
			res.send({ comment })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})
	

})


//delete specifc product in for user by id
app.delete('/user/wish_list/:id/:product_id', (req, res) => {
	// Add code here
	
	const id = req.params.id;
	const pid = req.params.product_id;
	
	if (!ObjectID.isValid(pid)) {
		return res.status(404).send()
	}
	User.findById(id).then((user) => {
		var product = user.wish_list.id(rid);
		
		User.findByIdAndUpdate(id, {$pull: {wish_list: product}}, {new: true}).then((user) => {
		if (!user || !product) {
			res.status(404).send()
		} else {
			
			res.send({"Product" : product, "User" : user })
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})
		
	}).catch((error) => {
		res.status(500).send(error)
	})

})


// update comment for specific item
app.patch('/user/comment_history/:id/:comment_id', (req, res) => {
	// Add code here
	
	const { time, review } = req.body;
	const properties = { time, review };
	log(properties);
	
	const id = req.params.id;
	const cid = req.params.comment_id;
	
	if (!ObjectID.isValid(cid)) {
		return res.status(404).send()
	}
	User.findById(id).then((user) => {
		var comment = user.comment_history.id(cid);
		if (!comment || !user) {
			res.status(404).send()
		} else {
			//modify and update given reservation in the restaurant
			user.comment_history.id(cid).time = req.body.time;
			user.comment_history.id(cid).review = req.body.review;
			User.findByIdAndUpdate(id, {$set: user}, {new: true}).then((user) => {
			res.send({"Comment" : comment, "User" : user })
			})
		}
		
	}).catch((error) => {
		res.status(500).send(error)
	})

})

app.get('/products', (req, res) => {
	// Add code here
	Product.find({}).then((products) => {
		res.send({ products }) 
	}, (error) => {
		res.status(500).send(error)
	})
	

})

app.post('/product', (req, res) => {
	// Add code here
	
	const product = new Product({
		name: req.body.name,
		description: req.body.description,
		img_url: req.body.url
	})
	
	
	product.save().then((result) => {
		
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

//Route for posting review to product 
app.get('/product/:id', (req, res) => {
	const id = req.params.id;
	console.log('Product id...........')
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}
	// if (!req.session.user) {		//if user is not logged in
	// 	res.status(401).send();
	// }
	// const { title, content } = req.body;
	// const revBody = { title, content };
	// revBody.userId = req.user._id;
	// revBody.username = req.user.username;
	// revBody.time = new Date();
	//const { title, content, userId, time } = req.body;
	//const revBody = { title, content, userId, time };
	//must clarify how to send time and userId as part of the request

	Product.findById(id).then((product) => {
		if (!product) {
			res.status(404).send();
		} else {
			// product.reviews.push(revBody);
			// product.save();
			// res.send(product)
			if(req.session.user){
				res.render("product.hbs",{
				email: req.session.email,
				name: product.name,
				description: product.description,
				url: product.img_url
				
			});
			}
			else{
				res.redirect('/login')
				
			};
			
		}
	}).catch((error) => {
		res.status(500).send();
	});
});



//route for deleting a product
app.delete('/product/:id', (req, res) => {
	const id = req.params.id

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.redirect("/error")
	}

	// Otheriwse, findByIdAndRemove
	Product.findByIdAndRemove(id).then((product) => {
		if (!product) {
			res.status(404).send()
		} else {
			res.send({ product })
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})


//Route for getting the specific product page info 
app.get('/product/:id', (req, res) => {
	const id = req.params.id;
	
	if (!ObjectID.isValid(id)) { //invalid product id ]
		res.status(404).send() 	
	}
	Product.findById(id).then((product) => { //find product by id
		if (!product) {
			res.status(404).send();
		} else {
			if(req.session.user){
				res.render("product.hbs",{
				name: product.name,
				user: req.session.email,
				url: product.img_url
			});
			}
			else{
				res.render("product.hbs",{
				name: product.name,
				user: "Guest"
			});
			}
		}
		
	}).catch((error) => {
		res.status(500).send();
	})
})

//Route for deleting a review IFF attempted by original user who wrote it
app.delete('/main/:id/:rev_id', (req, res) => {
	const id = req.params.id;
	const revId = req.params.rev_id;

	if (!ObjectID.isValid(id)) { //if invalid product id
		res.status(404).send();
	} 
	if (!ObjectID.isValid(revId)) { //if invalid review id
		res.status(404).send();
	}

	Product.findById(id).then((product) => {
		if (!product) {
			res.status(404).send();
		} else { //found correct review 
			const rev = product.reviews.id(revId);
			res.send(rev);
			product.reviews.pull(revId);
			product.save(); 
		}
	})
})





//////////

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
