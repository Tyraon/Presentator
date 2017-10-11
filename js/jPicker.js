var jPick = (function(){
	return {
		state: function(container){
			//console.log(container);
			var state = container[0]["state"];
			var message = container[0]["message"];
			var timer = 0;
			timer = container[0]["timer"] >= 1 ? container[0]["timer"] : 0;
			container = container.slice(1);
			//alert(state);
			//delete container[0];
			//console.log(container);
			//console.log(state);
			if(state == -2){
				alert("State -2\n\nConfirm an ErrorMessage.\nErrorState\n\nMessage:" + message);
				$('body').append('<div id="stateMessage">' + message + '</div>');
				$('#stateMessage').css({"background": "rgba(240,200,200,0.95)","border":"1px solid #c00","border-radius":"10px","padding":"5px","color":"#c00","width":"400px","height":"100px","position":"absolute","top":"50","left":"0","right":"0","margin":"auto"});
				setTimeout(function(){$('#stateMessage').remove();},timer*1000);
			}

			if(state == -1){
				//alert("State -1\n\nPrinting an ErrorMessage.\nErrorState\n\nMessage:" + message);
				$('body').append('<div id="stateMessage">' + message + '</div>');
				$('#stateMessage').css({"background": "rgba(240,200,200,0.95)","border":"1px solid #c00","border-radius":"10px","padding":"5px","color":"#c00","width":"400px","height":"100px","position":"absolute","top":"50","left":"0","right":"0","margin":"auto"});
				setTimeout(function(){$('#stateMessage').remove();},timer*1000);
			}

			if(state == 0){
				alert("State 0\n\nNothing to do.\nSuccessState");
			}

			if(state == 1){
				alert("State 1\n\nPrinting a SuccessMessage.\nSuccessState\n\nMessage:" + message);
				$('body').append('<div id="stateMessage">' + message + '</div>');
				$('#stateMessage').css({"background": "rgba(200,240,200,0.95)","border":"1px solid #0c0","border-radius":"10px","padding":"5px","color":"#0c0","width":"400px","height":"100px","position":"absolute","top":"50","left":"0","right":"0","margin":"auto"});
				setTimeout(function(){$('#stateMessage').remove();},timer*1000);
			}

			if(state == 2){
				//alert("State 2\n\nConfirm a SuccessMessage.\nSuccessState\n\nMessage:" + message);
				$('body').append('<div id="stateMessage">' + message + '</div>');
				$('#stateMessage').css({"background": "rgba(200,240,200,0.95)","border":"1px solid #0c0","border-radius":"10px","padding":"5px","color":"#0c0","width":"400px","height":"100px","position":"absolute","top":"50","left":"0","right":"0","margin":"auto"});
				setTimeout(function(){$('#stateMessage').remove();},timer*1000);
			}
			return container;
		},

		confirm: function(container,exec){
			var state = container["state"];
			var message = container["message"];
			if(state == 1){
				$('body').append('<div id="stateMessage">' + message + '<br><span style="float:right;"><button bol="1" class="stateMessage_btn">Ok</button>&nbsp;<button bol="0" class="stateMessage_btn">Abbrechen</button></span></div>');
				$('#stateMessage').css({"background": "rgba(200,240,200,0.95)","border":"1px solid #0c0","border-radius":"10px","padding":"5px","color":"#0c0","width":"400px","min-height":"50px","position":"absolute","top":"50","left":"0","right":"0","margin":"auto"});
				$('.stateMessage_btn').each(function(){$(this).css({"color":"#0c0","background": "rgba(200,240,200,0.95)","border":"1px solid #0c0","border-radius":"5px","width":"100px"});});
			}

			if(state == 2){
				$('body').append('<div id="stateMessage">' + message + '<br><span style="float:right;"><button bol="1" class="stateMessage_btn">Ok</button>&nbsp;<button bol="0" class="stateMessage_btn">Abbrechen</button></span></div>');
				$('#stateMessage').css({"background": "rgba(240,200,200,0.95)","border":"1px solid #c00","border-radius":"10px","padding":"5px","color":"#c00","width":"400px","min-height":"50px","position":"absolute","top":"50","left":"0","right":"0","margin":"auto"});
				$('.stateMessage_btn').each(function(){$(this).css({"color":"#c00","background": "rgba(240,200,200,0.95)","border":"1px solid #c00","border-radius":"5px","width":"100px"});});
			}

			$('.stateMessage_btn').click(function(){
				var result;
				//alert("ready");
				if($(this).attr("bol") == "1") {
					result = true;
					//success();
				}else{
					result = false;
					//error();
				}
				$('#stateMessage').remove();
				exec(result);
			});
		}
	

	}
})();

