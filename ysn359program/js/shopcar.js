$(document).ready(function(){
	$("#top").load("top.html");
	$("#bottom").load("bottom.html");
})
$(".allfenlei_li").mouseenter(function(){
	$(".fenleiinfo").show();
}).mouseleave(function(){
	$(".fenleiinfo").hide();
})
let prolist = JSON.parse(localStorage.getItem("proinfo"));
let str = "";
let allmoney = "";
let pid = "";
if( prolist ){
	for( let i = 0 ; i < prolist.length ; i++ ){  
		str += `<div data-id=${prolist[i].id} data-name=${prolist[i].name} class="shopcar_proinfo_detail ">
					<div class="shopcar_proinfo_img">
						<img src="img/${prolist[i].src}"/>
					</div>
					<div class="shopcar_proinfo_name">
						<p>${prolist[i].name}</p>
					</div>
					<div class="shopcar_proinfo_price">
						<span>${prolist[i].price}</span>
					</div>
					<div class="shopcar_proinfo_del">
						<a href="javascript:">移除</a>
					</div>
				</div>`;
	}
	$("#shopcar_proinfo_title").after(str);
	allmoney = $(".shopcar_proinfo_price span").html();
//	console.log(allmoney);
	$(".shopcar_proinfo_del a").click(function(){
	let proid = $(this).parent().parent().data("id");
	let proname = $(this).parent().parent().data("name");
		prolist.forEach((pro,index)=>{
			if( proid == pro.id && proname == pro.name ){
				prolist.splice(index,1);
				$(this).parent().parent().remove();
			}
			localStorage.setItem("proinfo",JSON.stringify(prolist))
		})
	})
}
