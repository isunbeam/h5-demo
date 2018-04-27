$(function(){
	var arr=[getNow,watch,stopWatch]
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})


function getNow(){
	plus.orientation.getCurrentOrientation(function(obj){
		data(obj)
	},function(err){
		console.log("方向获取失败："+JSON.stringify(err))
	})
}


var wid;//监听方向的id
function watch(){
	wid=plus.orientation.watchOrientation(function(obj){
		data(obj)
	},function(err){
		console.log("方向获取失败："+JSON.stringify(err))
	},{frequency:100})
}

function stopWatch(){
	plus.orientation.clearWatch( wid )
}


function data(obj){
	var x=obj.beta;
	var y=obj.gamma;
	var z=obj.alpha;
	var mis=obj.headingAccuracy;
	var magicNorth=obj.magneticHeading;
	var realNorth=obj.trueHeading;
	
	$(".x-axis>span,.z").text(x)
	$(".y-axis>span,.h").text(y)
	$(".z-axis>span").text(z)
	$(".mis>span").text(mis)
	$(".mag>span").text(magicNorth)
	$(".real>span").text(realNorth)
	
	var rnum=magicNorth.toFixed(1);
	var t=getDir(rnum);
	$(".dir").text(t)
	$(".dir-num").text(rnum);
	$(".znz").css("transform","rotateZ("+(-rnum)+"deg)")
	
	$(".quan").css({
		'left':-y,
		'top':-x
	})
}


function getDir(r){
	var txt = "";
	if (r >= 338 || r < 23) {
		txt = "北";
	} else if (r < 68) {
		txt = "东北";
	} else if (r < 113) {
		txt = "东";
	} else if (r < 158) {
		txt = "东南";
	} else if (r < 203) {
		txt = "南";
	} else if (r < 248) {
		txt = "西南";
	} else if (r < 293) {
		txt = "西";
	} else {
		txt = "西北";
	}
	return txt
}
