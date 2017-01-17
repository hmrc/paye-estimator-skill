'use strict';

var StartCalculator = function () {};

StartCalculator.prototype.handler = Alexa.CreateStateHandler(states.STARTMODE,
    {
        'NewSession': function () {
            this.emit('NewSession'); // Uses the handler in newSessionHandlers
        },
        'AMAZON.HelpIntent': function () {
            var message = 'I can estimate how much Income Tax and National Insurance you will need to pay this year. Do you want me to do this?';
            this.emit(':ask', message, message);
        },
        'AMAZON.YesIntent': function () {
            this.handler.state = states.CALCMODE;
            this.emit(':ask', 'Great. Do you want me to calculate your tax based on your weekly, monthly, or yearly pre tax income, or based on an hourly rate?', 'Try saying weekly, monthly, yearly, or hourly.');
        },
        'AMAZON.NoIntent': function () {
            this.emit(':tell', 'Ok, maybe another time!');
        },
        'SessionEndedRequest': function () {
            console.log('session ended!');
            // this.attributes['endedSessionCount'] += 1;
            // this.emit(':saveState', true);
        },
        'Unhandled': function () {
            var message = 'Say yes to continue, or no to end the calculator.';
            this.emit(':ask', message, message);
        }
    }
);

module.exports = new StartCalculator();