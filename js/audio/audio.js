$(function(){
	var arr=[startRecode,stopRecode,getMusic]
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})

var obj=null;//录音对象
var recodeNum=0;//录音的秒速
var time1;//录音的定时器名
var recodeAddr;//录音存放的位置
function startRecode(){
	obj=plus.audio.getRecorder();
	if(!obj){
		mui.alert("录音对象获取失败");
		return;
	}
	obj.record({filename:'_doc/audio/'},function(p){
		console.log(p)
		plus.io.resolveLocalFileSystemURL(p,function(entry){
			recodeAddr=entry.toRemoteURL()

			console.log(recodeAddr)
			
			$(".box").append('<audio src="'+recodeAddr+'" autoplay controls "></audio>')
			mui.alert("录音成功")
		},function(erro){
			mui.alert("录音失败"+JSON.stringify(erro));
		})
	},function(err){
		mui.alert("录音失败"+JSON.stringify(err));
	})
	$(".box").append('<div class="reNum">正在录音：<span>0</span>秒</div>');
    time1=setInterval(function(){
    	recodeNum++;
    	$(".reNum>span").text(recodeNum);
    },1000)
}

//播放音乐

var playObj=null;//播放音乐对象
var time2;//播放音乐定时器
var num;//音频总长度，单位是s
var pos;//当前播放位置，单位是s
function getMusic(recodeAddr){
	console.log(recodeAddr)

	playObj=plus.audio.createPlayer(recodeAddr);
	playObj.play(function(){
		mui.alert("正在播放");
	},function(err){
		mui.alert("播放失败"+JSON.stringify(err));
	})
	setTimeout(function(){
		num=playObj.getDuration();
		pos=playObj.getPosition();
				console.log(num+" "+pos)
	},100)
	
		console.log(num+" "+pos)
	
//	time2=setInterval(function(){
//		if(!num){
//			num=playObj.getDuration();
//		}
//
//
//	},1000)
}

//

function stopRecode(){
	obj.stop();
	clearInterval(time1)
}



//function startPlay(path){
//	mui.plusReady(function(){
//		playObj=plus.audio.AudioPlayer(path);
//		playObj.play(function(){
//			mui.alert("正在播放");
//		},function(err){
//			mui.alert("播放失败"+JSON.stringify(err));
//		})
//		var num=playObj.getDuration();
//		var pos=playObj.getPosition();
//		console.log(num+" "+pos)
//	})
//}
