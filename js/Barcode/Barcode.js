$(function(){
	var arr=[sao,pick];
	$(".comBtn").on("tap",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})

var barcodeObj=null;
function sao(){
	$("#cid").show();
	
	mui.plusReady(function(){
		//	var filter=null;//要识别的条码类型过滤器
		var _style={
			frameColor:"rgb(0,191,255)",
			scanbarColor:"rgb(0,191,255)"
		}
		barcodeObj=new plus.barcode.Barcode("cid",_style);

		barcodeObj.start({
			conserve:"true",//是否保存成功扫描到的条码数据时的截图，通过onmarked回调函数的file参数返回保存文件的路径,默认为false不保存
			filename:"_doc/barcode/",//上一个参数设置为true之后才起作用。设置保存截图的路径或名称。如果要修改保存图片的名称则必须指定文件的后缀名（必须是.png），否则认为是保存到指定的目录，图片名称则自动生成
			vibrate:"true",//成功扫描到条码数据时是否需要震动提醒,默认不开启
			sound:"true",//成功扫描到条码数据时播放的提示音类型，默认不开启
		});
		barcodeObj.onmarked=onmarked; 
		barcodeObj.onerror =onerror ;
	})
}

function onmarked( type, result, file ) {
	//条码识别成功事件,type:识别到的条码类型,result:识别到的条码数据,file:识别到的条码图片文件路径是png格式的图片
	
	//保存扫描到数据时的截图到本地
	mui.confirm("是否保存扫描时的图片","温馨提示",["否","是"],function(e){
		if(e.index){
			plus.gallery.save( file, function (e) {
				console.log(JSON.stringify(e));//e只有一个属性file,是图片保存的路径
				mui.alert('保存图片到相册成功');

			});
		}

	})
	
	//文件io操作
	plus.io.resolveLocalFileSystemURL( file, function(entry){
		//转换成网络路径以“http://localhost:13131/”开头的网络路径。
		var _src=entry.toRemoteURL();
		$(".img>img").attr("src",_src);
		
	}, function(err){
		console.log("错误："+JSON.stringify(err))
	})
//	plus.runtime.openURL(result); //url跳转，即调用第三方程序打开指定的URL。详情查看5+的runtime
	

	$("#cid").hide();
	barcodeObj.close();//关闭扫描控件
	$(".box").text("扫描的内容为："+result)
}

function onerror(e){
	$("#cid").hide();
	$(".box").text("扫描控件调用失败："+JSON.stringify(e))
}


//选择图片扫描
function pick() {
	plus.gallery.pick(function(path) {
		plus.barcode.scan(path, onmarked, function(error) {
			$(".box").text("无法识别此图片："+JSON.stringify(error))
		});
	}, function(err) {
//		plus.nativeUI.alert('Failed: ' + err.message);
	});
}

