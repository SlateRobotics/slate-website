var CartStore = require('./CartStore');
var OrderStore = require('./order');
var BlogStore = require('./blog');
var UserStore = require('./user');
var ReservationStore = require('./reservation');

var Service = {
	cart: CartStore,
	order: OrderStore,
	blog: BlogStore,
	user: UserStore,
	reservation: ReservationStore,
}

module.exports = Service;
