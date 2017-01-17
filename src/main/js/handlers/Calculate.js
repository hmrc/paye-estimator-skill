'use strict';

var Calculate = function () {};

Calculate.prototype.handler = Alexa.CreateStateHandler(states.CALCULATE,
    {
        'NewSession': function () {
            this.handler.state = '';
            this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
        },
        'CalculateIntent': function () {
            this.emit(':ask','Please tell me what other tax details you would like me to give you, or say stop to end this session.');
        },
        'AMAZON.YesIntent': function () {
            this.emit(':ask','What is your favorite colour?');
        },
        'AMAZON.NoIntent': function () {
            this.emit(':ask','What is your favorite cheese?');
        },
        'AMAZON.HelpIntent': function () {
            this.emit(':ask', 'Please tell me what tax details you would like me to give you.');
        },
        'SessionEndedRequest': function () {
            console.log('session ended in state = CALCULATE');
        },
        'Unhandled': function () {
            this.emit(':ask', 'Sorry, I didn\'t get that.', 'Sorry, I didn\'t get that.');
        }
    }
);

module.exports = new Calculate();