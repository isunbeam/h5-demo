function openPage(aurl,ifo){
	mui.openWindow({
		url:aurl, 
		id:aurl,  
		styles:{ 
			top:'0px',
			bottom:'0px',
		}, 
		extras:ifo,			//自定义扩展参数，可以用来处理页面间传值 
		//控制打开页面的类型
		show:{ 
			autoShow:true,//页面loaded事件发生后自动显示，默认为true
			aniShow:'slide-in-right',//页面显示动画，默认为”slide-in-right“；  页面出现的方式 左右上下
			duration:'500'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒； 
		},
		// 控制 弹出转圈框的信息
		waiting:{ 
			autoShow:true,//自动显示等待框，默认为true 
			title:'加载中...',
			options:{ 
				padding:"15px", //等待框的样式
			} 
		}
	})
}
