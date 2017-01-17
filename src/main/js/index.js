'use strict';

global.Alexa = require('alexa-sdk');

var TaxCalculatorIvr = require('./TaxCalculatorIvr.js');
// var PayeEstimator = require('paye-estimator-js');

var appId = ''; //'amzn1.echo-sdk-ams.app.your-skill-id';

// var service = PayeEstimator.services.LiveTaxCalculatorService();
// var result = service.calculateTax("false", 2015, "1100L", 100000, "weekly", -1);
// console.log(result)

exports.handler = function(event, context, callback) {
    var alexa = global.Alexa.handler(event, context);
    alexa.appId = appId;
    // alexa.dynamoDBTableName = 'taxCalculatorUsers';
    alexa.registerHandlers(
        TaxCalculatorIvr.handlers.newSession.handler,
        TaxCalculatorIvr.handlers.startCalculator.handler,
        TaxCalculatorIvr.handlers.calculationMode.handler,
        TaxCalculatorIvr.handlers.taxCode.handler,
        TaxCalculatorIvr.handlers.pensionAge.handler,
        TaxCalculatorIvr.handlers.amountPaid.handler,
        TaxCalculatorIvr.handlers.hoursWorked.handler,
        TaxCalculatorIvr.handlers.calculate.handler
    );
    alexa.execute();
};