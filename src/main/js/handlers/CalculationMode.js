'use strict';

var CalculationMode = function () {};

CalculationMode.prototype.handler = Alexa.CreateStateHandler(states.CALCMODE,
    {
        'NewSession': function () {
            this.handler.state = '';
            this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
        },
        'CalculationModeIntent': function () {
            var calcMode = calculationModes.parse(this.event.request.intent.slots.mode.value);

            console.log('calculate tax based on: ' + calcMode);
            if (calcMode == undefined) {
                this.emit('Unhandled');
                return;
            }

            this.attributes['calcMode'] = calcMode;
            this.handler.state = states.TAXCODE;
            this.emit(':ask', 'Got it! To work out the tax due I will need some more details. First, what is your tax code?', 'Please tell me your tax code.');
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'I can calculate tax based on your weekly, monthly, or yearly pre tax income, or based on an hourly rate"', 'Try saying weekly, monthly, yearly, or hourly.');
        },
        'SessionEndedRequest': function () {
            console.log('session ended in state = CALCMODE');
            // this.emit(':saveState', true);
        },
        'Unhandled': function () {
            this.emit(':ask', 'Sorry, I didn\'t get that.', 'Try saying weekly, monthly, yearly, or hourly.');
        }
    }
);

module.exports = new CalculationMode();