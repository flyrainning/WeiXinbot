const QrcodeTerminal  = require('qrcode-terminal')
const finis           = require('finis')

const { Contact,FriendRequest,Message,MediaMessage,Room,Wechaty } = require('wechaty')
const bot = Wechaty.instance()


wx={
  status:0,
  user:"",
  login_url:"",
  login_code:0,
  version:()=>bot.version(),
  start:()=>{
    var reset=false
    while (!reset) {
      try{
        bot.start()
        reset=true
      } catch (e) {
        reset=false
      }
    }
    

  },
  send:async (to,msg)=>{
    res="0";
    if (wx.status){
      try{
        var contact = await Contact.find({name:to});
        var isFind=false;
        if (contact){
          isFind=true;
        }else{
          contact = await Contact.find({alias:to});
        }
        if (contact){
          isFind=true;
        }
        if (isFind) res=await contact.say(msg);

      } catch (e) {
        console.error(e)
      }

    }
    return res;
  },
  roomsend:async (to,msg)=>{
    res="0";
    if (wx.status){
      try{
        var contact = await Room.find({topic:to});
        if (contact){
          isFind=true;
        }
        if (isFind) res=await contact.say(msg);
      } catch (e) {
        console.error(e)
      }


    }
    return res;
  },
  getContact:async (search)=>{
    res={
      official:[],
      special:[],
      personal:[]
    }
    if (wx.status){
      try{
        var contactList;
        if (search){
          contactList = await Contact.findAll({name:search})
        }else{
          contactList = await Contact.findAll()
        }

        for (let i = 0; i < contactList.length; i++) {
          const contact = contactList[i]

          if (contact.official()) {
            res.official.push(contact.name())
            // log.info('Bot', `official ${i}: ${contact}`)
          }
          if (contact.special()) {
            res.special.push(contact.name())
            // log.info('Bot', `special ${i}: ${contact.name()}`)
          }
          if (contact.personal()) {
            res.personal.push(contact.name())
            // log.info('Bot', `personal ${i}: ${contact.get('name')} : ${contact.id}`)
          }
        }
      } catch (e) {
        console.error(e)
      }

    }
    return res
  }

}

bot.on('scan', (url, code) =>{
  console.log(`Scan QR Code to login: ${code}\n${url}`)
  if (!/201|200/.test(String(code))) {
    const loginUrl = url.replace(/\/qrcode\//, '/l/')
    QrcodeTerminal.generate(loginUrl)
  }
  wx.login_url=url;
  wx.login_code=code;

})
bot.on('login', user => {
  console.log(`User ${user} logined`)
  // bot.say('WeiXin Bot login').catch(console.error)
  wx.status=1;
  wx.user=user.name();
  wx.login_url="";
  wx.login_code=0;
})
bot.on('logout'	, user =>{
  wx.status=0;
  wx.user="";
  wx.login_url="";
  wx.login_code=0;
  log.info('Bot', `${user.name()} logouted`)
})
bot.on('message', message => {
  //console.log(`Message: ${message}`)
})
bot.on('error', async e => {
  wx.status=0
  wx.user="";
  wx.login_url="";
  wx.login_code=0;
  log.error('Bot', 'error: %s', e)
  if (bot.logonoff()) {
    await bot.say('Wechaty error: ' + e.message).catch(console.error)
  }

})


bot.on('friend', async (contact, request) => {
  let logMsg
  const fileHelper = Contact.load('filehelper')

  try {
    logMsg = 'received `friend` event from ' + contact.get('name')
    fileHelper.say(logMsg)
    console.log(logMsg)
    logMsg=""

    if (request) {
      /**
       *
       * 1. New Friend Request
       *
       * when request is set, we can get verify message from `request.hello`,
       * and accept this request by `request.accept()`
       */
      // if (request.hello === 'ding') {
      //   logMsg = 'accepted because verify messsage is "ding"'
      //   request.accept()
      //
      // } else {
      //   logMsg = 'not auto accepted, because verify message is: ' + request.hello
      // }
      logMsg = 'accepted , messsage is "'+request.hello+'"'
      request.accept()
    } else {
      /**
       *
       * 2. Friend Ship Confirmed
       *
       */
      logMsg = 'friend ship confirmed with ' + contact.get('name')
    }
  } catch (e) {
    logMsg = e.message
  }

  if (logMsg){
    console.log(logMsg)
    fileHelper.say(logMsg)
  }


})




module.exports=wx
