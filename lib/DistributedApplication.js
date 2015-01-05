!function() {

	var   Class 		         = require('ee-class')
		, log 			         = require('ee-log')
        , DistributedService     = require('distributed-service');



	module.exports = new Class({
        inherits: DistributedService

		

        , init: function init(options) {
            
            // super needs to set up the service
            init.super.call(this, options);
        }
	});
}();
