$(function(){
	var arr=[getPhone,getSIM,search,addu,removeUser]
	$(".comBtn").on("click",function(){
		var idx=$(this).index();
		arr[idx]();
	})
})

//获取手机通讯录
function getPhone(){
	var phone=plus.contacts.ADDRESSBOOK_PHONE;
	mui.plusReady(function(){
		plus.contacts.getAddressBook( phone, function(obj){
			obj.find(null,function(user){
				mui.alert("成功获取")
				append(user)
			},function(err){
				mui.alert("获取电话簿失败 "+JSON.stringify(err));
			})
		}, function(err){
				mui.alert("获取电话簿失败 "+JSON.stringify(err));
		} );
	})
}

//获取SIM卡通讯录
function getSIM(){
	var SIM=plus.contacts.ADDRESSBOOK_SIM;
	mui.plusReady(function(){
		
		plus.contacts.getAddressBook( SIM, function(obj){
			obj.find(null,function(user){
				mui.alert("成功获取")
				append(user)
			},function(err){
				mui.alert("获取电话簿失败 "+JSON.stringify(err));
			})
		}, function(err){
			mui.alert("获取电话簿失败 "+JSON.stringify(err));
		} );
	})
	
}

//查询联系人
function search(){
	var phone=plus.contacts.ADDRESSBOOK_PHONE;
	mui.plusReady(function(){
		plus.contacts.getAddressBook( phone, function(obj){
			mui.prompt("提示","请输入要查询的联系人的名称或电话","警告",["取消","确定"],function(e){
				var ifo=e.value;
//					console.log(ifo)
				if(!ifo){//这里要有，不然不输入内容，直接点确定，会导致程序崩溃退出
					mui.alert('请输入内容')
					return
				}
				if(e.index==1){
					obj.find(["displayName","phoneNumbers"],function(user){
						if(user.length>0){
							mui.alert('成功找到');
							append(user)
						}else{
							mui.alert('未找到');
						}
					},function(err){
						console.log(JSON.stringify(err))
					},{
						filter:[{logic:"or",field:"displayName",value:"*"+ifo+"*"},{logic:"or",field:"phoneNumbers",value:ifo}],
						multiple:true
					})
				}
			})
		}, function(err){
			console.log(JSON.stringify(err))
		} );
	})
}

//增加联系人
function addu(){
	var phone=plus.contacts.ADDRESSBOOK_PHONE;
	mui.plusReady(function(){
		plus.contacts.getAddressBook( phone, function(obj){
			var user = obj.create();
			mui.prompt("提示","请输入要增加的联系人的姓名",null,["取消","确定"],function(e){
//				console.log(e.value)
				user.name = {givenName:e.value};
				if(e.index){
					mui.prompt("提示","请输入要增加的联系人的电话",null,["取消","确定"],function(ev){
//						console.log(ev.value)
						user.phoneNumbers = [{type:"手机",value:ev.value}];
						if(ev.index){
							user.save(function(){
								mui.alert("增加成功")
							},function(err){
								mui.alert("增加失败"+JSON.stringify(err))
							});
							
						}
					})
				}
			})
			
			
		}, function(err){
			console.log(JSON.stringify(err))
		} );
	})
}

//删除联系人
function removeUser(){
	var phone=plus.contacts.ADDRESSBOOK_PHONE;
	mui.plusReady(function(){
		plus.contacts.getAddressBook( phone, function(obj){
			mui.prompt("提示","请输入要删除的联系人的名称或电话","警告",["取消","确定"],function(e){
				var ifo=e.value;
				if(!ifo){//这里要有，不然不输入内容，直接点确定，会导致程序崩溃退出
					mui.alert('请输入内容')
					return
				}
				if(e.index==1){
					obj.find(["displayName","phoneNumbers"],function(user){
//						console.log(JSON.stringify(user))
						if(user.length<1){
							mui.alert("未找到"+ifo);
							return
						}
						var uobj=user[0];
						mui.confirm("是否删除"+uobj.displayName,"警告",["否","是"],function(e){
							if(e.index){
								uobj.remove(function(){
									mui.alert('删除'+uobj.displayName+'成功');
								},function(err){
									mui.alert("删除失败"+JSON.stringify(err))
								})
							}
						})
					},function(err){
						console.log(JSON.stringify(err))
					},{
						filter:[{logic:"or",field:"displayName",value:ifo},{logic:"or",field:"phoneNumbers",value:ifo}],
						multiple:true
					})
				}
			})
		}, function(err){
			console.log(JSON.stringify(err))
		} );
	})
}

//显示联系人的模板
function append(data){
	var len=data.length;
	var name=[];
	var tel=[];
	$("#unum").text(len);
	for(var i=0;i<len;i++){
		name
		$(".user>ul").append('<li class="mui-table-view-cell">'
			 +'<a class="">'
			    +'<p>姓名：'+data[i].displayName+'</p>'
			    +'<p>电话：'+data[i].phoneNumbers[0].value+'</p>'
			+'</a>'
		+'</li>')
	}
	
}
