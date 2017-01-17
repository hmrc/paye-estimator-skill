'use strict';

var AmountPaid = function () {};


AmountPaid.prototype.handler = Alexa.CreateStateHandler(states.AMOUNTPAID,
    {
        'NewSession': function () {
            this.handler.state = '';
            this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
        },
        'AmountPaidIntent': function () {
            function valueOrZero(val) {
                var result = parseInt(val, 10);
                if (isNaN(result)) {
                    return 0;
                }
                return result;
            }

            var pounds = valueOrZero(this.event.request.intent.slots.pounds.value);
            var pence = valueOrZero(this.event.request.intent.slots.pence.value);

            this.attributes['incomeInPence'] = pounds * 100 + pence;

            console.log('got:  £' + pounds + '.' + pence);

            if (pounds == 0) {
                this.emit(':ask', 'To work out your tax due I need to know how much you are paid per ' + calculationModes.unit(this.attributes['calcMode']) + ' in pounds and pence.', 'How much are you paid in pounds and pence?');
            } else {
                this.emit(':ask', 'Thank you. I heard ' + pounds + ' pounds and ' + pence + ' pence. Is that right?', 'Is ' + pounds + ' pounds ' + pence + ' pence correct?');
            }
        },
        'AMAZON.YesIntent': function () {
            if (this.attributes['calcMode'] == calculationModes.HOURLY) {
                this.handler.state = states.HOURSWORKED;
                this.emit(':ask','Great. And finally, how many hours per week do you work?', 'How many hours week do you work each week?');
            } else {
                this.handler.state = states.CALCULATE;
                this.emitWithState('CalculateIntent');
            }
        },
        'AMAZON.NoIntent': function () {
            this.emit(':ask', 'Sorry. Please tell me your ' + calculationModes.toString(this.attributes['calcMode']) + 'in pounds and pence.',
                'How much you are paid per ' + calculationModes.unit(this.attributes['calcMode']) + ' in pounds and pence.');
        },
        'NotKnownIntent': function () {
            this.emit(':ask', 'It will be tricky to calculate your tax without this information. Perhaps you could give me an estimate of your ' + calculationModes.toString(this.attributes['calcMode']) + ' in pounds and pence.',
                'Please estimate your income per ' + calculationModes.unit(this.attributes['calcMode']) + 'in pounds and pence.');
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'To work out your tax due I need to know how much you are paid per ' + calculationModes.unit(this.attributes['calcMode']) + ' in pounds and pence.',
                'How much are you paid in pounds and pence per ' + calculationModes.unit(this.attributes['calcMode']) + '?');
        },
        'SessionEndedRequest': function () {
            console.log('session ended in state = AMOUNTPAID');
        },
        'Unhandled': function () {
            this.emit(':ask', 'Sorry, I didn\'t get that.', 'Sorry, I didn\'t get that.');
        }
    }
);

module.exports = new AmountPaid();