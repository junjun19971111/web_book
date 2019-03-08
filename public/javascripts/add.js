$(document).ready(function(){
		$("#test").hide();
		$("#addMusic").hide();
    $("#addAuthor").hide();
		$("#singer_test").hide();
    $("#addSome").click(function(){
        $("#dis_fun").hide();
				$("#singer_test").hide();
        $("#dis_music").hide();
        $("#addAuthor").hide();
				$("#test").hide();
        $("#addMusic").show();
        $(".display_main").addClass("add_mod");
    });
    $("#addMan").click(function(){
	        $("#dis_fun").hide();
	        $("#dis_music").hide();
	        $("#addMusic").hide();
					$("#singer_test").hide();
					$("#test").hide();
	        $("#addAuthor").show();
	        $(".display_main").addClass("add_mod");
    });
		$("#manage_music").click(function(){
	        $("#dis_fun").hide();
	        $("#dis_music").hide();
	        $("#addMusic").hide();
					$("#singer_test").hide();
					$("#addAuthor").hide();
	        $("#test").show();
	        $(".display_main").addClass("add_mod");

    });
		$("#manage_singer").click(function(){
					$("#dis_fun").hide();
					$("#dis_music").hide();
					$("#addMusic").hide();
					$("#test").hide();
					$("#addAuthor").hide();
					$("#singer_test").show();
					$(".display_main").addClass("add_mod");

		});
		$("#manage_user").click(function(){
					$("#dis_fun").hide();
					$("#dis_music").hide();
					$("#addMusic").hide();
					$("#test").hide();
					$("#addAuthor").hide();
					$("#singer_test").show();
					$(".display_main").addClass("add_mod");

		});


		getNumber();


});

function addMusic(){
	layer.confirm('您确定保存的信息无误么？', {
			btn: ['确定'] //按钮
			}, function(){
				var name = $('#sumbit_name').val();
				var author = $('#sumbit_author').val();

				var z_name = $('#sumbit_z_name').val();
				var url = $('#sumbit_url').val();
				var palce = $('input[name="palce"]:checked').val();
				var introduce = $('#sumbit_introduce').val();

				$.post('/add_music',{
					name:`${name}`,
					author:`${author}`,
					z_name:`${z_name}`,
					url:`${url}`,
					palce:`${palce}`,
					introduce:`${introduce}`},
				)
			layer.msg('成功添加歌曲', {icon: 1});
			});



}




function getNumber() {
		$.get('/book_list',(data)=>{
				getPage(data);
				displaynews(1,data);
				var number = data.length;
				$('#music_number').html(`${number}`);
		});
		$.get('/user',(data)=>{
				showUser(data);
		});
		$.get('/item',(data)=>{
			disItem(data);
		})
}



function manage_music() {
		$("#dis_fun").hide();
		$("#dis_music").hide();
		$("#addMusic").hide();
		$("#addAuthor").hide();
		$("#manage_music").show();
		$(".display_main").addClass("add_mod");

}

/*得到总页数*/
function getPage(data) {
				var num=data.length;
				num=num/8;
				console.log(num);
				var pre_btn = $('<li><a id="pre">上一页</a></li>');
				var next_btn = $('<li><a id="next">下一页</a></li>');
				var set_page = $('<li><a id="page_0" class="active">1</a></li>');
				$('#page').append(pre_btn);
				$('#page').append(set_page);
				for (var i = 1; i < num; i++) {
					$('#page').append(`<li><a id="page_${i}">${i+1}</a></li>`);
				}
				$('#page').append(next_btn);
				listenBtn(num,data);
}

/*监听按钮*/
function listenBtn(num,data) {
		$('#pre').bind('click',function(){
			var now_page= $('.display_con .display_main .what .select_btn .active').text();
			now_page=parseInt(now_page);
			console.log(now_page);
			if (now_page == 1) {
					layer.msg('已经是第一页');
			} else {
					$('.display_con .display_main .what .select_btn ul li a').removeClass('active');
					$(`#page_${now_page-2}`).addClass('active');
					displaynews(now_page-1,data);

			}
		});
		$('#next').bind('click',function(){
			var now_page= $('.display_con .display_main .what .select_btn .active').text();
			now_page=parseInt(now_page);
			if (now_page > num) {
					layer.msg('已经是最后一页');
			} else {
					$('.display_con .display_main .what .select_btn ul li a').removeClass('active');

					console.log(now_page+1);
					$(`#page_${now_page}`).addClass('active');
					displaynews(now_page+1,data);

			}
		});
}

function displaynews(index,data) {
		var j=(index-1)*8;
		console.log(j);
	  $('#simplecontent').html('');

		$('#simplecontent').append(`<li><div>书名</div><div>作者</div><div>地区</div><div>出版社</div><div>数量</div><div></div></li><hr class="style-one"></hr>`);

				var num=data.length;
        for(i=j;i<j+8;i++){
					if(i<data.length){
						console.log(data[i]);
						var li=$('<li></li>');
						var name =$(`<div class="music_name">《${data[i].name}》</div>`);
						var z_name =$(`<div>${data[i].z_name}</div>`);
						var author =$(`<div>${data[i].author}</div>`);
						var palce =$(`<div>${data[i].palce}</div>`);
						var hot = $(`<div>${data[i].all_num}</div>`);
						var edit = $('<div class="edit"></div>');
						var add =$('<a class="add" id="edit_book"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>');
						var remove =$('<a class="remove" id="remove_book"><i class="fa fa-trash" aria-hidden="true"></i></a>');
						var view =$('<a class="view" id="view_book"><i class="fa fa-eye" aria-hidden="true"></i></a>');
						var hr=$('<hr class="style-one"></hr>');
						edit.append(add);
						edit.append(remove);
						edit.append(view);

						li.append(name);
						li.append(author);
						li.append(palce);
						li.append(z_name);


						li.append(hot);
						li.append(edit);
						$('#simplecontent').append(li);
						$('#simplecontent').append(hr);

					}


        }
				deleteMusic();
				viewBook();
				editBook();
}

function showUser(data) { //显示传过来的用户数据
		 $('#user_list').html('');
		 $('#user_list').append(`<li><div>管理员编号</div><div>名字</div><div>身份</div><div>身份权限</div><div>注册时间</div><div></div></li><hr class="style-one"></hr>`);

				 var num=data.length;
					for(i=0;i<num;i++){
						 var li=$('<li></li>');
						 var name =$(`<div class="music_name">${data[i].id}</div>`);
						 var z_name =$(`<div>${data[i].name}</div>`);
						 var author =$(`<div>${data[i].work}</div>`);
						 var palce =$(`<div>${data[i].type}</div>`);
						 var time = $(`<div>${data[i].time}</div>`);

						 var edit = $('<div class="edit"></div>');
						 var add =$(`<a class="remove" onclick="delete_user('${data[i].name}')"><i class="fa fa-trash" aria-hidden="true"></i></a>`);


						 var hr=$('<hr class="style-one"></hr>');
						 edit.append(add);


						 li.append(name);
						 li.append(z_name);
						 li.append(author);
						 li.append(palce);
						 li.append(time);




						 li.append(edit);
						 $('#user_list').append(li);
						 $('#user_list').append(hr);

					 }




}
//删除用户
function delete_user(data) {
	layer.confirm('您确定要删除该用户么？', {
		btn: ['确定','取消'] //按钮
	}, function(){
		$.post('/delete_user',{str:data}, function(res){
			if(res){
				console.log(1);

			}
			else {

			}
		})
		layer.msg('成功删除', {icon: 1});
	}, function(){
		layer.close();

	});

}
function disItem(data) {
	$('#item_list').html('');
	$('#item_list').append(`<li><div>借书单编号</div><div>借书人名字</div><div>书名</div><div>数量</div><div>时间</div><div>情况</div></li><hr class="style-one"></hr>`);

			var num=data.length;
			 for(i=0;i<num;i++){
					var li=$('<li></li>');
					var name =$(`<div class="music_name">${data[i].id}</div>`);
					var z_name =$(`<div>${data[i].user_name}</div>`);
					var author =$(`<div>${data[i].book}</div>`);
					var palce =$(`<div>${data[i].num}</div>`);
					var time = $(`<div>${data[i].time}</div>`);
					if(type == 1){
						var type = $(`<div>图书已还<div>`);
					}
					else {
						var type = $(`<div>图书未还<div>`);
						var remove =$('<a class="remove" onclick="message()"><i class="fa fa-clock-o" aria-hidden="true"></i></a>');
					}

					var edit = $('<div class="edit"></div>');



					var hr=$('<hr class="style-one"></hr>');

					edit.append(remove);


					li.append(name);
					li.append(z_name);
					li.append(author);
					li.append(palce);
					li.append(time);
					li.append(type);




					li.append(edit);
					$('#item_list').append(li);
					$('#item_list').append(hr);

				}
}

//提醒客户
function message() {
	 layer.msg('已催促', {icon: 1});
}
function deleteMusic(){

		$('.display_con .display_main .what .show_list .remove').bind('click', function(){
					var delete_name = $(this).parent().parent().children('.music_name').text();
					delete_name=delete_name.replace("《","");
					delete_name=delete_name.replace("》","");
					console.log(delete_name);
					layer.confirm('您确定要删除该图书么？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						$.post('/delete',{name:delete_name}, function(res){
							if(res){
								console.log("删除成功");
							}
							else {

							}
						})
					  layer.msg('成功删除', {icon: 1});
					}, function(){
					  layer.close();

					});


		});
}
//查看图书详细信息
function viewBook() {
	$('.display_con .display_main .what .show_list .view').bind('click', function(){
				var view_name = $(this).parent().parent().children('.music_name').text();
				view_name=view_name.replace("《","");
				view_name=view_name.replace("》","");
				console.log(view_name);
				$.get('/book',(data)=>{
					for (var i = 0; i < data.length; i++) {
						if (data[i].name==view_name) {
							console.log(data[i]);
							layer.open({
			  				type: 1,
								title:"图书信息",
			  				skin: 'layui-layer-rim', //加上边框
			  				area: ['500px', '440px'], //宽高
			  				content:`<div class="all_book_info">
								    <div class="book_name">
								      <div class="book_img">
								        <img src="${data[i].img_url}" alt="">
								      </div>
								      <div class="book_info">
								          <p>书名：${data[i].name}</p>
								          <p>作者：${data[i].author}</p>
								          <p>地区：${data[i].palce}</p>
								          <p>图书馆余量：${data[i].all_num}</p>
								          <p>出版社：${data[i].z_name}</p>
								      </div>

								    </div>
								    <div class="book_introduce">
												<p>图书简介：</p>
								        <p>${data[i].introduce}</p>
								    </div>
								</div>`
							});
						}
					}
				});



	});

}

//修改图书信息
function editBook() {
	$('.display_con .display_main .what .show_list .add').bind('click', function(){
				var view_name = $(this).parent().parent().children('.music_name').text();
				view_name=view_name.replace("《","");
				view_name=view_name.replace("》","");
				console.log(view_name);
				$.get('/book',(data)=>{
					for (var i = 0; i < data.length; i++) {
						if (data[i].name==view_name) {
							console.log(data[i]);
							layer.open({
			  				type: 1,
								title:"图书信息",
			  				skin: 'layui-layer-rim', //加上边框
			  				area: ['600px', '440px'], //宽高
			  				content:`<div  class="all_book_info">
								    <div class="book_name">
								      <div class="book_img">
								        <img src="${data[i].img_url}" alt="">
								      </div>
								      <div class="book_info2">
								          <p >书名：<input id="change_book_name" type="text" name="" value="${data[i].name}"></p>
								          <p>作者：<input  id="change_book_author" type="text" name="" value="${data[i].author}"></p>
								          <p>地区：<input  id="change_book_place" type="text" name="" value="${data[i].palce}"></p>
								          <p>图书馆余量：<input  id="change_book_all_num" type="text" name="" value="${data[i].all_num}"></p>
								          <p>出版社：<input  id="change_book_z_name" type="text" name="" value="${data[i].z_name}" ></p>
								      </div>

								    </div>
								    <div class="book_introduce">
												<p>图书简介：</p>
								        <p><input id="change_book_z_introduce" type="text" name="" value="${data[i].introduce}"></p>
								    </div>
										<div class = "edit_sumbit" onclick="editSumbitBook('${data[i].name}');">
												提交
										<div>
								</div>`
							});
						}
					}
				});



	});

}
//修改图书的监听提交函数
function editSumbitBook(data) {

	let name = $('#change_book_name').val();
	let author = $('#change_book_author').val();
	let place = $('#change_book_place').val();
	let all_num = $('#change_book_all_num').val();
	let z_name = $('#change_book_z_name').val();
	let introduce = $("#change_book_z_introduce").val();
	let book={
		"name":name,
		"author":author,
		"place":place,
		"all_num":all_num,
		"z_name":z_name,
		"introduce":introduce
	}
	let change_name={
		"name":data
	}
	let info = JSON.stringify(change_name);
	let str = JSON.stringify(book);
	$.post('/edit',{str:str,name:info}, function(res){
		if(res){
			console.log(1);

		}
		else {

		}
	})
	 layer.msg('成功修改', {icon: 1});

}

//搜索功能
function search_book() {
		let bookinfo = $('#search').val();
		$.get(`/search_book_list/${bookinfo}`,(data)=>{
			if(data[0]){
				layer.open({
					type: 1,
					title:"图书信息",
					skin: 'layui-layer-rim', //加上边框
					area: ['500px', '440px'], //宽高
					content:`<div class="all_book_info">
							<div class="book_name">
								<div class="book_img">
									<img src="${data[0].img_url}" alt="">
								</div>
								<div class="book_info">
										<p>书名：${data[0].name}</p>
										<p>作者：${data[0].author}</p>
										<p>地区：${data[0].palce}</p>
										<p>图书馆余量：${data[0].all_num}</p>
										<p>出版社：${data[0].z_name}</p>
								</div>

							</div>
							<div class="book_introduce">
									<p>图书简介：</p>
									<p>${data[0].introduce}</p>
							</div>
					</div>`
				});
			}
			else {
				layer.msg('书名不存在或书名错误', {icon: 5});
			}
		});

}

function addBook() {
	layer.confirm('您确定此图书信息编辑没错么？', {
		btn: ['确定','取消'] //按钮
	}, function(){
			let name = $("#sumbit_name").val();
			let author = $("#sumbit_name").val();
			let z_name  =$("#sumbit_name").val();
			let img_url = $("#sumbit_name").val();
			let palce = $("#sumbit_name").val();
			let introduce = $("#sumbit_name").val();
			let book={
				"name":name,
				"author":author,
				"z_name":z_name,
				"img_url": img_url,
				"palce":palce,
				"introduce":introduce

			}
			let str = JSON.stringify(book);
			$.post('/insert',{str:str}, function(res){
				if(res){
					console.log(1);

				}
				else {

				}
			})
			layer.msg('成功添加', {icon: 1});



	}, function(){
		layer.close();

	});


}



function listenEdit() {
			$('.display_con .display_main .what .show_list .add').bind('click',function(){
				$("#dis_fun").hide();
				$("#dis_music").hide();
				$("#addAuthor").hide();
				$("#test").hide();
				$("#addMusic").show();
				$(".display_main").addClass("add_mod");
			});
}

function logout(){
		window.location.href="http://localhost:8081";
}
