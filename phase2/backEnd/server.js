/* E4 server.js */

/**	


**/


'use strict';
const log = console.log;

const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const hbs = require('hbs')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { Product } = require('./models/product');
const { User } = require('./models/user')

// Express
const port = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());


app.set('view engine', 'hbs')

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
		res.redirect('profile')
	} else {
		next();
	}
}



// Route for getting the main page
app.get('/main', (req, res) =>{
	
	
	
})

app.get('/', sessionChecker, (req, res) => {
	res.redirect('login')
})

// route for login
app.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/FrontEnd/html/login.html')
	})


// route for main
app.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/FrontEnd/html/index.html')
	})


app.get('/user', (req, res) => {
	// check if we have active session cookie
	if (req.session.user) {
		//res.sendFile(__dirname + '/public/dashboard.html')
		res.render('user.hbs', {
			email: req.session.email
		})
	} else {
		res.redirect('/login')
	}
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


// User login and logout routes
app.post('/login', (req, res) => {
	const email = req.body.email
	const password = req.body.password

	User.findByEmailPassword(email, password).then((user) => {
		if(!user) {
			res.redirect('/login')
		}
		
		else {
			// Add the user to the session cookie that we will
			// send to the client
			req.session.user = user._id;
			req.session.email = user.email
			req.session.role = user.role
			if(user.role == "user"){
				res.redirect('/user')
			}
			else{
				res.redirect('/admin')
			}
		}
	}).catch((error) => {
		res.status(400).redirect('/login')
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




//Route for getting the specific product page info 
app.get('/main/product/:id', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) { //invalid product id ]
		res.status(404).send() 	
	}
	Product.findById(id).then((product) => { //find product by id
		if (!product) {
			res.status(404).send();
		} else {
			res.send(product);
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
