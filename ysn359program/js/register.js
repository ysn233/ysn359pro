$(document).ready(function(){
	$("#top").load("top.html");
	$("#bottom").load("bottom.html");
})
$(".allfenlei_li").mouseenter(function(){
	$(".fenleiinfo").show();
}).mouseleave(function(){
	$(".fenleiinfo").hide();
})
$form = $(".reg_inp");
$form.eq(0).blur(function(){
	let regphone = /^1[3578]\d{9}$/;
	let str = $(this).val();
	if( regphone.test(str) ){
		$(this).next().hide();
	}else{
		$(this).next().show();
	}
})

$form.eq(2).blur(function(){
	if( $(this).val() != $form.eq(1).val() ){
		$(this).next().show();
	}else{
		$(this).next().hide();
	}
})
$form.eq(4).blur(function(){
	let regqq = /^\d{5,}$/;
	let str = $(this).val();
	if( regqq.test(str) ){
		$(this).next().hide();
	}else{
		$(this).next().show();
	}
})
$form.eq(5).blur(function(){
	let regemail = /^\w+@\w+(\.\w+)+$/;
	let str = $(this).val();
	if( regemail.test(str) ){
		$(this).next().hide();
	}else{
		$(this).next().show();
	}
})
$(".reg_sub").click(function(){
	if($(":checked").prop("checked")){
		let utel = $form.eq(0).val();
 		let upwd = $form.eq(1).val();
 		let uname = $form.eq(3).val();
 		let uqq = $form.eq(4).val();
 		let uemail = $form.eq(5).val();
		let userInfoJson = {
 				"utel" :　utel , 
 				"upwd" : upwd,
 				"uname" : uname,
 				"uqq" : uqq,
 				"uemail" : uemail
 			}
		setCookie( "userinfo" , JSON.stringify( userInfoJson ) );
		location.href = "login.html";
	}else{
		$(this).parent().prev().find("span").show();
	}
})
