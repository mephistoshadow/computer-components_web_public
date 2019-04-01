/* E4 server.js */

/**	
Restaurant: { name - String, description - String, reservationList - list of Reservations }

Reservation: { time - String, people - Number }

**/

'use strict';
const log = console.log;

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// Mongoose
const { mongoose } = require('./db/mongoose');
const { Product } = require('./models/product');

// Express
const port = process.env.PORT || 3000
const app = express();
app.use(bodyParser.json());

// Route for getting the main page
app.get('/main', (req, res) =>{
	
	
	
})


// route for login
app.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(__dirname + '/public/login.html')
	})

//
app.get('/profile', (req, res) => {
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
