var JaFEx = (function(){
	return{

		str_count: function(str,val){
			var reg = new RegExp(val, 'g');
			var arr = str.match(reg);
			var count = arr != null ? arr.length : 0;
			return count;
		},
	
		str_pos: function(str,val){
			var reg = new RegExp(val, 'g');
			var arr = str.match(reg);
			var out = [];
			var edit = str;
			if(arr != null){
				for(var i = 0; i < arr.length; i++){
					out.push(edit.indexOf(val)+(str.length-edit.length));
					edit = edit.substr(edit.indexOf(val)+val.length);
				}
			}
			return out;
		},
		
		pick: (function(){
			return{
				before: function(str,char,direction){
					if(direction == 'first' || direction == '' || direction == undefined){
						var cont = str.split(char);
						var out = cont[0];
					}else if(direction == 'last'){
						var cont = str.split(char);
						var out = cont[(cont.length-2)];
					}else{
						var out = str;
						console.error('JaFEx: Direction not available. JaFEx.pick.before(str,char[,first/last]); Default is "first".');
					}
					return out;
				},
				after: function(str,char,direction){
					if(direction == 'last' || direction == '' || direction == undefined){
						var cont = str.split(char);
						var out = cont[(cont.length-1)];
					}else if(direction == 'first'){
						var cont = str.split(char);
						var out = cont[1];
					}else{
						var out = str;
						console.error('JaFEx: Direction not available. JaFEx.pick.after(str,char[,first/last]); Default is "last".');
					}
					return out;
				}
			}
		})(),

		dechex: function(dec){
			return dec.toString(16);
		},

		hexdec: function(hex){
			return parseInt(hex,16);
		},
	
		decbin: function(dec){
			return parseInt(dec.toString(2));
		},

		bindec: function(bin){
			return parseInt(bin,2);
		},
		
		fill: (function(){
			return{
			before: function(string,char,count){
				var fill = '';
				for(var i = 0; i < count; i++){
					fill += char;
				}
				return fill+string;
			},
	
			after: function(string,char,count){
				var fill = '';
				for(var i = 0; i < count; i++){
					fill += char;
				}
				return string+fill;
			},

			forend: function(string,char,count){
				var fill = '';
				for(var i = 0; i < count; i++){
					fill += char;
				}
				return fill+string+fill;
			}
		}})(),

		specchar: function(str){
			return str.replace(/[^abcdefghijklmnopqrstuvwxyz1234567890,.+-]/gi,function(str){return "&#" + str.charCodeAt(0) + ";"});
		},

		soundex: function(str){
			str = (str + '').toUpperCase();
			if (!str) {
			    return '';
			}
			var sdx = [0, 0, 0, 0]
			var m = {
			    B: 1,
			    F: 1,
			    P: 1,
			    V: 1,
			    C: 2,
			    G: 2,
			    J: 2,
			    K: 2,
			    Q: 2,
			    S: 2,
			    X: 2,
			    Z: 2,
			    D: 3,
			    T: 3,
			    L: 4,
			    M: 5,
			    N: 5,
			    R: 6
			}
			var i = 0;
			var j;
			var s = 0;
			var c;
			var p;
			while ((c = str.charAt(i++)) && s < 4) {
			    if ((j = m[c])) {
			      if (j !== p) {
			        sdx[s++] = p = j;
			      }
			    } else {
			      s += i === 1;
			      p = 0;
			    }
			}
			sdx[0] = str.charAt(0);
			return sdx.join('');
		},

		metaphone: function(word,maxPhonemes){
			var type = typeof word;
			if (type === 'undefined' || type === 'object' && word !== null) {
			    return null;
			}

			if (type === 'number') {
			    if (isNaN(word)) {
			      word = 'NAN';
			    } else if (!isFinite(word)) {
			      word = 'INF';
			    }
			}
			if (maxPhonemes < 0) {
			    return false;
			}
			maxPhonemes = Math.floor(+maxPhonemes) || 0
			var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			var vowel = 'AEIOU'
			var soft = 'EIY'
			var leadingNonAlpha = new RegExp('^[^' + alpha + ']+')
			word = typeof word === 'string' ? word : ''
			word = word.toUpperCase().replace(leadingNonAlpha, '')
			if (!word) {
			    return ''
			}
			var is = function (p, c) {
			    return c !== '' && p.indexOf(c) !== -1
			}
			var i = 0
			var cc = word.charAt(0)
			var nc = word.charAt(1)
			var nnc
			var pc
			var l = word.length
			var meta = ''
			var traditional = true
			switch (cc) {
			    case 'A':
			      meta += nc === 'E' ? nc : cc
			      i += 1
			      break
			    case 'G':
			    case 'K':
			    case 'P':
			      if (nc === 'N') {
			        meta += nc
			        i += 2
			      }
			      break
			    case 'W':
			      if (nc === 'R') {
			        meta += nc
			        i += 2
			      } else if (nc === 'H' || is(vowel, nc)) {
			        meta += 'W'
			        i += 2
			      }
			      break
			    case 'X':
			      meta += 'S'
			      i += 1
			      break
			    case 'E':
			    case 'I':
			    case 'O':
			    case 'U':
			      meta += cc
			      i++
			      break
			}
			for (; i < l && (maxPhonemes === 0 || meta.length < maxPhonemes); i += 1) { 
			    cc = word.charAt(i)
			    nc = word.charAt(i + 1)
			    pc = word.charAt(i - 1)
			    nnc = word.charAt(i + 2)
			    if (cc === pc && cc !== 'C') {
			      continue
			    }
			    switch (cc) {
			      case 'B':
			        if (pc !== 'M') {
			          meta += cc
			        }
			        break
			      case 'C':
			        if (is(soft, nc)) {
			          if (nc === 'I' && nnc === 'A') {
			            meta += 'X'
			          } else if (pc !== 'S') {
			            meta += 'S'
			          }
			        } else if (nc === 'H') {
			          meta += !traditional && (nnc === 'R' || pc === 'S') ? 'K' : 'X'
			          i += 1
			        } else {
			          meta += 'K'
			        }
			        break
			      case 'D':
			        if (nc === 'G' && is(soft, nnc)) {
			          meta += 'J'
			          i += 1
			        } else {
			          meta += 'T'
			        }
			        break
			      case 'G':
			        if (nc === 'H') {
			          if (!(is('BDH', word.charAt(i - 3)) || word.charAt(i - 4) === 'H')) {
			            meta += 'F'
			            i += 1
			          }
			        } else if (nc === 'N') {
			          if (is(alpha, nnc) && word.substr(i + 1, 3) !== 'NED') {
			            meta += 'K'
			          }
			        } else if (is(soft, nc) && pc !== 'G') {
			          meta += 'J'
			        } else {
			          meta += 'K'
			        }
			        break
			      case 'H':
			        if (is(vowel, nc) && !is('CGPST', pc)) {
			          meta += cc
			        }
			        break
			      case 'K':
			        if (pc !== 'C') {
			          meta += 'K'
			        }
			        break
			      case 'P':
			        meta += nc === 'H' ? 'F' : cc
			        break
			      case 'Q':
			        meta += 'K'
			        break
			      case 'S':
			        if (nc === 'I' && is('AO', nnc)) {
			          meta += 'X'
			        } else if (nc === 'H') {
			          meta += 'X'
			          i += 1
			        } else if (!traditional && word.substr(i + 1, 3) === 'CHW') {
			          meta += 'X'
			          i += 2
			        } else {
			          meta += 'S'
			        }
			        break
			      case 'T':
			        if (nc === 'I' && is('AO', nnc)) {
			          meta += 'X'
			        } else if (nc === 'H') {
			          meta += '0'
			          i += 1
			        } else if (word.substr(i + 1, 2) !== 'CH') {
			          meta += 'T'
			        }
			        break
			      case 'V':
			        meta += 'F'
			        break
			      case 'W':
			      case 'Y':
			        if (is(vowel, nc)) {
			          meta += cc
			        }
			        break
			      case 'X':
			        meta += 'KS'
			        break
			      case 'Z':
			        meta += 'S'
			        break
			      case 'F':
			      case 'J':
			      case 'L':
			      case 'M':
			      case 'N':
			      case 'R':
			        meta += cc
			        break
			    }
			}
			return meta
		},

		similar: function(first, second, percent){
			if (first === null ||
			    second === null ||
			    typeof first === 'undefined' ||
			    typeof second === 'undefined') {
			    return 0
			}
			first += ''
			second += ''
			var pos1 = 0
			var pos2 = 0
			var max = 0
			var firstLength = first.length
			var secondLength = second.length
			var p
			var q
			var l
			var sum
			for (p = 0; p < firstLength; p++) {
			    for (q = 0; q < secondLength; q++) {
			      for (l = 0; (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === 				second.charAt(q + l)); l++) {
			      }
			      if (l > max) {
			        max = l
			        pos1 = p
			        pos2 = q
			      }
			    }
			}
			sum = max
			if (sum) {
			    if (pos1 && pos2) {
			      sum += JaFEx.similar(first.substr(0, pos1), second.substr(0, pos2))
			    }
			    if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
			      sum += JaFEx.similar(
			        first.substr(pos1 + max, firstLength - pos1 - max),
			        second.substr(pos2 + max,
			        secondLength - pos2 - max))
			    }
			}
			if (!percent) {
			    return sum
			}
			return (sum * 200) / (firstLength + secondLength)
		},

		userMedia: (function(){
			return{
				getMicro: function(success,error){
					navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
					if(navigator.getUserMedia){					navigator.getUserMedia({audio:true,video:false}, function(localMediaStream) {
						var input = URL.createObjectURL(localMediaStream);
						success(input);
					},error);
					}else{
						console.error('getUserMedia() is not supported in your browser');
					}
				},

				getWebcam: function(success,error){
					navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
					if(navigator.getUserMedia){					navigator.getUserMedia({audio:false,video:true},function(localMediaStream){
						var input = URL.createObjectURL(localMediaStream);
						success(input);
					},error);
					}else{
						console.error('getUserMedia() is not supported in your browser');
					}
				},
				
				getFull: function(success,error){
					navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
					if(navigator.getUserMedia){					navigator.getUserMedia({audio:true,video:true},function(localMediaStream){
						var input = URL.createObjectURL(localMediaStream);
						success(input);
					},error);
					}else{
						console.error('getUserMedia() is not supported in your browser');
					}
				}
			}
		})(),

		audio: (function(){
			return{
				play: function(player){
					document.getElementById(player).play();
				},
	
				pause: function(player){
					document.getElementById(player).pause();
				},

				stop: function(player){
					document.getElementById(player).pause;
					document.getElementById(player).currentTime = 0;
				},

				src: function(player,source){
					var aud = document.getElementById(player);
					
					if(aud.getElementsByTagName('source').length > 0){
						aud.getElementsByTagName('source')[0].src = source;
					}else{
						var so = document.createElement('source');
						so.setAttribute('src',source);
						aud.appendChild(so);
					}
				},
				volume: function(player,vol){
					document.getElementById(player).volume = (vol/100);
				},

				current: function(player,current){
					if(current != undefined){
						document.getElementById(player).currentTime = current;
					}else{
						return document.getElementById(player).currentTime;
					}
				},

				duration: function(player){
					return document.getElementById(player).duration;
				}
			}
		})(),

		video: (function(){
			return{
				play: function(player){
					document.getElementById(player).play;
				},

				pause: function(player){
					document.getElementById(player).pause;
				},

				stop: function(player){
					document.getElementById(player).pause;
					document.getElementById(player).currentTime = 0;
				},

				src: function(player,source){
					var aud = document.getElementById(player);
					
					if(aud.getElementsByTagName('source').length > 0){
						aud.getElementsByTagName('source')[0].src = source;
					}else{
						var so = document.createElement('source');
						so.setAttribute('src',source);
						aud.appendChild(so);
					}
				},

				volume: function(player,vol){
					document.getElementById(player).volume = (vol/100);
				},

				current: function(player,current){
					if(current != undefined){
						document.getElementById(player).currentTime = current;
					}else{
						return document.getElementById(player).currentTime;
					}
				},

				duration: function(player){
					return document.getElementById(player).duration;
				},

				fullScreen: function(player){
					var el = document.getElementById(player);
					el.requestFullscreen = (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullscreen || msRequestFullscreen);
					el.requestFullscreen();
				}
			}
		})(),

		date: function(str){
			var b = str.split('');
			var out = '';
			var date = new Date();
			var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Suturday'];
			var day_s = ['Sun','Mon','Tue','Wed','Thu','Fri','Sut'];
			var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			for(var i = 0; i < b.length; i++){
				switch(b[i]){
					default:
						out += b[i];
						break;
					case 'i':
						out += date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
						break;
					case 'd':
						out += date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
						break;
					case 'D':
						out += day_s[date.getDay()];
						break;
					case 'F':
						out += month[date.getMonth()];
						break;
					case 'g':
						out += date.getHours() > 12 ? (date.getHours()-12) : date.getHours() < 1 ? '12' : date.getHours();
						break;
					case 'G':
						out += date.getHours();
						break;
					case 'h':
						out += date.getHours() > 12 ? (date.getHours()-12) < 10 ? '0'+(date.getHours()-12) : (date.getHours()-12) : date.getHours() < 1 ? '12' : date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
						break;
					case 'H':
						out += date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
						break;
					case 'j':
						out += date.getDate();
						break;
					case 'l':
						out += day[date.getDay()];
						break;
					case 'm':
						out += (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
						break;
					case 'n':
						out += date.getMonth()+1;
						break;
					case 's':
						out += date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
						break;
					case 'w':
						out += date.getDay();
						break;
					case 'Y':
						out += date.getFullYear();
						break;
					case 'y':
						out += date.getFullYear().toString().substr(2);
						break;
				}
			}
			return out;
		},
		
		array_search: function(arr,char){
			var match = arr.filter(function(s){
				return s.indexOf(char) !== -1;
			});
			return match;
		}
	}
})();
JaFEx.prototype = JaFEx;
var X_ = JaFEx;
X_.prototype = X_;