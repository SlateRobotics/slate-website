/*
	This is a layer of security to make it easier to ensure that
	consumers of this API are not able to modify data that they
	are not authorized to modify. You just need to define how
	to find one of the documents, how find many of the documents,
	the filter schema, and the node-restful/mongoose document model.

	In your findOne and findMany methods, include the business logic
	required to ensure that a given user only is returned the docs
	that they are authorized to see.

	Returns an express route.
*/

var express = require('express');
var router = express.Router();

var GetRequestWithoutId = require('./getRequestWithoutId');
var GetRequestWithId = require('./getRequestWithId');
var ValidateRequestWithoutId = require('./validateRequestWithoutId');
var ValidateRequestWithId = require('./validateRequestWithId');

module.exports = function (config) {
  this.config = config;
  this.router = router;

  this.config.invalidRequest = {
    success: false,
    message: "Authentication error."
  }

  this.router.get(this.config.path, new GetRequestWithoutId(config).route);
  this.router.get(this.config.path + '/:id', new GetRequestWithId(config).route);

  var PUT = {
    method: 'put',
    before: new ValidateRequestWithId(this.config).route
  };
  var POST = {
    method: 'post',
    before: new ValidateRequestWithoutId(this.config).route
  };
  var DELETE = {
    method: 'delete',
    before: new ValidateRequestWithId(this.config).route
  };

  this.config.model.methods([PUT, POST, DELETE]);
  this.config.model.register(this.router, config.path);

}
