$(function(){
	var arr=[startRecode,stopRecode,playRecode,getMusic]
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})

var obj=null;//录音对象
var recodeNum=0;//录音的秒速
var time1;//录音的定时器名
var recodeAddr=null;//录音存放的位置
function startRecode(){
	obj=plus.audio.getRecorder();
	if(!obj){
		mui.alert("录音对象获取失败");
		return;
	}
	obj.record({
		filename:'_doc/audio/'
	},function(p){
		console.log(p)
		plus.io.resolveLocalFileSystemURL(p,function(entry){
			recodeAddr=entry.toRemoteURL()

			console.log(recodeAddr)
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



//播放刚才的录音
var playObj=null;//播放音乐对象
var time2=null;//播放录音定时器
var num=0;;//音频总长度，单位是s
var pos=0;;//当前播放位置，单位是s
function playRecode(){
	if(recodeAddr===null){
		mui.alert("暂时没有录音")
		return
	}
	playObj=plus.audio.createPlayer(recodeAddr);
	playObj.play(function(){
		mui.alert("播放完成");
	},function(err){
		mui.alert("播放失败"+JSON.stringify(err));
	})

	$(".box").append('<div class="playNum">正在播放：<span>'+num+'</span>秒</div>');
	var all=0;
	time2=setInterval(function(){
		num=playObj.getDuration();//总秒数
		pos=playObj.getPosition();//到达的位置
		console.log(num+" "+pos)
		
		$(".box>.playNum>span").text(Math.round(pos))

		if(pos===null){
			$(".box>.playNum").text(all+"秒播放完毕")
			clearInterval(time2);
			playObj.stop()
		}
		all=Math.round(pos);
	},1000)
}

//播放音乐
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
