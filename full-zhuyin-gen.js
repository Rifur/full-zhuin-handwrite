/* Generates full Mandarin Phonetic Symbols (aka Bopomofo) combinations. */
/* note: doesn't ignore any illegal words */

// Bopomofo with initial, middle and final consonants.
var bpmf = require('./zhuyin-single.json');

var iniCon = bpmf['initial'];
var midCon = bpmf['middle'];
var finCon = bpmf['final'];
var tone = bpmf['tone'];

function one_gen() {
	var fin = midCon.concat(finCon);

	for(var i=0; i<fin.length; ++i) {
		console.log(fin[i]['value']);
		for(var j=0; j<tone.length; ++j) {
			console.log(fin[i]['value'] + tone[j]['value']);
		}
	}
}

function two_gen() {
	var fin = midCon.concat(finCon);

	for(var k=0; k<iniCon.length; ++k) {
		for(var i=0; i<fin.length; ++i) {
			console.log(iniCon[k]['value'] + fin[i]['value']);
			for(var j=0; j<tone.length; ++j) {
				console.log(iniCon[k]['value'] + fin[i]['value'] + tone[j]['value']);
			}
		}
	}
}

function three_gen() {
	for(var k=0; k<iniCon.length; ++k) {
		for(var h=0; h<midCon.length; ++h) {
			for(var i=0; i<finCon.length; ++i) {
				console.log(iniCon[k]['value'] + midCon[h]['value'] + finCon[i]['value']);
				for(var j=0; j<tone.length; ++j) {
					console.log(iniCon[k]['value'] + midCon[h]['value'] + finCon[i]['value'] + tone[j]['value']);
				}
			}
		}
	}
}

one_gen();
two_gen();
three_gen();