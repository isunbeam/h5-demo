$(function(){
	var arr=[get_one,get_many,get_three,get_select];
	
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})

function get_one(){
	plus.gallery.pick(function(path){
		 $(".box").append('<img src="'+path+'" />');
	},function(e){
		console.log("取消选择图片")
	},{
		filter:'image',
		system:false
	})
}

function get_many(){
	plus.gallery.pick(function(e){
		//e.files[i]就是选择的图片路径
		for(var i in e.files){
            $(".box").append('<img src="'+e.files[i]+'" />');
        }
	},function(e){
		console.log("取消选择图片")
	},{
		filter:'image',
		multiple : true,
//			system:false,
	})
}

function get_three(){
	plus.gallery.pick(function(e){
		//e.files[i]就是选择的图片路径
		for(var i in e.files){
            $(".box").append('<img src="'+e.files[i]+'" />');
        }
	},function(e){
		console.log("取消选择图片")
	},{
		filter:'image',
		multiple : true,
		system:false,
		maximum:3,
		onmaxed:function(e){
			plus.nativeUI.alert('最多只能选择3张图片');
		}
	})
}


var addr=null;//这是selected的路径。
function get_select(){
	plus.gallery.pick(function(e){
    	addr=e.files;
    	for(var i in e.files){
	    	$(".box").append('<img src="'+e.files[i]+'" />');
    	}
    }, function(e){
    	console.log("取消选择图片")
    },{
    	filter:'image',
    	multiple:true,
    	maximum:3,
    	selected:addr,
    	system:false,
    	onmaxed:function(){
			plus.nativeUI.alert('最多只能选择3张图片');
    	}
    });
}

    
