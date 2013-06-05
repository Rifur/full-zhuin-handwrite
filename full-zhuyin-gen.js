/* Generates full Mandarin Phonetic Symbols (aka Bopomofo) combinations. */
/* note: doesn't ignore any illegal words */

// Bopomofo with initial, middle and final consonants.
var bpmf = require('./single-data/zhuyin-single.json');

var iniCon = bpmf['initial'];
var midCon = bpmf['middle'];
var finCon = bpmf['final'];
var tone = bpmf['tone'];

function print_with(str) {
	console.log('"' + str + '"');
}

function gen_stroke(stroke, fadj) {
	var str = '';

	// how many strokes
	for(var i=0; i<stroke.length; ++i) {
		str = str + '(';

		// how many points per stroke
		for(var j=0; j<stroke[i].length; ++j) {
			str = str + '(';

			// get coordinates of each point
			str = str + fadj(stroke[i][j][0], stroke[i][j][1]) + ' ';
			
			str = str.slice(0, str.length - 1) + ')';
			
		}
		str = str + ') ';
	}

	return str;
}

function one_gen() {
	var fin = midCon.concat(finCon);

	/*
	*	final (+tone)
	*	middle (+tone)
	*/
	for(var i=0; i<fin.length; ++i) {
		var t =
				'(character (value ' + fin[i]['value'] + ' )' + 
				'(width 500) (height 500) (strokes ';

		t = t + gen_stroke(fin[i]['strokes'], function (x, y) { return '' + x + ' ' + y });

		console.log(t + '))');

		// with tone
		for(var j=0; j<tone.length; ++j) {
			var t =
				'(character (value ' + fin[i]['value'] + tone[j]['value'] + ' )' + 
				'(width 500) (height 500) (strokes ';

			t = t + gen_stroke(fin[i]['strokes'], function (x, y) { return '' + x + ' ' + y });

			if(tone[j]['value'] == '˙') {
				// fifth tone
				t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.1+250)|0) + ' ' + ((y*0.1)|0) });
			} else {
				// other tone
				t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.25+325)|0) + ' ' + ((y*0.25+225)|0) });
			}
			console.log(t + '))');
		}
	}
}

function two_gen() {
	var fin = midCon.concat(finCon);

	/*
	*	initial + middle (+ tone)
	*	initial + final (+ tone)
	*/
	for(var k=0; k<iniCon.length; ++k) {
		for(var i=0; i<fin.length; ++i) {
			var t =
				'(character (value ' + iniCon[k]['value'] + fin[i]['value'] + ' )' + 
				'(width 500) (height 500) (strokes ' 
			
			t = t + gen_stroke(iniCon[k]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5)|0); });
			t = t + gen_stroke(fin[i]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5+250)|0); });

			console.log(t + '))');

			// with tone
			for(var j=0; j<tone.length; ++j) {
				var t = 
					'(character (value ' + iniCon[k]['value'] + fin[i]['value'] + tone[j]['value'] + ')' + 
					'(width 500) (height 500) (strokes ';

				t = t + gen_stroke(iniCon[k]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5)|0); });
				t = t + gen_stroke(fin[i]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5+250)|0); });

				if(tone[j]['value'] == '˙') {
					// fifth tone
					t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.1+250)|0) + ' ' + ((y*0.1)|0) });
				} else {
					t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.25+325)|0) + ' ' + ((y*0.25+225)|0) });
				}
				console.log(t + '))');
			}
		}
	}


	/*
	*	middle + final (+ tone)
	*/
	for(var k=0; k<midCon.length; ++k) {
		for(var i=0; i<finCon.length; ++i) {
			var t = 
					'(character (value ' + midCon[k]['value'] + finCon[i]['value'] + ' )' + 
					'(width 500) (height 500) (strokes '; 
			
			t = t + gen_stroke(midCon[k]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5)|0); });
			t = t + gen_stroke(finCon[i]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5+250)|0); });

			console.log(t + '))');

			// with tone
			for(var j=0; j<tone.length; ++j) {
				var t = 
					'(character (value ' + midCon[k]['value'] + finCon[i]['value'] + tone[j]['value'] + ')' + 
					'(width 500) (height 500) (strokes ';

				t = t + gen_stroke(midCon[k]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5)|0); })
				t = t + gen_stroke(finCon[i]['strokes'], function (x, y) { return '' + ((x*0.5+125) | 0) + ' ' + ((y*0.5+250)|0); })

				if(tone[j]['value'] == '˙') {
					// fifth tone
					t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.1+250)|0) + ' ' + ((y*0.1)|0) });
				} else {
					t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.25)|0) + ' ' + ((y*0.25+225)|0) });
				}
				console.log(t + '))');
			}
		}
	}
}



function three_gen() {

	/*
	*	initial + middle + final (+ tone)
	*/
	for(var k=0; k<iniCon.length; ++k) {
		for(var h=0; h<midCon.length; ++h) {
			for(var i=0; i<finCon.length; ++i) {

				var t = 
					'(character (value ' + iniCon[k]['value'] + midCon[h]['value'] + finCon[i]['value'] + ' )' + 
					'(width 500) (height 500) (strokes '; 

				t = t + gen_stroke(iniCon[k]['strokes'], function (x, y) { return '' + ((x*0.33+165)|0) + ' ' + ((y*0.33)|0); })
				t = t + gen_stroke(midCon[h]['strokes'], function (x, y) { return '' + ((x*0.33+165)|0) + ' ' + ((y*0.33+165)|0); });
				t = t + gen_stroke(finCon[i]['strokes'], function (x, y) { return '' + ((x*0.33+165)|0) + ' ' + ((y*0.33+335)|0); });

				console.log(t + '))');

				// with tone
				for(var j=0; j<tone.length; ++j) {
					var t = 
					'(character (value ' + iniCon[k]['value'] + midCon[h]['value'] + finCon[i]['value'] + tone[j]['value'] + ' )' + 
					'(width 500) (height 500) (strokes '; 

					t = t + gen_stroke(iniCon[k]['strokes'], function (x, y) { return '' + ((x*0.33+165)|0) + ' ' + ((y*0.33)|0); })
					t = t + gen_stroke(midCon[h]['strokes'], function (x, y) { return '' + ((x*0.33+165)|0) + ' ' + ((y*0.33+165)|0); });
					t = t + gen_stroke(finCon[i]['strokes'], function (x, y) { return '' + ((x*0.33+165)|0) + ' ' + ((y*0.33+335)|0); });

					if(tone[j]['value'] == '˙') {
						// fifth tone
						t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.1+250)|0) + ' ' + ((y*0.1)|0) });
					} else {
						t = t + gen_stroke(tone[j]['strokes'], function (x, y) { return '' + ((x*0.33+337)|0) + ' ' + ((y*0.33+250)|0) });
					}

					console.log(t + '))');
				}
			}
		}
	}
}

one_gen();
two_gen();
three_gen();
