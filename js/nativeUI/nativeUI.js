$(function(){
	var arr=[ActionSheet]
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
	console.log(_button)
	plus.nativeUI.actionSheet({
		title:_title,
		cancel:_cancel,
		button:_button
	},function(e){
		console.log(_button[e.index.title])
	})
}

function Alert(){
	
}

function Confirm(){
	
}

function Prompt(){
	
}

function Toast(){
	
}

function CloseToast(){
	
}

function ShowWaiting(){
	
}

function CloseWaiting(){
	
}

function PickDate(){
	
}

function PickTime(){
	
}

function PreviewImage(){
	
}
