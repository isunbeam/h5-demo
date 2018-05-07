$(function(){
	var arr=[getImage,getVideo];
	
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})


function getImage(){
	var cameraObj = plus.camera.getCamera();
	cameraObj.captureImage(function(path){
		CompressImage(path)
	}, function(e){
		console.log('取消拍照');
	}, {
		filename:'_doc/pic/',
		index:1
	});
}

function getVideo(){
	var cameraObj = plus.camera.getCamera();
	cameraObj.startVideoCapture(function(p){
		console.log(p)
		plus.gallery.save(p, function(e){
			console.log(JSON.stringify(e))
			mui.alert('保存成功'+e.file);
			plus.io.resolveLocalFileSystemURL(e.file,function(entry){
				var _url=entry.toRemoteURL();//把路径转换为http://localhost:13131/...这样的网络路径
				_url=_url.replace('file://','');//_url包含了fill://的，所以要先把它处理掉
				console.log(_url)
				$(".box").append('<video id="video" style="width:100%;" autoplay controls src="'+_url+'"></video>');
			},function(err){
				
			})
		}, function(e){
			mui.alert('保存失败: '+JSON.stringify(e));
		});
		
	}, function(e){
		mui.alert('调用失败：'+JSON.stringify(e));
		
	}, {
		filename:'_doc/video/',
		index:1
	});
}

//压缩图片
function CompressImage(path){
	plus.zip.compressImage( {
		src:path,
		dst:path,
		overwrite:true,
		quality:60,
		rotate:90
	}, function(event){
		var _src=event.target;
		mui.confirm("是否保存该图片","温馨提示",["否","是"],function(e){
			console.log(_src)
			$(".box").append('<img src="'+_src+'">');
			if(e.index){
				plus.gallery.save(_src, function(evt){
					mui.alert('保存成功'+evt.file);
					
				}, function(err){
					mui.alert('保存失败: '+JSON.stringify(err));
					
				});
			}
		})
		console.log(event.size)//压缩之后图片的大小
	}, function(err){
		
	});
}
