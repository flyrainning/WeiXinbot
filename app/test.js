const QrcodeTerminal  = require('qrcode-terminal')
const finis           = require('finis')

const { Contact,FriendRequest,Message,MediaMessage,Room,Wechaty } = require('wechaty')
const bot = Wechaty.instance()

bot.on('scan', (url, code) =>{
  console.log(`Scan QR Code to login: ${code}\n${url}`)
  // if (!/201|200/.test(String(code))) {
  //   const loginUrl = url.replace(/\/qrcode\//, '/l/')
  //   QrcodeTerminal.generate(loginUrl)
  // }



})

bot.on('login', async user => {
  console.log(`User ${user} logined`)
  // bot.say('WeiXin Bot login').catch(console.error)
  var contact = await Contact.find({name:""});
  var res=await contact.say(msg);
})

bot.start()
