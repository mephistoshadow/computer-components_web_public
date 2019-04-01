/* E4 server.js */

/**	
Restaurant: { name - String, description - String, reservationList - list of Reservations }

Reservation: { time - String, people - Number }

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



// Route for getting the main page
app.get('/main', (req, res) =>{
	
	
	
})


// route for login
app.route('/main/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/public/login.html')
	})

//
app.get('/main/user', (req, res) => {
	// check if we have active session cookie
	if (req.session.user) {
		//res.sendFile(__dirname + '/public/dashboard.html')
		res.render('user.hbs', {
			email: req.session.email
		})
	else if()
	} else {
		res.redirect('/login')
	}
})

app.get('/main/admin', (req, res) => {
	// check if we have active session cookie
	if (req.session.user) {
		//res.sendFile(__dirname + '/public/dashboard.html')
		res.render('admin.hbs', {
			email: req.session.email
		})
	else {
		res.redirect('/main/login')
	}
})


// User login and logout routes

app.post('/users/login', (req, res) => {
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
				res.redirect('/main/user')
			}
			else{
				res.redirect('/main/admin')
			}
		}
	}).catch((error) => {
		res.status(400).redirect('main/login')
	})
})

//user logout

app.get('/main/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

// admin logout

app.get('/main/admin/logout', (req, res) => {
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
