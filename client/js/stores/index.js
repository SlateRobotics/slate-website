var CartStore = require('./CartStore');
var OrderStore = require('./order');
var BlogStore = require('./blog');
var UserStore = require('./user');

var Service = {
	cart: CartStore,
	order: OrderStore,
	blog: BlogStore,
	user: UserStore,
}

module.exports = Service;
