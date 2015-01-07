!function() {

	var   Class 		         = require('ee-class')
		, log 			         = require('ee-log')
        , type                   = require('ee-types')
        , Promise                = (Promise || require('es6-promise').Promise)
        , Request                = require('distributed-service-control-message')
        , DistributedService     = require('distributed-service');



	module.exports = new Class({
        inherits: DistributedService

		

        , init: function init(options) {
            
            // super needs to set up the service
            init.super.call(this, options);
        }




        /**
         * start an instance of a service in the context of the application
         *
         * @param <String> service identifier
         * @param <String> semantic service version
         * @oaram <String> service instance name
         * @param <Object> config for the service
         */
        , executeService: function(serviceId, semanticServiceVersion, serviceInstanceName, config) {
            if (!type.string(serviceId)) return Promise.reject(new Error('Expecting the service id of the service to execute!'));
            if (!type.string(semanticServiceVersion)) return Promise.reject(new Error('Expecting the semantic service version of the service to execute!'));
            if (!type.string(serviceInstanceName)) return Promise.reject(new Error('Expecting the service instance name of the service to execute!'));

            return new Promise(function(resolve, reject) {
                var message = new Request();

                message.sender = this;

                message.recipient = {
                      applicationId : this.applicationId
                    , name          : 'servicehost'
                    , version       : '0.1.x'
                };


                message.action = message.actions.EXECUTE_SERVICE;


                message.content = {
                      serviceId : serviceId
                    , version   : semanticServiceVersion
                    , name      : serviceInstanceName
                    , config    : config
                };

                message.send(this).then(function(response) {
                    if (response.status !== response.statuses.OK) reject(new Error(this.createMessage('Failed to execute service. Status «$1»: $2', response.status, response.content.description)));
                    else resolve(response.content);
                }.bind(this)).catch(reject);
            }.bind(this));
        }
	});
}();
