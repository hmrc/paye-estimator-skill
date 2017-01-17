'use strict';

var TaxCode = function () {};


TaxCode.prototype.handler = Alexa.CreateStateHandler(states.TAXCODE,
    {
        'NewSession': function () {
            this.handler.state = '';
            this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
        },
        'TaxCodeIntent': function () {
            var validator = require('./TaxCodeValidator.js');

            function valueOrEmptyString(val) {
                var r = /[0-9a-zA-Z]/;
                if (typeof val != 'undefined' && val) {
                    return (r.test(val)) ? val.toUpperCase().charAt(0) : '';
                }
                return '';
            }

            var code = '' + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitA.value)
                + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitB.value)
                + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitC.value)
                + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitD.value)
                + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitE.value)
                + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitF.value)
                + valueOrEmptyString(this.event.request.intent.slots.taxCodeDigitG.value);

            console.log('got tax code:' + code);

            if (validator.isValidTaxCode(code)) {
                this.attributes['taxCode'] = code;
                this.emit(':ask', 'You told me your tax code is <say-as interpret-as="characters">' + code + '</say-as>. Is that right?', 'Is your tax code <say-as interpret-as="characters">' + code + '</say-as>');
            } else {
                if (code.length > 0) {
                    code = '<say-as interpret-as="characters">' + code + '</say-as>'
                } else {
                    code = 'that'
                }
                this.emit(':ask', 'Sorry, ' + code + ' doesn\'t appear to be a valid tax code. Please try again.', 'Sorry, I didn\'t recognise your tax code. Please try again.');
            }
        },
        'NotKnownIntent': function () {
            this.attributes['taxCode'] = '1100L';
            this.emit(':ask', 'No problem. The tax code currently used for most people who have one job is <say-as interpret-as="characters">1100L</say-as>. Would you like me to use this code?', 'Would you like me use the most common tax code?');
        },
        'AMAZON.YesIntent': function () {
            console.log('using tax code:' + this.attributes['taxCode']);
            this.handler.state = states.PENSIONAGE;
            this.emit(':ask', 'Thank you. Are you over the state pension age?', 'Are you currently drawing a state pension?');
        },
        'AMAZON.NoIntent': function () {
            this.emit(':ask', 'Sorry, please say your tax code again.', 'Try saying your tax code again');
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'To work out your tax due I need to know your tax code. You can find it on your pay slip or on your pee 45 or pee 60.', 'What is your tax code.');
        },
        'SessionEndedRequest': function () {
            console.log('session ended in state = TAXCODE');
        },
        'Unhandled': function () {
            this.emit(':ask', 'Sorry, I didn\'t get that.', 'Your tax code is made up of numbers and letters, for example <say-as interpret-as="characters">1100L</say-as>. If you don\'t know say, I don\'t know', 'Please try again');
        }
    }
);

module.exports = new TaxCode();