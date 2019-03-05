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

						 console.log(data[i]);
						 var li=$('<li></li>');
						 var name =$(`<div class="music_name">${data[i].id}</div>`);
						 var z_name =$(`<div>${data[i].name}</div>`);
						 var author =$(`<div>${data[i].work}</div>`);
						 var palce =$(`<div>${data[i].type}</div>`);
						 var time = $(`<div>${data[i].time}</div>`);

						 var edit = $('<div class="edit"></div>');
						 var add =$('<a class="add"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>');
						 var remove =$('<a class="remove"><i class="fa fa-trash" aria-hidden="true"></i></a>');

						 var hr=$('<hr class="style-one"></hr>');
						 edit.append(add);
						 edit.append(remove);


						 li.append(name);
						 li.append(z_name);
						 li.append(author);
						 li.append(palce);
						 li.append(time);




						 li.append(edit);
						 $('#user_list').append(li);
						 $('#user_list').append(hr);

					 }
					 deleteMusic();



}

function disItem(data) {
	$('#item_list').html('');
	$('#item_list').append(`<li><div>借书单编号</div><div>借书人名字</div><div>书名</div><div>数量</div><div>时间</div><div></div></li><hr class="style-one"></hr>`);

			var num=data.length;
			 for(i=0;i<num;i++){

					console.log(data[i]);
					var li=$('<li></li>');
					var name =$(`<div class="music_name">${data[i].id}</div>`);
					var z_name =$(`<div>${data[i].user_name}</div>`);
					var author =$(`<div>${data[i].book}</div>`);
					var palce =$(`<div>${data[i].num}</div>`);
					var time = $(`<div>${data[i].time}</div>`);

					var edit = $('<div class="edit"></div>');
					var add =$('<a class="add"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>');
					var remove =$('<a class="remove" ><i class="fa fa-trash" aria-hidden="true"></i></a>');

					var hr=$('<hr class="style-one"></hr>');
					edit.append(add);
					edit.append(remove);


					li.append(name);
					li.append(z_name);
					li.append(author);
					li.append(palce);
					li.append(time);




					li.append(edit);
					$('#item_list').append(li);
					$('#item_list').append(hr);

				}
}
function deleteMusic(){

		$('.display_con .display_main .what .show_list #remove_book').bind('click', function(){
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
	$('.display_con .display_main .what .show_list #view_book').bind('click', function(){
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
	$('.display_con .display_main .what .show_list #edit_book').bind('click', function(){
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
								          <p>书名：<input type="text" name="" value="${data[i].name}"></p>
								          <p>作者：<input type="text" name="" value="${data[i].author}"></p>
								          <p>地区：<input type="text" name="" value="${data[i].palce}"></p>
								          <p>图书馆余量：<input type="text" name="" value="${data[i].all_num}"></p>
								          <p>出版社：<input type="text" name="" value="${data[i].z_name}" ></p>
								      </div>

								    </div>
								    <div class="book_introduce">
												<p>图书简介：</p>
								        <p><input type="text" name="" value="${data[i].introduce}"></p>
								    </div>
										<div class = "edit_sumbit">
												提交
										<div>
								</div>`
							});
						}
					}
				});



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
