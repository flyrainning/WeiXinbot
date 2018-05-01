var express = require('express');
var bodyParser = require('body-parser');
const wx=require("./WeiXin");


var app = express();
app.use(express.static('wwwroot'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.all('/api', async function(req, res) {
  try{
    var act=req.query.act || req.body.act;
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
  } catch (e) {
    console.error(e)
    res.send('Error',e);
  }

});


var server = app.listen(800, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

wx.start();
