'use strict';

var NewSession = function () {};

NewSession.prototype.handler = {
    'NewSession': function() {
        if(Object.keys(this.attributes).length === 0) {
            this.attributes['calcMode'] = "";
            this.attributes['endedSessionCount'] = 0;
        }
        this.handler.state = states.STARTMODE;
        this.emit(':ask', 'Welcome to the <say-as interpret-as="characters">PAYE</say-as> tax calculator. Would you like me to calculate your tax?',
            'Say yes to start the calculator or no to quit.');
    }
};

module.exports = new NewSession();