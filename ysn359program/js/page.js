$(document).ready(function(){
	$("#top").load("top.html");
	$("#bottom").load("bottom.html");
})
$(".allfenlei_li").mouseenter(function(){
	$(".fenleiinfo").show();
}).mouseleave(function(){
	$(".fenleiinfo").hide();
})
$smallpic = $("#proinfo_left_pic_small li");//放大镜底部小图
$mirror = $("#proinfo_left_pic_mirror");//放大镜显示区
$mirrorImg = $mirror.find("img");//放大镜图片
$bigpic = $("#proinfo_left_pic_big");//大图显示区
$bigpicImg = $bigpic.find("img");//大图片
$mask = $("#mask");//放大镜mask
$option = $("#pro_bottom_careful_option li");//商品详情选项卡
$prochange = $("#pro_info_change").children();//商品详情选项显示区
$buy = $(".buy");//立即购买
$addcar = $(".addcar");//加购
let href = location.href;
let proid = href.split("?")[1].split("=")[1];
let proname = "";
let prosrc = "";
let proprice = "";
let deffered = $.ajax({
	type:"get",
	url:"data.json?new Date().getTime()",
	async:true
});
deffered.done(function(json){
	for( let attr in json ){
		let prolist = json[attr].list;
		for( let i = 0 ; i < prolist.length ; i++ ){
			if( prolist[i].id == proid ){
				proname += `<h4>${prolist[i].name}</h4>`;
				proprice += `<span>￥${prolist[i].price}</span>`;
				proname = prolist[i].name;
				proprice = "￥"+prolist[i].price;
				prosrc = prolist[i].src;
//				prolist[i].count++;
			}
		}
	}
	$("#path span:last-child").append(proname);
	$("#pro_main_info_price li:first-child h4").append(proprice);
	$("#pro_main_info:first()").before(proname);
})

//加购点击
$addcar.click(function(){
	if( confirm("确认加入购物车") ){
		let	arr = [];//存多个商品
		let json = {
			"id" : proid,
			"src" : prosrc,
			"name" : proname,
			"price" : proprice
	//		"count" : 1
		};//存一个商品信息
		//先取出storage中的数据  判断是否有数据
		let storageTxt = localStorage.getItem("proinfo");
		if( storageTxt != null ){
			arr = JSON.parse( storageTxt );//转成数组 先存入到arr数组中
			//判断当前加入的商品在购物车中是否存在  使用商品编号做比较
			
	//		arr.forEach( (pro) => {
	//			if( json.id==pro.id && json.name==pro.name ){
	//				//说明json商品存在购物车中的  将该商品的数量加1
	//				pro.count++;
	//				flag = false;
	//				return;
	//			}
	//		} )
		}
		//将数组存入到localStorage中
		arr.push(json);
		localStorage.setItem("proinfo",JSON.stringify(arr));
	}else{
		location.href = "javascript:";
	}
	
//	if( flag ){
//		//将对象存入到数组中
//		arr.push( json );
//	}
	
})


//放大镜效果
$smallpic.each(function(index){
	$(this).mouseenter(function(){
		$(this).addClass("active").siblings().removeClass("active");
		let index = $(this).index();
		$bigpicImg.eq(index).show().siblings().hide();
		$mirrorImg.eq(index).show().siblings().hide();
	})
})
$bigpic.mouseenter(function(){
	$mask.show();
	$mirror.show();
	$bigpic.mousemove(function(evt){
		let e = evt || event ;
		let x = e.pageX - $bigpic.offset().left - $mask.width()/2;
		let y = e.pageY - $bigpic.offset().top - $mask.height()/2;
		let maxL = $bigpic.width() - $mask.width();
		let maxT = $bigpic.height() - $mask.height();
		x = Math.min( Math.max( 0 , x ) , maxL );
		y = Math.min( Math.max( 0 , y ) , maxT );
		$mask.css({left:x,top:y});
		$mirrorImg.css({
			left : - x * $mirror.width() / $mask.width(),
			top : - y * $mirror.height() / $mask.height()
		})
	}.bind(this))
}.bind(this))
$bigpic.mouseleave(function(){
	$mask.hide();
	$mirror.hide();
}.bind(this))


//商品详情选项卡
$option.click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	let index = $(this).index();
	$prochange.eq(index).show().siblings().hide();
})


//切换选择商品
$(".pro_main_info_buy_spe_info li").click(function(){
	$(this).find("span").addClass("active")
			.end().siblings().find("span").removeClass("active");
})

