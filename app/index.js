var express = require('express');
const wx=require("./WeiXin");

//var Contact=bot.self()


// console.log(wx);


// console.log(Contact);
// console.log(wx.version());
//



var app = express();
app.use(express.static('wwwroot'));
app.all('/api', async function(req, res) {
  act=req.query.act || req.body.act;
  if (act=="send"){
    to=req.query.to || req.body.to;
    msg=req.query.msg || req.body.msg;
    res.json(await wx.send(to,msg));
  }else if (act=="roomsend"){
    to=req.query.to || req.body.to;
    msg=req.query.msg || req.body.msg;
    res.json(await wx.roomsend(to,msg));
  }else if (act=="getContact"){
    search=req.query.search || req.body.search;
    res.json(await wx.getContact(search));
  }else if (act=="status"){
    var r={
      status:wx.status,
      username:wx.user,
      login_url:wx.login_url,
      login_code:wx.login_code
    }
    res.json(r);
  }else{
    res.send('Action error');
  }
});


var server = app.listen(800, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

wx.start();

//
// process.stdin.setEncoding('utf8');
//
// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//
//     if (chunk=="start\n"){
//         console.log("1");
//         start();
//     }
//     if (chunk=="send\n"){
//         console.log("2");
//         send();
//     }
//     if (chunk=="s\n"){
//         console.log("3");
//         s();
//     }
//   }
// });
//
//
// function start(){
//     bot.start()
// .catch(e => {
//   log.error('Bot', 'start() fail: %s', e)
//   bot.stop()
//   process.exit(-1)
// });
//
// }
// var contact
// function send2(){
//  contact =  Contact.find({name:'莱西华冠衣帽厂'});
// console.log(contact)
//
//
// }
// function s(){
// contact.say('welcome');
// }
//
// async function send(){
//
//     const contact = await Contact.find({name:'sunflower_46'});//sunflower_46
//     await contact.say('welcome');
// }
