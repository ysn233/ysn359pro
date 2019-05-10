$(document).ready(function(){
	$("#top").load("top.html");
	$("#bottom").load("bottom.html");
})
$(".allfenlei_li").mouseenter(function(){
	$(".fenleiinfo").show();
}).mouseleave(function(){
	$(".fenleiinfo").hide();
})
$(".reg_sub").click(function(){
	let cookieJson = getCookie( "userinfo" );
	if( cookieJson ){ //如果有cookie  可以登录
		//取出用户输入的用户名和密码
		let uname = $(".log_inp").eq(0).val();
		let upwd = $(".log_inp").eq(1).val();
//		if($(":checked").prop("checked")){
			//
//		}
		if( uname == cookieJson.uname && upwd == cookieJson.upwd ){
			location.href = "index.html";
		}else if( uname == cookieJson.utel && upwd == cookieJson.upwd ){
			location.href = "index.html";
		}else if( uname == cookieJson.uqq && upwd == cookieJson.upwd ){
			location.href = "index.html";
		}else if( uname == cookieJson.uemail && upwd == cookieJson.upwd ){
			location.href = "index.html";
		}else{
			alert("用户名或密码错误");
		}
	}
})
$("#reg").click(function(){
	location.href = "register.html";
})
