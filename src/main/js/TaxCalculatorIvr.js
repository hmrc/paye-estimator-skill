'use strict';

global.states = Object.freeze({
    STARTMODE: '_START_MODE',
    CALCMODE: '_CALC_MODE',
    TAXCODE: '_TAX_CODE',
    PENSIONAGE: '_PENSION_AGE',
    AMOUNTPAID: '_AMOUNT_PAID',
    HOURSWORKED: '_HOURS_WORKED',
    CALCULATE: '_CALCULATE'
});

global.calculationModes = {
    HOURLY: '_HOURLY',
    WEEKLY: '_WEEKLY',
    MONTHLY: '_MONTHLY',
    YEARLY: '_YEARLY'
};

global.calculationModes.parse = function(str) {
    if (str) {
        var key = str.toUpperCase();
        if (Object.keys(this).indexOf(key) < 0) {
            return undefined;
        }
        return this[key];
    }
    return undefined;
};

global.calculationModes.toString = function(mode) {
    var result = '';
    switch(mode) {
        case global.calculationModes.WEEKLY:
        case global.calculationModes.MONTHLY:
        case global.calculationModes.YEARLY:
            result = mode.replace(/[^A-Z]/gi,'') + ' income before tax';
            break;
        case global.calculationModes.HOURLY:
            result = 'hourly rate';
    }
    return result;
};

global.calculationModes.unit = function(mode) {
    return mode.replace(/[^A-Z]/gi,'').slice(0,2).toLowerCase();
};

Object.freeze(global.calculationModes);

var TaxCalculatorIvr = function () {};

TaxCalculatorIvr.prototype.handlers = require('./handlers/handlers.js');

module.exports = new TaxCalculatorIvr();