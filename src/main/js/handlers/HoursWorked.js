'use strict';

var HoursWorked = function () {};

HoursWorked.prototype.handler = Alexa.CreateStateHandler(states.HOURSWORKED,
    {
        'NewSession': function () {
            this.handler.state = '';
            this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
        },
        'HoursWorkedIntent': function () {
            function valueOrZero(val) {
                var result = parseInt(val, 10);
                if (isNaN(result)) {
                    return 0;
                }
                return result;
            }

            var hours = valueOrZero(this.event.request.intent.slots.hours.value);

            this.attributes['hoursWorked'] = hours;

            console.log('got: ' + hours);

            if (hours == 0) {
                this.emit(':ask', 'To work out your tax I need to know how many hours per week you work.', 'How many hours do you work each week?');
            } else {
                this.emit(':ask', 'Great. You told me that you work ' + hours + ' hours per week. Is that right?', 'Is ' + hours + ' hours correct?');
            }
        },
        'AMAZON.YesIntent': function () {
            this.handler.state = states.CALCULATE;
            this.emitWithState('CalculateIntent');
        },
        'AMAZON.NoIntent': function () {
            this.emit(':ask', 'Sorry. Please tell me again how many hours you work each week.',
                'How many hours per week do you work?');
        },
        'NotKnownIntent': function () {
            this.emit(':ask', 'In that case you could perhaps give me an estimate of the number of hours you work each week.',
                'Please estimate how many hours you work each week.');
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'To work out your tax due I need to know how many hours per week you work.', 'How many hours do you work each week?');
        },
        'SessionEndedRequest': function () {
            console.log('session ended in state = HOURSWORKED');
        },
        'Unhandled': function () {
            this.emit(':ask', 'Sorry, I didn\'t get that.', 'Sorry, I didn\'t get that.');
        }
    }
);

module.exports = new HoursWorked();