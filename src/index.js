require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("../config.json");
var http = require('http');  

http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8080);
const client = new Discord.Client();
const riskyWords = ["pedof", "pedop"];
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Risky risky");
});

client.on('ready', () => {

  console.log('Your Bot is now Online.')
  let activities = [`CRY FOR ME`, `CRY FOR ME`, `CRY FOR ME`   ],i = 0;

  setInterval(() => client.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"LISTENING",  }), 5000)


})

client.login(process.env.TOKEN);
client.on("message", gotMessage);

function gotMessage(msg) {
  if (riskyWords.some((word) => msg.content.includes(word))) {
    msg.channel.send(
      ":oncoming_police_car: risky risky wiggy wiggy this is an emergency :oncoming_police_car:"
    );
    msg.react("<:faworytkazamknijmorde:788039637892595733>");
    msg.react("👮");
  }
  if (msg.content.toLowerCase().includes("fancy") && !msg.author.bot) {
    msg.channel.send(
      "Fancy, woo!"
    );
    reactFancy(msg);
  }
  reactIdol(msg);
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
}

function reactIdol(msg) {
  let idols = ["Jihyo", "Sezonowa gruba", "Sana", "Mina", "Momo", "Chaeyoung", "Zamknij mordę", "Dahyun", "Nayeon", "Jeongyeon", "Tzuyu", "Yeji", "Lia", "Ryujin", "Chaeryeong", "Yuna"]
  let idolsalt = ["Gruba", "Sezonowa gruba", "Smutna japonka", "Typowa japonka", "Faworytka", "Zamknij morde", "Dahyun", "Glitter Queen",
   "Silna niezależna", "Wolny tajwan", "Yeji", "Lia", "Chania", "Chaeryeong", "I keep walking"]
  let emotes = ["<:gruba:787997801438904330>", "<:sezonowagruba:788040305378721822>", "<:sanah:787999428157505536>", "<:smutnamina:785973154266873877>",
   "<:typowajaponka:788001654502719489>", "<:faworytka:788039538362679306>", "<:faworytkazamknijmorde:788039637892595733>", "<:dahyun:788009442884321310>",
    "<:komedia:776850321585995806>", "<:silnaniezalezna:788043791243673660>", "<:wolnytajwan:789270621141991474>",
     "<:yeji:788039002623311883>", "<:lia:788041277686022194>", "<:chania:788006813533732900>", "<:chaeryeong:788009565500342303>", "<:ikeepwalking:769684288484016150>"]

  for (i = 0; i < idols.length; i++) {
    if ((msg.content.toLowerCase().includes(idols[i].toLowerCase()) || msg.content.toLowerCase().includes(idolsalt[i].toLowerCase())) && !msg.author.bot) {
      msg.react(emotes[i])
    }
  }
}

function reactFancy(msg) {
    msg.react("🇫");
    msg.react("🇦");
    msg.react("🇳");
    msg.react("🇨");
    msg.react("🇾");
    msg.react("🇼");
    msg.react("🇴");
    msg.react("🅾️");
    msg.react("<:faworytka:788039538362679306>");
}