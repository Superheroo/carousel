var carousel_box=document.querySelector(".carousel_box"),
carousel = document.querySelector("ul"),
	left_arrow = document.querySelector(".left_arrow"),
	right_arrow = document.querySelector(".right_arrow"),
	carousel_details = document.querySelectorAll("ul li"),
	controls = document.querySelectorAll("ol li"),
	now_index = 0,
	last_index = 0,
	is_run = false,
	timer;

//右箭头点击事件
right_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		++now_index >= 5 ? now_index = 0 : "";
		run(now_index);
	}
})

//左箭头点击事件
left_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		--now_index < 0 ? now_index = 4 : "";
		run(now_index);
	}
})

//圆点控制之事件代理
//document.querySelector("ol").addEventListener("mouseover", function(e) {
//	for(var i = 0; i < controls.length; i++) {
//		e.target == controls[i] ? run(i) : "";
//	}
//})

//圆点控制之自定义属性
//for(var i = 0; i < controls.length; i++) {
//	controls[i].setAttribute("data-index", i);
//	controls[i].addEventListener("mouseover", function() {
//		run(this.getAttribute("data-index"));
//	})
//}

//圆点控制之index
//for(var i = 0; i < controls.length; i++) {
//	controls[i].index = i;
//	controls[i].addEventListener("mouseover", function() {
//		run(this.index);
//	})
//}

//圆点控制之闭包
for(var i = 0; i < controls.length; i++) {
	(function(j) {
		controls[j].addEventListener("mouseover", function() {
			if(last_index!=j){
				now_index=j;
			run(j);
			}
			
		})
	})(i)
}



function auto_play(){
	timer=setInterval(function(){
		is_run = true;
		++now_index >= 5 ? now_index = 0 : "";
		run(now_index);
		},2000)
}
auto_play();

carousel_box.addEventListener("mouseover",function(){
	clearInterval(timer);
})
carousel_box.addEventListener("mouseout",function(){
	auto_play();
})

//轮播图运行主函数
function run(target_index) {
	carousel.style.transform = "translateX(-" + target_index * 100 + "%)";
	controls[last_index].classList.remove("active");
	last_index = target_index;
	controls[target_index].classList.add("active");
	carousel.addEventListener("transitionend", function() {
		is_run = false;
	})
}