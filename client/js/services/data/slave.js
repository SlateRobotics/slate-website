var $ = require('jquery');

function Slave(storeName) {

	this.name = storeName;
	this.root = "/stores/" + storeName + "/";

	return {
		get: function (success, error) {
			$.getJSON({
				url: this.root,
				success: function(data){
					callback(data);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					error({
						status: xhr.status,
						error: thrownError,
					});
				}
			});
		}.bind(this),

		getOne: function (id, success, error) {
			$.getJSON({
				url: this.root + id,
				success: function(data){
					success(data);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					error({
						status: xhr.status,
						error: thrownError,
					});
				}
			});
		}.bind(this),

		insert: function (doc, callback) {
			 $.ajax({
			 	url: this.root,
			 	type: 'POST',
	        	contentType: "application/json",
	    		data: JSON.stringify(doc),
	    		dataType: 'json',
			 	success: function(data){
			 		callback(data);
			    },
				error: function (xhr, ajaxOptions, thrownError) {
					console.log("XHR Status:", xhr.status);
					console.log("Thrown Error:", thrownError);
				}
		    });
		}.bind(this),

		update: function (doc, callback) {
			 $.ajax({
			 	url: this.root + doc._id,
			 	type: 'PUT',
	        	contentType: "application/json",
	    		data: JSON.stringify(doc),
	    		dataType: 'json',
			 	success: function(data){
			 		callback(data);
			    },
				error: function (xhr, ajaxOptions, thrownError) {
					console.log("XHR Status:", xhr.status);
					console.log("Thrown Error:", thrownError);
				}
		    });
		}.bind(this),

		delete: function (doc, callback) {
			 $.ajax({
			 	url: this.root + doc._id,
			 	type: 'DELETE',
			 	success: function(data){
			 		callback(data);
			    },
				error: function (xhr, ajaxOptions, thrownError) {
					console.log("XHR Status:", xhr.status);
					console.log("Thrown Error:", thrownError);
				}
		    });
		}.bind(this),
	}
}

module.exports = Slave;
