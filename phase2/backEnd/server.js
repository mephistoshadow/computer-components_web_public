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

/// Route for adding restaurant, with *no* reservations (an empty array).
/* 
Request body expects:
{
	"name": <restaurant name>
	"description": <restaurant description>
}
Returned JSON should be the database document added.
*/
// POST /restaurants
app.post('/restaurants', (req, res) => {
	const restaurant = new Restaurant({
		name: req.body.name,
		description: req.body.description,
		reservations: []
	})

	restaurant.save().then((result) => {
		res.send(result);
	}, (error) => {
		res.status(400).send(error); // 400 for bad request
	})
})


//Route for getting the specific product page info 
app.get('/main/:id', (req, res) => {
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



/// Route for getting all restaurant information.
// GET /restaurants
app.get('/restaurants', (req, res) => {
	Restaurant.find().then((restaurants) => {
		if (!restaurants) {
			res.status(404).send();
		} else {
			res.send(restaurants);
		}
	}).catch((error) => {
		res.status(500).send();
	})
})


/// Route for getting information for one restaurant.
// GET /restaurants/id
app.get('/restaurants/:id', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) { //verify id validity
		res.status(404).send();
	}

	Restaurant.findById(id).then((restaurant) => { //find restaurant by id 
		if (!restaurant) { 
			res.status(404).send();
		} else { //correct restaurant found
			res.send(restaurant);
		}
	}).catch((error) => { //error catch phrase
		res.status(500).send();
	})
})


/// Route for adding reservation to a particular restaurant.
/* 
Request body expects:
{
	"time": <time>
	"people": <number of people>
}
*/
// Returned JSON should have the restaurant database 
//   document that the reservation was added to, AND the reservation subdocument:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// POST /restaurants/id
app.post('/restaurants/:id', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}

	const { time, people } = req.body;
	const resvBody = { time, people }; //reservation body

	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send();
		} else {
			restaurant.reservations.push(resvBody); //push the reservation into restaurant's list
			restaurant.save(); 
			res.send(restaurant);
		}
	})
})


/// Route for getting information for one reservation of a restaurant (subdocument)
// GET /restaurants/id
app.get('/restaurants/:id/:resv_id', (req, res) => {
	const id = req.params.id;
	const resv_id = req.params.resv_id; 

	if (!ObjectID.isValid(id)) {
		res.status(404).send();
	}
	if (!ObjectID.isValid(resv_id)) {
		res.status(404).send();
	}

	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) { //not valid restaurant 
			res.status(404).send();
		} else {
			res.send(restaurant.reservations.id(resv_id));
		}
	})
})


/// Route for deleting reservation
// Returned JSON should have the restaurant database
//   document from which the reservation was deleted, AND the reservation subdocument deleted:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// DELETE restaurant/<restaurant_id>/<reservation_id>
app.delete('/restaurants/:id/:resv_id', (req, res) => {
	const restId = req.params.id;
	const resvId = req.params.resv_id;
	if (!ObjectID.isValid(restId)) {
		res.status(404).send();
	}
	if (!ObjectID.isValid(resvId)) {
		res.status(404).send();
	}

	Restaurant.findById(restId).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send();
		} else { //found correct restaurant
			const resv = restaurant.reservations.id(resvId);
			const restAndResv = {
				reservation: resv, 
				restaurant: restaurant
			};
			res.send(restAndResv);
			restaurant.reservations.pull(resvId);
			restaurant.save();
		}
	})
})





/// Route for changing reservation information
/* 
Request body expects:
{
	"time": <time>
	"people": <number of people>
}
*/
// Returned JSON should have the restaurant database
//   document in which the reservation was changed, AND the reservation subdocument changed:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// PATCH restaurant/<restaurant_id>/<reservation_id>
app.patch('/restaurants/:id/:resv_id', (req, res) => {
	const restId = req.params.id;
	const resvId = req.params.resv_id;

	const { time, people } = req.body;
	const body = { time, people };

	if (!ObjectID.isValid(restId)) {
		res.status(404).send() //if the restaurant id is invalid
	}
	if (!ObjectID.isValid(resvId)) {
		res.status(404).send() // if the reservation id is invalid
	}

	Restaurant.findById(restId).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send();
		} else {
			const resv = restaurant.reservations.id(resvId);
			resv.set(body);
			restaurant.save();
			const restAndResv = {
				reservation: resv, 
				restaurant: restaurant
			};
			res.send(restAndResv);
		}
	})
})


//////////

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
