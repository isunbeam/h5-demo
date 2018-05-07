$(function(){
	var arr=[ActionSheet,Alert,Confirm,Prompt,Toast,CloseToast,ShowWaiting,CloseWaiting,PickDate,PickTime,PreviewImage]
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})


function ActionSheet(){
	var _title="这是标题";
	var _cancel='取消';
	var _button=[{
		color:"red",
		title:"红色",
		style:"destructive"
	},{
		color:"blue",
		title:"蓝色",
	},{
		color:"green",
		title:"绿色",
	}]
	plus.nativeUI.actionSheet({
		title:_title,
		cancel:_cancel,
		buttons:_button
	},function(e){
		var num=e.index-1;
		if(num<0){
			mui.alert("你点击了："+_cancel)
		}else{
			mui.alert("你点击了："+_button[e.index-1].title)
		}
	})
}

function Alert(){
	var mes="这是提示的内容";
	var _title="这是提示的标题";
	var butTxt="按钮内容";
	plus.nativeUI.alert(mes,function(e){
		mui.alert(e.index)
	},"",butTxt)
	//_title可以不要，但是要把它位置留着，置为空即"" 这样就行，否则butTxt会成为title，而按钮内容则会是默认的“确定”
	//Android平台上通过返回按钮关闭时索引值为-1。
}

function Confirm(){
	//按钮最多能设置3个，在页面上显示排列的顺序是 b c a，a对应索引值0，表取消，b为索引值1,c为索引值2
	var butn=["a取消","b按钮1","c按钮2"];
	var mes="这是内容";
	var options={
//		title:"这是标题",
		buttons:butn,
		verticalAlign:"center"
	}
	plus.nativeUI.confirm(mes,function(e){
		mui.alert(e.index)
	},options)
}

function Prompt(){
	var mes="这是内容";
	var titile="这是标题";
	var plac="这是palceholder";
	//按钮最多能设置3个，在页面上显示排列的顺序是 b c a， a对应索引值0，b为索引值1,c为索引值2
	var butn=["a0","b1","c2"];
	plus.nativeUI.prompt(mes,function(e){
		mui.alert(e.index+":"+e.value)
	},titile,plac,butn)
}

function Toast(){
	var mes='这是提示信息';
	var _html=" 在font外面的字不会显示<font color='rgba(28,162,97,.6)'>这里是</font>"
				+"<a style='font-size:20px;color:#FFCD41;'  href='index.html' onclick=\"console.log(222)\">百度</a>"
//				+"<img width='80px' height='80px' src='img/quan.png' onclick=\"console.log(111)\"></img>"
				+"<font color='#DE5347'>的链接，点击没用，不跳转</font>";
//	plus.nativeUI.toast(mes,{
//		align:"center",
//		duration:"long",
//		icon:'img/arrow.png', 
//		style:"block",
//		type:'text',
//		verticalAlign:"center"
//	})
	plus.nativeUI.toast(_html,{
		align:"center",
		duration:"long",
		icon:'img/arrow.png',
		style:"block",
		type:'richtext',
		richTextStyle:{
			align:"center",
			family:"Times New Roman",
//			fontSrc:"",
//			onClick:function(e){
//				console.log(e)
//			}
		},
		verticalAlign:"center"
	})
}

function CloseToast(){
	plus.nativeUI.closeToast()
}

function ShowWaiting(){
	var _title="这是内容";
	plus.nativeUI.showWaiting(_title,{
//		width:'',
//		height:'',
		color:'skyblue',
		size:'20px',
		textalign:'center',
		padding:'30px',
		background:'rgba(0,0,0,.4)',
//		style:'',
		modal:false,
		round:'20px',
		padlock:true,
		back:'close',
		loading:{
			display:'inline',
			height:'100px',
//			icon:'',
//			interval:''
		}
	})
}

function CloseWaiting(){
	plus.nativeUI.closeWaiting();
}

function PickDate(){
	var nObj=new Date('2017/10/1');
//	var dd=nObj.setFullYear();
	plus.nativeUI.pickDate(function(e){
		var dObj=e.date;
		
		mui.alert(dObj.getFullYear()+"-"+(dObj.getMonth()+1)+"-"+dObj.getDate())
	},function(err){
		mui.alert(JSON.stringify(err))
	},{
//		title:'',
		date:nObj,
//		minDate:dd,
//		maxDate:'',
		popover:{
			top:0,
			left:0
		}
	})
}

function PickTime(){
	plus.nativeUI.pickTime( function(e){
		var d=e.date;
		mui.alert( "选择的时间："+buzero(d.getHours())+":"+buzero(d.getMinutes()) );
	},function(e){
		console.log( "未选择时间："+e.message );
	},{
//		is24Hour:false
	});
}

function PreviewImage(){
	plus.nativeUI.previewImage([
		"_www/logo.png",
		"http://img-cdn-qiniu.dcloud.net.cn/icon1.png",
		"http://img-cdn-qiniu.dcloud.net.cn/icon2.png",
		"http://img-cdn-qiniu.dcloud.net.cn/icon3.png"
	],{
//		background:'',
//		current:"1",
		indicator:'number',
		loop:true
	})
}

//补0
function buzero(num){
	if(num<10){
		return "0"+num
	}else{
		return num
	}
}
