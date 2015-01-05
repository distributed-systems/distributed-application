# distributed-application

description

## installation



## build status

[![Build Status](https://travis-ci.org/eventEmitter/distributed-application.png?branch=master)](https://travis-ci.org/eventEmitter/distributed-application)


## usage
        
    // you need a service host first
    var serviceHost = new ServiceHost();

    

    // register services
    serviceHost.registerService({
          name: 'distributed-relational-crud-service'
        , path: ''
        , version: ''
    });


    // register services
    serviceHost.registerService({
          name: 'distributed-application'
        , path: ''
        , version: ''
    });


    // you may tell the service host to start a service
    serviceHost.executeService('distributed-application');


    // retreive the first app service instance
    var app = serviceHost.getService().first();


    // tell the app to start a specific service
    app.loadService('distributed-relational-crud-service', serviceConfigObject);


