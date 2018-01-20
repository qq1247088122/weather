/*
* @Author: samsung
* @Date:   2018-01-19 11:55:51
* @Last Modified by:   samsung
* @Last Modified time: 2018-01-20 15:51:25
*/
// 标注所有的城市

let citys,weatherobj;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys=obj.data;
		console.log(citys);
		for(let i in citys){
			let section = document.createElement('section');
			let citys_title = document.createElement('h1');
			citys_title.className = "citys_title";
			citys_title.innerHTML = i;
			section.appendChild(citys_title);//确定关系
			for(let j in citys[i]){
				let citys_list = document.createElement('ul');
				citys_list.className = "citys_list";
				let li = document.createElement('li');
				li.innerHTML = j;
				citys_list.appendChild(li);
				section.appendChild(citys_list);
			}
			$(".citys_box").append(section);

		}
	}
})

$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
     getFullWeather(remote_ip_info.city);
     // getFullWeather("太原");

});
// 获取当前城市所有的天气信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市的天气信息
	$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj){
		weatherobj=obj.data;
	    // console.log(weatherobj);
		// 当前的空气质量
		$(".now_air2").html(weatherobj.weather.quality_level);
		$(".temp").html(weatherobj.weather.current_temperature);
		$(".now_wind").html(weatherobj.weather.wind_direction);
		$(".now_wind_level").html(weatherobj.weather.wind_level+"级");
		$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
		$(".today_weather").html(weatherobj.weather.dat_condition);
		$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
		$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
		$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");


	//24小时之内的天气信息
		let hours_array = weatherobj.weather.hourly_forecast;
		// console.log(hours_array);
		for(let i=0;i<hours_array.length;i++){
			// 创建元素并添加到页面中
         	let hours_list = document.createElement('li');
			let hours_time = document.createElement('span');
			hours_time.className = 'hours_time';
			let hours_img = document.createElement('img');
			hours_img.className = 'hours_img';
			let hours_temp = document.createElement('span');
			hours_temp.className = 'hours_temp';

			hours_list.appendChild(hours_time);
			hours_list.appendChild(hours_img);
			hours_list.appendChild(hours_temp);

			$(".hours_content").append(hours_list);

			// 当下的时间
			hours_time.innerHTML = hours_array[i].hour+":00";
			hours_img.setAttribute("src","img/"+hours_array[i].weather_icon_id+".png");
			hours_temp.innerHTML = hours_array[i].temperature+"°";
		}

	//未来两周之内的天气情况
		let weekends_array = weatherobj.weather.forecast_list;
		// console.log(recent_array);
		for(let i=0;i<weekends_array.length;i++){
			// 创建元素并添加到页面中
			let weekends_list = document.createElement('li');
			let weekends_date = document.createElement('span');
			weekends_date.className = 'weekends_date';
			let weekends_weather = document.createElement('span');
			weekends_weather.className = 'weekends_weather';
			let weekends_img = document.createElement('img');
			weekends_img.className = 'weekends_img';
			let weekends_temp_max = document.createElement('span');
			weekends_temp_max.className = 'weekends_temp_max';
			let weekends_temp_min = document.createElement('span');
			weekends_temp_min.className = 'weekends_temp_min';
			let weekends_wind = document.createElement('span');
			weekends_wind.className = 'weekends_wind';
			let weekends_wind_size = document.createElement('span');
			weekends_wind_size.className = 'weekends_wind_size';

			weekends_list.appendChild(weekends_date);
			weekends_list.appendChild(weekends_weather);
			weekends_list.appendChild(weekends_img);
			weekends_list.appendChild(weekends_temp_max);
			weekends_list.appendChild(weekends_temp_min);
			weekends_list.appendChild(weekends_wind);
			weekends_list.appendChild(weekends_wind_size);

			$(".weekends_content").append(weekends_list);

		    weekends_date.innerHTML = weekends_array[i].date.substring(5,7)+"/"+weekends_array[i].date.substring(8);
		    //weekends_date.innerHTML = weekends_array[i].date.replace(/-/g,"/").getDate();
			weekends_weather.innerHTML = weekends_array[i].condition;
			weekends_img.setAttribute("src","img/"+weekends_array[i].weather_icon_id+".png");
			weekends_temp_max.innerHTML = weekends_array[i].high_temperature+"°";
			weekends_temp_min.innerHTML = weekends_array[i].low_temperature+"°";
			weekends_wind.innerHTML = weekends_array[i].wind_direction;
			weekends_wind_size.innerHTML = weekends_array[i].wind_level+"级";
		}
}
})
}

$(function(){
	// 通过on来添加点击事件
	$(".now_city").on("click",function(){
		$(".submit").html('取消');
	 	$(".search").val("");
		// display：竖排 显示隐藏
		$(".citys").css("display","block");
	})

	// $(".citys_list li").on("click",function(){
	// 	let son = this.innerHTML;
	// 	getFullWeather(son);
	// 	$(".citys").css("display","none");
	// })

	//事件委派
	$("body").delegate('.citys_list li', 'click', function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})
	 $("body").delegate('.citys_title', 'click', function() {
	 	let son = this.innerHTML;
	 	getFullWeather(son);
	 	$(".citys").css("display","none");
	 })

	 $(".search").on("focus",function(){
	 	$(".submit").html('确认');
	 })
	 // $(".search").on("blur",function(){
	 // 	$(".submit").html('取消');
	 // })


	 $(".submit").on("click",function(){
	 	if(this.innerText == "取消"){
	 		$(".citys").css("display","none");
	 	}else if(this.innerText == "确认"){
	 		let text = $(".search").val();
	 		for(let i in citys){
	 			if(text == i){
	 				getFullWeather(text);
	 				$(".citys").css("display","none");
	 				return;
	 			}else{
	 				for(let j in citys[i]){
	 					if(text == j){
	 						getFullWeather(text);
	 						$(".citys").css("display","none");
	 						return;
	 					}
	 				}
	 			}
	 	}
	 	alert("输出地区有误！");
	 	$(".submit").html('取消');
	 	$(".search").val("");
	 }
	 })

	// $(".search").on("blur",function(){
	// 	$(".submit").html('取消');
	//   })
})
// window onload = function(){	
// }


