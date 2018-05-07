$(function(){
	var arr=[getGeo,watchGeo,stopWatch]
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})


function getGeo(){
	plus.geolocation.getCurrentPosition(function(pos){
		total(pos)
	}, function(err){
		mui.alert(JSON.stringify(err))
	}, {
		timeout:10000,
//		enableHighAccuracy:true
//		maximumAge:100
	})
}

var num=null;
function watchGeo(pos){
		mui.alert("已开始监听")
	num=plus.geolocation.watchPosition(function(pos){
		total(pos)
	}, function(err){
		mui.alert(JSON.stringify(err))
	}, {
		timeout:8000,
//		enableHighAccuracy:true
		maximumAge:1000
	})
	
}

function stopWatch(){
	mui.alert("已停止监听")
	plus.geolocation.clearWatch(num);
	num = null;
}



function total(pos){
	var posObj=pos.coords;
	$(".jingd>span").text(posObj.latitude)
	$(".weid>span").text(posObj.longitude)
	$(".haib>span").text(posObj.altitude)
	$(".zb-accur>span").text(posObj.accuracy)
	$(".hb-accur>span").text(posObj.altitudeAccuracy)
	$(".move-dir>span").text(posObj.heading)
	$(".move-spd>span").text(posObj.speed)
	
	var _type='';
	switch (pos.coordsType){
		case "gps":
			_type='gps,表示WGS-84坐标系'
			break;
		case "gcj02":
			_type='gcj02,表示国测局经纬度坐标系'
			break;
		case "bd09":
			_type='bd09,表示百度墨卡托坐标系'
			break;
		case "bd09ll":
			_type='bd09ll,表示百度经纬度坐标系'
			break;
		default:
			break;
	}
	$(".cor-type>span").text(_type);
	var _addr=pos.address;
	var detail=_addr.country+"-"+_addr.province+"-"+_addr.city+"-"+_addr.district+"-"+_addr.street+"-"+_addr.streetNum+"-"+_addr.poiName+"-"+_addr.postalCode+"-"+_addr.cityCode;
	$(".addr-jl>span").text(pos.addresses);
	$(".addr-xx>span").text(detail);
	var _time=pos.timestamp
	var tObj=new Date(_time);
	var ntime=tObj.getFullYear()+"-"+(tObj.getMonth()+1)+"-"+tObj.getDate()+" "+buzero(tObj.getHours())+":"+buzero(tObj.getMinutes())+":"+buzero(tObj.getSeconds());
	$(".cor-time>span").text(ntime);
	
	console.log(ntime)
	$(".addr-mail>span").text(_addr.postalCode);
}



//补0
function buzero(num){
	if(num<10){
		return "0"+num
	}else{
		return num
	}
}

