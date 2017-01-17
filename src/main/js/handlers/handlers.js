'use strict';

var Handlers = function () {};

Handlers.prototype.newSession = require('./NewSession.js');
Handlers.prototype.startCalculator = require('./StartCalculator.js');
Handlers.prototype.calculationMode = require('./CalculationMode.js');
Handlers.prototype.taxCode = require('./TaxCode.js');
Handlers.prototype.pensionAge = require('./PensionAge.js');
Handlers.prototype.amountPaid = require('./AmountPaid.js');
Handlers.prototype.hoursWorked = require('./HoursWorked.js');
Handlers.prototype.calculate = require('./Calculate.js');

module.exports = new Handlers();