$(document).ready(function(){
	$("#top").load("top.html");
	$("#bottom").load("bottom.html");
})

//限时抢购
$("#special_pro li").mouseenter(function(){
	$(this).find("img").css("opacity","0.6");
}).mouseleave(function(){
	$(this).find("img").css("opacity","1");
})


$(window).load(function(){
	let timer = null,
		index = 0,
		$olist = $("#nav_pic_nav ol li"),
		$allListIcon = $(".allfenlei_li div"),
		$allListBg = $(".allfenlei_li a"),
		$ulist = $("#nav_pic_img ul li"),
		$hotpro = $("#hotpro_right ul"),
		$zixunli = $("#zixun_ul ul li");
		//顶部导航二级菜单
		$("#top ").on({"mouseenter":function(){
			$(this).css("background","#FFFFFF");
			$("#myliang_son").show();
			},
			"mouseleave":function(){
				$(this).css("background","url(img/nav_bg.gif) no-repeat 76px 17px");
				$("#myliang_son").hide();
			}
		},"#myliang")
	let deffered = $.ajax({
		type:"get",
		url:"data.json?new Date().getTime()",
		async:true
	});
	deffered.done(function(json){
		let prolist = [];
		let str = "";
		for( let attr in json ){
			prolist = json[attr].list;
		}
		for( let i = 0 ; i < prolist.length ; i++ ){
			str += `<li>
						<a href="page.html?id=${prolist[i].id}">
						<img src="img/${prolist[i].src}" alt="" />
						<h3>${prolist[i].name}</h3>
						<span>抢购价￥${prolist[i].price}</span>
						</a>
					</li>`;
		}
		$hotpro.html(str);			
	})
	//轮播图
	timer=setInterval(autoPlay,1000);
	function autoPlay(){
		index++;
		if( index == 3 ){
			index = 0 ;
		}
		$olist.eq(index).addClass("active").siblings().removeClass("active");
		$ulist.eq(index).css({"z-index":1}).siblings().css({"z-index":0});
	}
	$olist.mouseenter(function(){
		clearTimeout(timer);
		index = $(this).index() - 1;
		autoPlay();
	})
	$olist.mouseout(function(){
		timer=setInterval(autoPlay,1000);
	})
	//在线咨询
	$zixunli.each(function(index){
		$(this).css("background",`url(img/icon.png) no-repeat -40px 23px`);
	})
	$allListIcon.each(function(index){
		$(this).css("background",`url(img/nav_icon.gif) no-repeat 0 -${index*40}px`);
	})
	
	//商品分类
	$(".allfenlei_li li").mouseenter(function(){
		$(".fenleiinfo").show();
	})
	$(".allfenlei_li li").mouseleave(function(){
		$(".fenleiinfo").hide();
	})
	//商品分类导航样式
	$(".allfenlei_li li").mouseenter(function(){
		$(this).find("a").css({"background":"#FFFFFF","color":"#299aef"})
				.prev().animate({left:10},300);
	})
	$(".allfenlei_li li").mouseout(function(){
		$(this).find("a").css({"background":"#299aef","color":"#FFFFFF"})
		.prev().animate({left:0},300);
	})
	
	//购物车跳转
	$("#bottom").on("click","#foot_shopcar",function(){
		location.href = "shopcar.html";
	})
	$("#top").on("click","#shopcar",function(){
		location.href = "shopcar.html";
	})
	//底部悬浮样式
	$("#bottom").on("mouseenter","#foot_shopcar",function(){
		$(this).css("background","#FF0000")
	})
	$("#bottom").on({
		"mouseenter":function(){
			$(this).css("background","#FF0000");
			$(this).find("div").show();
		},
		"mouseleave":function(){
			$(this).css("background","url(img/callme_bg.png) no-repeat 0 -51px");
			$(this).find("div").hide();
		}
	},"#foot_shopcar")
	$("#bottom").on({
		"mouseenter":function(){
			$(this).css("background","#FF0000");
			$(this).find("div").show();
		},
		"mouseleave":function(){
			$(this).css("background","url(img/callme_bg.png) no-repeat 0 -51px");
			$(this).find("div").hide();
		}
	},"#foot_fk")
	$("#bottom").on({
		"mouseenter":function(){
			$(this).css("background","#FF0000");
			$(this).find("div").show();
		},
		"mouseleave":function(){
			$(this).css("background","url(img/callme_bg.png) no-repeat 0 -51px");
			$(this).find("div").hide();
		}
	},"#foot_top")
	$("#bottom").on("click","#foot_top",function(){
		$("body,html").animate({scrollTop:0},300);
	})
})