'use strict';

var PensionAge = function () {};

PensionAge.prototype.handler = Alexa.CreateStateHandler(states.PENSIONAGE,
    {
        'NewSession': function () {
            this.handler.state = '';
            this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
        },
        'AMAZON.YesIntent': function () {
            this.handler.state = states.AMOUNTPAID;
            this.attributes['pensionAge'] = true;
            this.emit(':ask', 'Great. Now, what is your ' + calculationModes.toString(this.attributes['calcMode']) + ' in pounds and pence?', 'What is your ' + calculationModes.toString(this.attributes['calcMode']) + ' in pounds and pence');
        },
        'AMAZON.NoIntent': function () {
            this.handler.state = states.AMOUNTPAID;
            this.attributes['pensionAge'] = false;
            this.emit(':ask', 'Ok, thank you. Now, what is your ' + calculationModes.toString(this.attributes['calcMode']) + ' in pounds and pence?', 'What is your ' + calculationModes.toString(this.attributes['calcMode']) + ' in pounds and pence');
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'To work out the correct tax due I kneed to know if you are over the state pension age. Please say yes, or no.', 'Are you over the state pension age?');
        },
        'SessionEndedRequest': function () {
            console.log('session ended in state = PENSIONAGE');
        },
        'Unhandled': function () {
            this.emit(':ask', 'Sorry, I didn\'t get that. Are you over the state pension age?', 'Are you over the state pension age?');
        }
    }
);

module.exports = new PensionAge();