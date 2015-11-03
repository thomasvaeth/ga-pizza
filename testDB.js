var db = require('./models');

// db.user.create({
// 	firstName: 'Thomas',
// 	lastName: 'Vaeth',
// 	email: 'thomas@youarepizza.com',
// 	password: 'password1234'
// }).then(function(user) {
// 	console.log(user.get());
// });

// db.user.find({where: {id: 1}}).then(function(user) {
// 	console.log(user.firstName);
// });

// db.pizza.create({
// 	name: 'Tommy\'s Place',
// 	yelpId: 'tommy-boy-pizzeria',
// 	city: 'Seattle',
// 	rating: 4.5,
// 	latitude: 47.6231989,
// 	longitude: -122.3303603,
// }).then(function(pizza) {
// 	console.log(pizza.get());
// });

// db.favorite.create({
// 	yelpId: 'tommy-boy-pizzeria'
// }).then(function(favorite) {
// 	console.log(favorite.get());
// });

// db.user.find({where: {firstName: 'Thomas'}}).then(function(user) {
// 	db.pizza.findOrCreate({where: {city: 'Seattle'}}).spread(function(pizza, created) {
// 		user.addPizza(pizza).then(function() {
// 			console.log(pizza);
// 		});
// 	});
// });

// db.user.find({where: {firstName: 'Thomas'}}).then(function(user) {
// 	db.favorite.findOrCreate({where: {yelpId: 'tommy-boy-pizzeria'}}).spread(function(favorite, created) {
// 		user.addFavorite(favorite).then(function() {
// 			console.log(favorite);
// 		});
// 	});
// });