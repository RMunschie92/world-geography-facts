'use strict';
const Alexa = require('alexa-sdk');
const facts = require('./data/facts.js');
const APP_ID =  'amzn1.ask.skill.617a982e-806b-4dd6-ae2a-58ff0a2da142';

const languageString = {
  "en": {
    "translation": {
      "FACTS": facts["FACTS_EN_US"],
      "SKILL_NAME": 'World Geography Facts',
      "GET_FACT_MESSAGE": "Here's your geography fact: ",
      "HELP_MESSAGE": 'You can say tell me a geography fact, or, you can say exit... What can I help you with?',
      "HELP_REPROMPT": 'What can I help you with?',
      "STOP_MESSAGE": 'Goodbye!'
    }
  },
  "en-AU" : {
    "translation": {
      "FACTS": facts["FACTS_EN_AU"],
    },
  },
  "en-CA" : {
    "translation": {
      "FACTS": facts["FACTS_EN_CA"],
    },
  },
  "en-GB" : {
    "translation": {
      "FACTS": facts["FACTS_EN_GB"],
    },
  },
  "en-IN" : {
    "translation": {
      "FACTS": facts["FACTS_EN_IN"],
    },
  },
  "en-US" : {
    "translation": {
      "FACTS": facts["FACTS_EN_US"],
    },
  },
  "de-DE" : {
    "translation": {
      "FACTS": facts["FACTS_DE_DE"],
      "SKILL_NAME" = "Welt Geographie Fakten auf Deutsch";
      "GET_FACT_MESSAGE" = "Hier sind deine Fakten: ";
      "HELP_MESSAGE" = "Du kannst sagen, Nenne mir einen Fakt über den Geographie, oder du kannst Beenden sagen... Wie kann ich dir helfen?";
      "HELP_REPROMPT" = "Wie kann ich dir helfen?";
      "STOP_MESSAGE" = "Auf Wiedersehen!";
    },
  },
};

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
        const data = this.t('FACTS');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
