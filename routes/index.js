var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('mannage');
});

// router.get('/singer/:id',function(req, res, next){
//     res.render('singer');
// });
// /*登录API*/
router.get('/book_list', function(req, res, next){

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    dbo.collection("book"). find({}).toArray(function(err, result) { // 返回book集合中中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });

    });
});
router.get('/book', function(req, res, next){

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    dbo.collection("book"). find({}).toArray(function(err, result) { // 返回book集合中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });

    });
});
router.get('/user',function(req, res, next){

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    dbo.collection("user"). find({}).toArray(function(err, result) { // 返回用户中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });

    });
})
router.get('/item',function(req, res, next){

    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    dbo.collection("item"). find({}).toArray(function(err, result) { // 返回订单中所有数据
        if (err) throw err;
        res.send(result);
        db.close();
    });

    });
});


// /*获取歌曲API*/
// router.get('/music_list',function(req, res, next){
//
//   MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("music");
//   dbo.collection("list"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//       if (err) throw err;
//       res.send(result);
//       db.close();
//   });
//
//   });
// })
//
//
//
//
// router.get('/music_list/:id',function(req, res, next){
//   var name = req.params.id;
//
//   MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("music");
//   var whereStr = {"name":name};  // 查询条件
//   dbo.collection("list").find(whereStr).toArray(function(err, result) {
//       if (err) throw err;
//       res.send(result);
//
//       db.close();
//   });
// });
// })
//
//
//
//
// router.get('/search_list/:id',function(req, res, next){
//   var name = req.params.id;
//   MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("music");
//   var whereStr = {"name":name};  // 查询条件
//   dbo.collection("list").find({"name": {$regex: 'name', $options:'i'}}).toArray(function(err, result) {
//       if (err) throw err;
//       res.send(result);
//
//       db.close();
//   });
// });
// })
//
//
// router.get('/book',function(req, res, next){
//    var palce = req.query.name;
//    console.log(1);
//    console.log(palce);
//    MongoClient.connect(url, function(err, db) {
//      if (err) throw err;
//      var dbo = db.db("book");
//      var whereStr = {"name":palce};  // 查询条件
//      dbo.collection("book").find(whereStr).toArray(function(err, result) {
//         if (err) throw err;
//         res.send(result);
//         db.close();
//       });
//     });
// })

router.get('/search_book_list/:name', function(req, res, next){
    var str_book = req.params.name
    console.log(str_book);
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("book");
        var whereStr = {"name":str_book};
        dbo.collection("book").find(whereStr).toArray(function(err, result) {
             if (err) throw err;
             console.log(result);
             res.send(result);
             db.close();
         });
    });

});

router.get('/users/:userId/musics/:musicId', function(req, res, next){

    res.render('play');
});
//
//
//
// router.post("/sign_in", function (req, res) {
//
//
//       var   txt_email= req.body.user_email;
//       var   txt_password= req.body.user_password;
//

// });
// /*添加歌曲*/

//
// router.post('/add_like',function(req, res){
//     var add_like = req.body.music;
//     var id = req.body.id;
//     console.log(id);
//     var like = JSON.parse(add_like);
//
//     MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("music");
//       console.log(like);
//     var whereStr = {"account":`${id}`};  // 查询条件
//     var updateStr = {$addToSet: { "like" :like }};
//     dbo.collection("user").updateOne(whereStr, updateStr, function(err, res) {
//           if (err) throw err;
//           console.log("文档更新成功");
//           db.close();
//           });
//         });
//
//
// });
//
// router.post('/remove_like',function(req, res){
//     var add_like = req.body.music;
//     var id = req.body.id;
//     console.log(id);
//     var like = JSON.parse(add_like);
//
//     MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("music");
//       console.log(like);
//     var whereStr = {"account":`${id}`};  // 查询条件
//     var updateStr = {$pull: { "like" :like }};
//     dbo.collection("user").updateOne(whereStr, updateStr, function(err, res) {
//           if (err) throw err;
//           console.log("文档更新成功");
//           db.close();
//           });
//         });
//
//
// });
//
//
router.post('/delete',function(req, res){
    var delete_name = req.body.name;
    console.log(delete_name);
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    var whereStr = {"name":delete_name};  // 查询条件
    dbo.collection("book").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});
})
//删除用户
router.post('/delete_user',function(req, res){
    var delete_name = req.body.str;
    console.log(delete_name);
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    var whereStr = {"name":delete_name};  // 查询条件
    dbo.collection("user").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});
})
//插入数据
router.post('/insert',function(req, res){
    var str_book = req.body.str;
    console.log(str_book);
    let book=JSON.parse(str_book) ;
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    dbo.collection("book").insertOne(book, function(err, res) {
          if (err) throw err;
          console.log("文档插入成功");
          db.close();
      });
});
});

//修改数据
router.post('/edit',function(req, res){
    var str_book = req.body.str;
    var name = req.body.name;
    let whereStr =JSON.parse(name) ;

    let book=JSON.parse(str_book) ;
    console.log(book);
    var updateStr = {$set: book};
    MongoClient.connect(url, {useNewUrlParser:true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("book");
    dbo.collection("book").updateOne(whereStr,updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });
});
});

router.get('/manager',function(req, res, next){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
      if (err) throw err;
      var dbo = db.db("book");// 查询条件
      dbo.collection("user").find({}).toArray(function(err, result) {
         if (err) throw err;
         res.send(result);
         db.close();
       });
     });
});
// function addOneMusic(obj){
//     MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("music");// 查询条件
//       dbo.collection("list").insertOne(obj,function(err, result) {
//          if (err) throw err;
//          console.log("插入成功");
//          db.close();
//        });
//      });
// }
module.exports = router;
