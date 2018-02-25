var carousel = document.querySelector("ul"),
	left_arrow = document.querySelector(".left_arrow"),
	right_arrow = document.querySelector(".right_arrow"),
	controls = document.querySelectorAll("ol li"),
	now_index = 0,
	last_index = 0, //上一个下标
	is_run = false;//解决鼠标连续点击左右按钮时图片来回移动
//	var timer;

//左按钮
left_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		if(--now_index <= 0) {
			now_index = 4;
		}
		run(now_index);
	}
})

//右按钮
right_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		if(++now_index >= 5) {
			now_index = 0;

		}
		run(now_index);
	}

});

//圆点控制之index
//for(var i=0;i<controls.length;i++){
//	controls[i].index=i;
//	controls[i].addEventListener("mouseover",function(){
//		run(this.index);
//	})
//}

//控制圆点自定义属性方法

//for(var i=0;i<controls.length;i++){
//	controls[i].setAttribute("data-index",i);
//	controls[i].addEventListener("mouseover",function(){
////		console.log(this.getAttribute("data-index"));
//		run(this.getAttribute("data-index"));//this=controls[i]
//	})
//}

//园点控制之闭包
for(var i = 0; i < controls.length; i++) {
	(function(j) {
		controls[j].addEventListener("mouseover", function() {
			run(j);
		});
	})(i) //立刻执行

}

//事件代理之控制圆点时间
//document.querySelector("ol").addEventListener("mousemove",function(e){
//	if (e.target.nodeName=="LI") {
//		for (var i=0;i<controls.length;i++) {
//			if (e.target==controls[i]) {
//				run(i);
//			}
//		}
//	}
//})

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

//定时器
//setInterval(function() {
//
//	carousel.style.transform = "translateX(-" + target_index * 100 + "%)";
//}, 3000)

//var scollMove=setInterval(run,1000);

function play() {
	timer = setInterval(function() {
		if(++now_index >= 5) {
			now_index = 0;
		}
		carousel.style.transform = "translateX(-" + now_index * 100 + "%)";
	}, 2000);
}
play();
carousel.onmouseover = function() {
	clearInterval(timer);
};
carousel.onmouseout = function() {
	play()
}