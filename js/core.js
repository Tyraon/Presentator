var animator = (function(){
	return{
		shift: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		top: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","margin-top":"-100%","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		bottom: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","margin-top":"100%","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		left: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","margin-left":"-100%","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		right: function(next){
			console.log('zoom');
			$('#content').css({"transition":"all 1s linear","margin-right":"-100%","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		rotate_right: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotate(360deg)","margin-right":"-100%","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		rotate_left: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotate(-360deg)","margin-left":"-100%","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		rotateX: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotateX(-360deg)","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		rotateX_72: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotateX(-720deg)","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		rotateY: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotateY(-360deg)","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		rotateY_72: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotateY(-720deg)","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},

		zoom: function(next){
			console.log('shift');
			$('#content').css({"transition":"all 1s linear","transform":"rotate(90deg)","margin-right":"-100%","margin-top":"-50%;","opacity":"0"});
			setTimeout(function(){
				loadPage(next);
			},1000);
		},
	}
})();

var blend = (function(){
	return{
		shift: function(){
			$('#content').css({"transition":"all 1s linear","opacity":"1"});
		}
	}
})();


var page = 0;

function checkNavi(){
	$('.class').each(function(){
		$(this).attr('disabled',false);
		$(this).css({"opacity":"1"});
	});
	if(page == 0){
		$('#nav_back').attr('disabled',true);
		$('#nav_back').css({"opacity":"0.5"});
	}else{
		$('#nav_back').attr('disabled',false);
		$('#nav_back').css({"opacity":"1"});
	}
	if(page == (pages.length-1)){
		$('#nav_for').attr('disabled',true);
		$('#nav_for').css({"opacity":"0.5"});
	}else{
		$('#nav_for').attr('disabled',false);
		$('#nav_for').css({"opacity":"1"});
	}
}

function loadPage(next){
	$('#content').remove();
	$('#navi').before('<div id="content" style="opacity:0;">'+pages[next][1]+'</div>');
	page = next;
	//console.log(page);
	blend.shift();
	checkNavi();
}

function unload(next){
	//console.log('unload');
	var ani = 'animator.'+pages[page][0]+'('+next+');';
	//console.log(ani);
	eval(ani);
}

function restart(){
	page = 0;
	loadPage(page);
}

$(document).ready(function(){

	loadPage(page);

	$('#content, #nav_for').click(function(){
		unload(page+1);
	});

	$('#nav_back').click(function(){
		loadPage(page-1);
	});

	$('#nav_start').click(function(){
		restart();
	});

});