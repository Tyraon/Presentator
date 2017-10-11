/*var loading = '<div id="loading" style="width:100%; height:100%; background:rgba(255,255,255,0.6); text-align:center; position:absolute; top:0px; left:0px;"><img src="style/img/loading/103.gif" style="margin-top:200px;" /></div>';*/

function loaders(){
	$('body').append('<div id="loading" style="width:100%; height:100%; background:rgba(255,255,255,0.6); text-align:center; position:absolute; top:0px; left:0px; overflow: hidden;"><div id="loader"></div></div>');
	$('#loader').css({'background': 'none',	'width': '50px', 'height': '50px', 'border-top': '6px solid #3355dd', 'border-radius': '50px 50px 50px 50px', 'position': 'absolute', 'left': '0', 'right': '0', 'margin-left': 'auto', 'margin-right': 'auto', 'top': '0', 'bottom': '0', 'margin-top': 'auto', 'margin-bottom': 'auto', 'box-shadow': 'inset 0px 2px 0px rgba(0,0,0,0.6), 0px -2px 0px rgba(0,0,0,0.6)'});
	$.keyframe.define([{
		name : 'loadcirc',
		'0%' : {'transform': 'rotate(0deg)'},
		'25%' : {'transform': 'rotate(90deg)'},
		'50%' : {'transform': 'rotate(180deg)'},
		'75%' : {'transform': 'rotate(270deg)'},
		'100%' : {'transform': 'rotate(360deg)'}
	}]);
	$('#loader').playKeyframe({
		name: 'loadcirc',
		duration : '1s',
		timingFunction : 'linear',
		iterationCount : 'infinite',
		direction : 'normal',
		fillMode : 'forwards',
		complete : function(){}
	});
}

var histignore = [];

var historyAjax = (function(){
	return{
		set: function(url,method,data,target,typ,succ,err){
			if(histignore.indexOf(url) == -1){
				history.pushState({current_page: url,method: method,data: data,target: target,typ: typ,succ: succ,err: err},null,null);
			}
		},
		get: function(){
			if(history.state.method == 'post'){
				ajax.post(history.state.current_page,history.state.data,history.state.target,history.state.typ,1);
			}
			if(history.state.method == 'get'){
				ajax.get(history.state.current_page,history.state.target,1);
			}
			if(history.state.method == 'callback'){
				ajax.callback(history.state.current_page,history.state.data,history.state.succ,history.state.err,1);
			}
		}
	}

})();

$(window).on('popstate',function(e){
	//console.log(history.state);
	historyAjax.get();
});


var ajax = (function(){
	return{
		get: function(url,target,hist){
			loaders();
			if(hist != 1){
			$.ajax({
				url: 'php/' + url,
				method: 'GET'
			}).success(function(result){
				$(target).html(result);
				$('#loading').remove();
				historyAjax.set(url,'get','',target,'','','');
			});
			}else{
			$.ajax({
				url: 'php/' + url,
				method: 'GET'
			}).success(function(result){
				$(target).html(result);
				$('#loading').remove();
			});
			}
		},

		post: function(url,data,target,type,hist){
			loaders();
			if(hist != 1){
			$.ajax({
				url: 'sys/' + url,
				method: 'POST',
				data:data
			}).success(function(result){
				if(type == 1) {
					$(target).append(result);
				} else {
					$(target).html(result);
				}
				$('#loading').remove();
				historyAjax.set(url,'post',data,target,type,'','');
			});
			}else{
			$.ajax({
				url: 'sys/' + url,
				method: 'POST',
				data:data
			}).success(function(result){
				if(type == 1) {
					$(target).append(result);
				} else {
					$(target).html(result);
				}
				$('#loading').remove();
			});
			}
		},

		callback: function(url,data,succ,err,hist){
			loaders();
			if(hist != 1){
			$.ajax({
				url: 'sys/' + url,
				method: 'POST',
				data:data
			}).done(succ).error(err);
			$('#loading').remove();
			
				historyAjax.set(url,'callback',data,'','',succ.toString(),err.toString());
			}else{
			$.ajax({
				url: 'sys/' + url,
				method: 'POST',
				data:data
			}).done(function(result){
			eval('var run = ' + succ);
			run(result);
			}).error(err);
			$('#loading').remove();
			}
		}
	}
})();