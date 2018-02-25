var carousel_box = document.querySelector(".carousel_box"),
	carousel = document.querySelector("ul"),
	left_arrow = document.querySelector(".left_arrow"),
	right_arrow = document.querySelector(".right_arrow"),
	carousel_details = document.querySelectorAll("ul li"),
	//	controls = document.querySelectorAll("ol li"),
	now_index = 0,
	last_index = 0,
	is_run = false,
	timer,
	new_li,
	new_ol,
	controls;

//动态生成小圆点
new_ol = document.createElement("ol");
new_ol.innerHTML += "<li class='active'></li>";
for(var i = 0; i < carousel_details.length; i++) {
	new_ol.innerHTML += "<li></li>";
}
carousel_box.appendChild(new_ol);
controls = document.querySelectorAll("ol li");

//右箭头点击事件
right_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		++now_index >= 5 ? right_run(now_index) : run(now_index);
	}
})

//左箭头点击事件
left_arrow.addEventListener("click", function() {
	if(!is_run) {
		is_run = true;
		--now_index < 0 ? left_run(now_index) : run(now_index);
	}

	//	if(!is_run) {
	//		is_run = true;
	//		--now_index < 0 ? now_index = 4 : "";
	//		run(now_index);
	//	}
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
			if(last_index != j) {
				now_index = j;
				run(j);
			}
		})
	})(i)
}

//自动轮播函数
function auto_play() {
	timer = setInterval(function() {
		if(!is_run) {
			is_run = true;
			++now_index >= 5 ? right_run(now_index) : run(now_index);
		}
	}, 2000)
}
//auto_play();

//移出自动轮播
carousel_box.addEventListener("mouseover", function() {
	clearInterval(timer);
})

//重载自动轮播
carousel_box.addEventListener("mouseout", function() {
	//	auto_play();
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

//右边边界轮播图函数
function right_run(target_index) {
	/**
	 * 1.将第一张克隆
	 * 2.将克隆出来元素添加到最后
	 * 3.执行轮播时的动画
	 * 4.动画结束后将视图的位置调到第一位
	 * 5.将克隆的元素裁剪
	 * 6.将原来的圆点取消类名
	 * 7.将第一圆点加上类名
	 */
	new_li = carousel_details[0].cloneNode(true);
	carousel.appendChild(new_li);
	carousel.style.transform = "translateX(-" + target_index * 100 + "%)";
	carousel.addEventListener("transitionend", right_run_end)

	function right_run_end() {
		carousel.style.transition = "none";
		carousel.style.transform = "translateX(0%)";
		getComputedStyle(carousel).transition;
		carousel.style.transition = "";
		new_li.remove();
		controls[last_index].classList.remove("active");
		last_index = 0;
		now_index = 0;
		controls[now_index].classList.add("active");
		carousel.removeEventListener("transitionend", right_run_end);
	}
}

function left_run(target_index) {
	/**
	 * 1.将最后一张克隆
	 * 2.首先将transition干掉
	 * 3.将新的li添加到第一位
	 * 4.将可视窗口移动-100%
	 * 5.将transition添加回来
	 * 6.将可视窗口移动0%
	 * 7.将transition再次干掉
	 * 8.将克隆那张砍掉
	 * 9.将可视窗口移动到最后一张
	 * 10.将transition添加回来
	 * 11.is_run关闭
	 */

	new_li = carousel_details[4].cloneNode(true);
	carousel.style.transition = "none";
	carousel.insertBefore(new_li, carousel_details[0]);
	carousel.style.transform = "translateX(-100%)";
	getComputedStyle(carousel).transition; //友善提醒
	carousel.currentStyle ? console.dir(carousel.currentStyle) : getComputedStyle(carousel).transform;
	carousel.style.transition = "";
	carousel.style.transform = "translateX(0%)";
	carousel.addEventListener("transitionend", left_run_end);
	controls[last_index].classList.remove("active");
	last_index = 4;
	now_index = 4;
	controls[now_index].classList.add("active");

	function left_run_end() {
		carousel.style.transition = "none";
		new_li.remove();
		carousel.style.transform = "translateX(-400%)";
		carousel.currentStyle ? console.dir(carousel.currentStyle) : getComputedStyle(carousel).transform;
		carousel.style.transition = "";
		is_run = false;
		carousel.addEventListener("transitionend", left_run_end);
	}
}