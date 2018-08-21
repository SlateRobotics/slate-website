var CartStore = require('./CartStore');
var OrderStore = require('./order');
var BlogStore = require('./blog');
var QuestionStore = require('./question');
var UserStore = require('./user');
var ReservationStore = require('./reservation');
var InventoryItemStore = require('./inventoryItem');

var Service = {
	cart: CartStore,
	order: OrderStore,
	blog: BlogStore,
	question: QuestionStore,
	user: UserStore,
	reservation: ReservationStore,
	inventoryItem: InventoryItemStore,
}

module.exports = Service;
