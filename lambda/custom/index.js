/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID =  'amzn1.ask.skill.617a982e-806b-4dd6-ae2a-58ff0a2da142';

const SKILL_NAME = 'Geography Facts';
const GET_FACT_MESSAGE = "Here's your geography fact: ";
const HELP_MESSAGE = 'You can say tell me a geography fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data = [
  'Istanbul, Turkey is the only city on the world that is located on two continents. A canal of the Bosphorous River separates the European side from the Asian side.',
  'The Grand Canyon is the world\'s largest canyon.',
  'Russia is the largest country in the world.',
  'Canada is the second largest country in the world.',
  'China is the third largest country in the world.',
  'The United States is the fourth largest country in the world.',
  'India has the second largest population in the world with one point three billion people.',
  'The United States has the third largest population in the world with three hundred and twenty three million people.',
  'The world\'s largest international border is the border of the United States and Canada. It is about eight thousand eight hundred kilometers, or, five thousand five hundred miles long and crosses through thirtreen U S states and eight Canadian provinces and territories.',
  'The world\'s longest continental mountain range is the Andes Mountains in South America. The Andes Mountain range stretches over seven thousand two hundred kilometers, or, four thousand five hundred miles from north to south.',
  'The Sahara Desert is the largest desert in the world.',
  'There are cold, polar deserts in the Arctic, and, in Antartica.',
  'At the population density of New York City everyone in the world could fit into Texas.',
  'Jacksonville, Florida is the largest city in the United States by land area.',
  'New York City is the largest city in the United States by population.',
  'The state of California has a higher population than Canada.',
  'The Great Wall of China is not, in fact visible from outer space.',
  'More than sixty percent of the world\'s population lives in Asia.',
  'Tokyo is the largest metropolitan city in the world by population, with more than thirty seven million people.',
  'Tokyo has a larger population than every U S state except for California.',
  'Ninety percent of the world\'s population lives in the Northern Hemisphere.',
  'In the Philippines, there’s an island that’s within a lake, on an island that’s within a lake, on an island.',
  'At their closest points, Russia and the United States are only two point four miles apart.',
  'Russia spans eleven time zones.',
  'Vatican city is the world\'s smallest country.',
  'Africa is the only continent that is in four hemispheres.',
  'The largest city proper in the world by population is Shanghai, with over twenty four million people.',
  'There is a debate over which river is the longest in the world. Some people believe it is the Nile while others believe it is the Amazon.',
  'The longest river in South America is the Amazon. It\'s length is six thousand nine hundred and ninety two kilometers, or, four thousand three hundred and forty five miles.',
  'The longest river in North America is the Mississippi. It\'s length is six thousand two hundred and seventy five kilometers, or, three thousand nine hundred and two miles.',
  'The longest river in Africa is the Nile. It\'s length is six thousand eight hundred and fifty three kilometers, or, four thousand two hundred and fifty eight miles.',
  'The longest river in Europe is the Volga. It\'s length is three thousand six hundred and forty five kilometers, or, two thousand two hundred and sixty six miles.',
  'The longest river in Asia is the Yangtze. It\'s length is six thousand three hundred kilometers, or, three thousand nine hundred and seventeen miles.',
  'The longest river in Australia is the Murray. It\'s length is two thousand five hundreda and eight kilometers, or, one thousand five hundred and fifty eight miles.',
  'The U S state that is closest to Africa is Maine.',
  'Both China and Russia are bordered by fourteen countries.',
  'Alaska is the most northern, most eastern, and most western U S state.',
  'Lesotho, San Morino, and the Vatican City are the only countries that are completely surrounded, or landlocked, by a single other country. Lesotho is landlocked within South Africa, while both San Morino and Vatican City are landlocked within Italy.',
  'The capital city with the highest elevation in the world is La Paz, Bolivia. La Paz has an elevation of three thousnd six hundred and forty meters, or, eleven thousand nine hundred and forty two feet above sea level.',
  'The capital city with the lowest elevation in the world is Baku, Azerbaijan. Baku has an elevation of twenty eight kilometers, or, ninety two feet below sea level.',
  'The world\'s highest large city is El Alto, Bolivia. El Alto has an elevation of four thousand one hundred fifty meters, or, thirteen thousand six hundred and fifteen feet above sea level.',
  'San Francisco, California is home to more dogs than children.',
  'More than forty buildings in Manhattan have their own zip code.',
  'Canada has more than half of all of the world\'s freshwater lakes.',
  'Nineteen of the world\'s twenty five highest peaks are in the Himalayas.',
  'Nauru is the only country in the world without a capital city.',
  'Every continent has a city called Rome, except Antartica.',
  'There is a three thousand five hundred mile long fence in Australia with the sole purpose of protecting sheep from wild dogs, or, dingoes, as they are called in Australia.',
  'Fresno is the most populous city in California with only one word in its name.',
  'Fresno, California is the largest city in the United States that does not have an interstate highway running through it.',
  'The highest mountain in both Asia and the world is Mount Everest, which has an elevation of eight thousand eight hundred and forty eight meters, or, twenty nine thousand and twenty nine feet above sea level. Part of Mount Everest is in China and the other part is in Nepal.',
  'The highest mountian in South America is Aconcagua,	which has an elevation of six thousand nine hundred and sixty one meters, or, twenty two thousand eight hundred and thirty eight feet. Aconcagua is located in Argentina.',
  'The highest mountain in North America is Denali, which has an elevation of six thousand one hundred and ninety four meters, or, twenty thousand three hundred and twenty two feet. Denali is located in Alaska, United States',
  'The highest mountain in Africa is Kilimanjaro, which has an elevation of five thousand eight hundred and ninety five meters, or, nineteen thousand three hundred and forty one feet. Kilimanjaro is located in Tanzania.',
  'The highest mountain in Europe is Mount Elbrus, which has an elevation of five thousand six hundred and forty two meters, or, eighteen thousand five hundred and ten feet. Mount Elbrus is located in Russia.',
  'The highest mountain in Antartica is Mount Vinson, which has an elevation of four thousand eight hundred and ninety two meters, or, sixteen thousand and fifty feet.',
  'The highest mountain in Australia is Mount Kosciuszko,	which has an elevation of two thousand two hundred and twenty eight meters, or, seven thousand three hundred and ten feet.',
  'The volcano, Mauna Kea, in Hawaii is in fact the world\'s tallest mountain, but not the highest. Mauna Kea rises four thousand two hundred and five meters, or, thirteen thousand seven hundred and ninety six feet, above sea level, but it extends about six thousand meters, or, nineteen thousand seven hundred feet, below the ocean\'s surface. Therefore, its total height is nearly a mile taller than Mount Everest.',
  'The international boundary between China and Nepal runs directly through the summit of Mount Everest.',
  'Shanghai has a larger population than every U-S state except for California and Texas.',
  'It is possible to get from Norway to North Korea by land, going through just one country, Russia.',
  'There are eleven states in the U S that are larger than the United Kingdom.',
  'There is a ranch in Texas that is bigger than Rhode Island.',
  'If someone in Stamford, Connecticut, travels a straight line north, east, west, or south, the next state they will encounter will be New York.',
  'Glaciers store roughly seventy five percent of the world\'s fresh water.',
  'China spans five time zones, but the entire country uses the same time zone.',
  'Russia is the most populous country in Europe. It has a population of about one hundred and forty four million people, but about forty million of them live in the Asian regions of the country. Germany is the largest country that is entirely in Europe, with a population of about eighty two million people.',
  'Nigeria is the most populous country in Africa. It has a population of about one hundred eighty two million people.',
  'Brazil is the most populous country in South America. It has a population of about two hundred and two million people.',
  'China is the most populous country in both Asia and in the world. It has a population of about one point four billion people. India is expected to overtake China\'s population by twenty twenty-four.',
  'Lake Baikal is the largest lake in the world. It is located in Russia.',
  'Lake Baikal holds about twenty percent of all the freshwater on the planet.',
  'Greenland is the world\'s largest island.',
  'There are forty four landlocked countries in the world.',
  'Liechtenstein and Uzbekistan are the only two countries that are doubly landlocked, meaning they are entirely surrounded by one or more landlocked countries.',
  'Twenty out of the fifty most populous cities in the world are in China.',
  'The Hang Son Doong cave in Vietnam is so massive that it has its own independent weather system.',
  'The Diomede Islands are a pair of small, rocky islands in the Bering Strait. Despite being only two point four miles apart from one another, the western island, Big Diomede, is twenty one hours ahead of the eastern island, Little Diomede. This is due to the fact that the International Date Line runs between them.',
  'Greenland is farther east, west, north, and south than Iceland.',
  'The entirety of Poland fits into Texas with enough space left over to drive around it.',
  'There are seventeen countries that do not have any rivers.',
  'The world\'s lowest point on dry land is the Dead Sea, which is four hundred and eighteen meters, or, one thousand three hundred and seventy one feet below sea level.',
  'Chimborazo, the highest mountain in Ecuador, is the farthest point on Earth\'s surface from the Earth\'s center. This is because it is located along the equatorial bulge.',
  'The most densely populated country in the world is Singapore, it has a population density of seven point seven nine six people per square kilometer.',
  'The most densely populated country with a population above ten million is Bangladesh, which has a population density of one thousand one hundred and thirty nine people per square kilometer.',
  'The least densely populated country in the world is Greenland, which has a population density of zero point zero three people per square kilometer.',
  'Russia takes up thirty nine percent of the land on the European continent and compromises fifteen percent of its population.',
  'Forty percent of the population of Greece live in its capital, Athens.',
  'The African continent is the world\'s oldest populated area.',
  'Africa is the second largest continent.',
  'Over twenty five percent of all languages are spoken only in Africa with over two thousand recognized languages spoken on the continent.',
  'Australia is the smallest continent.',
  'Asia is the largest continent.',
  'Angel Falls in Venezuela is the highest uninterrupted waterfall in the world. It is nine hundred and seventy nine meters high.',
  'The Atacama Desert in Chile is considered the driest place in the world. Some parts of it have never received a single droplet of rain since scientists began keeping records.',
  'The world\'s highest point on land and lowest point on land are both in Asia.',
  'Indonesia is made up of over seventeen thousand islands, effectively making it the world’s largest archipelago.',
  'The world\'s largest shopping mall is the South China Mall. It is located in Dongguan, China.',
  'Thirty five percent of Australia\'s total land is desert.',
  'Australia is the only country that covers an entire continent.',
  'The countries with the oldest populations are Monaco, Germany, and Japan.'
];

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
