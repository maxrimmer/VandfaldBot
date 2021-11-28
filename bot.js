const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);


var isAccepting = false;
var users = [];
var inGame = false;
var waitingForPile = false;
var curKings = [];
var curPis = [];
var curSnipers = [];
var curSniperGames = [];
var sniperGameRunning = false;
var curFingers = [];
var fingerGame = [];
var fingerGameRunning = false;
var isBunke = false;

var tællings = [
  "nul",
  "en",
  "to",
  "tre",
  "fire",
  "fem",
  "seks",
  "syv",
  "otte",
  "ni",
  "ti",
];
var cards = [
  ["H", 1],
  ["H", 2],
  ["H", 3],
  ["H", 4],
  ["H", 5],
  ["H", 6],
  ["H", 7],
  ["H", 8],
  ["H", 9],
  ["H", 10],
  ["H", 11],
  ["H", 12],
  ["H", 13],
  ["R", 1],
  ["R", 2],
  ["R", 3],
  ["R", 4],
  ["R", 5],
  ["R", 6],
  ["R", 7],
  ["R", 8],
  ["R", 9],
  ["R", 10],
  ["R", 11],
  ["R", 12],
  ["R", 13],
  ["K", 1],
  ["K", 2],
  ["K", 3],
  ["K", 4],
  ["K", 5],
  ["K", 6],
  ["K", 7],
  ["K", 8],
  ["K", 9],
  ["K", 10],
  ["K", 11],
  ["K", 12],
  ["K", 13],
  ["S", 1],
  ["S", 2],
  ["S", 3],
  ["S", 4],
  ["S", 5],
  ["S", 6],
  ["S", 7],
  ["S", 8],
  ["S", 9],
  ["S", 10],
  ["S", 11],
  ["S", 12],
  ["S", 13]
];


client.on('message', msg => {
  if (msg.content === '!start') {
    if (isAccepting) {
      msg.reply('Du har sgu da allerede startet et spil');
    } else {
      msg.reply('Meld jer til start med !join');
      isAccepting = true;
      users = [];
      users.push(msg.member.user.tag);
    }

  }
  if (msg.content === '!slut') {
    msg.reply('årgh manner, Jalving har brækket sig :((');
    isAccepting = false;
    users = [];
  }

  if (msg.content === 'debug users tak dit lorte program') {
    msg.reply(users);
  }

  if (msg.content === '!join') {
    if (isAccepting) {
      if (users.includes(msg.member.user.tag)) {
        msg.reply('Du er allerede tilmeldt, din nar');
      } else {
        msg.reply('Du er nu tilmeldt');
        users.push(msg.member.user.tag);
      }

    } else {
      msg.reply('Du skal først starte et spil med !start');
    }
  }

  if (msg.content === '!begin') {
    isAccepting = false;
    inGame = true;
    msg.reply('Spillet er nu i gang');
    msg.reply(users[users.length-1] + " er den første til at trække (!draw)");
  }

  if (msg.content === '!draw') {
    if (cards.length === 0) {
      msg.reply("Der er ikke flere kort, spillet er ovre");
      inGame = false;
    }
    if (msg.member.user.tag === users[users.length-1]) {
      if (Math.floor(Math.random() * (+cards.length)) < 3) {
        msg.reply("Du har brudt cirklen, tag et shot");
      }

      var cardnumber = Math.floor(Math.random() * (+cards.length));
      if(cards[cardnumber][0] === "H") {
        if (cards[cardnumber][1] === 1) {
          msg.reply("Du har trukket hjerter es");
        }
        else if (cards[cardnumber][1] === 11) {
          msg.reply("Du har trukket hjerter knægt");
        }
        else if (cards[cardnumber][1] === 12) {
          msg.reply("Du har trukket hjerter dame");
        }
        else if (cards[cardnumber][1] === 13) {
          msg.reply("Du har trukket hjerter konge");
        } else {
          msg.reply("Du har trukket hjerter: " + cards[cardnumber][1]);
        }

      }
      else if(cards[cardnumber][0] === "R") {
        if (cards[cardnumber][1] === 1) {
          msg.reply("Du har trukket ruder es");
        }
        else if (cards[cardnumber][1] === 11) {
          msg.reply("Du har trukket ruder knægt");
        }
        else if (cards[cardnumber][1] === 12) {
          msg.reply("Du har trukket ruder dame");
        }
        else if (cards[cardnumber][1] === 13) {
          msg.reply("Du har trukket ruder konge");
        } else {
          msg.reply("Du har trukket ruder: " + cards[cardnumber][1]);
        }
      }
      else if(cards[cardnumber][0] === "K") {
        if (cards[cardnumber][1] === 1) {
          msg.reply("Du har trukket klør es");
        }
        else if (cards[cardnumber][1] === 11) {
          msg.reply("Du har trukket klør knægt");
        }
        else if (cards[cardnumber][1] === 12) {
          msg.reply("Du har trukket klør dame");
        }
        else if (cards[cardnumber][1] === 13) {
          msg.reply("Du har trukket klør konge");
        } else {
          msg.reply("Du har trukket klør: " + cards[cardnumber][1]);
        }
      }
      else if(cards[cardnumber][0] === "S") {
        if (cards[cardnumber][1] === 1) {
          msg.reply("Du har trukket spar es");
        }
        else if (cards[cardnumber][1] === 11) {
          msg.reply("Du har trukket spar knægt");
        }
        else if (cards[cardnumber][1] === 12) {
          msg.reply("Du har trukket spar dame");
        }
        else if (cards[cardnumber][1] === 13) {
          msg.reply("Du har trukket spar konge");
        } else {
          msg.reply("Du har trukket spar: " + cards[cardnumber][1]);
        }
      }

      if (cards[cardnumber][1] === 6) {
        curPis.push(msg.member.user.tag);
        msg.reply("Du har nu et piskort, brug !pis for at bruge det");
        var tempUser = users.pop();
        users.unshift(tempUser);
        msg.reply("Det er nu " + users[users.length-1] + ' tur');
        cards.splice(cardnumber,1);
      }
      else if (cards[cardnumber][1] === 8) {
        curFingers.push(msg.member.user.tag);
        msg.reply("Du har nu et finger på bordet kort, brug !finger for at bruge det");
        var tempUser = users.pop();
        users.unshift(tempUser);
        msg.reply("Det er nu " + users[users.length-1] + ' tur');
        cards.splice(cardnumber,1);
      }
      else if (cards[cardnumber][1] === 1) {
        curSnipers.push(msg.member.user.tag);
        msg.reply("Du har nu et sniper kort, brug !sniper for at bruge det");
        var tempUser = users.pop();
        users.unshift(tempUser);
        msg.reply("Det er nu " + users[users.length-1] + ' tur');
        cards.splice(cardnumber,1);
      }
      else if (cards[cardnumber][1] === 13) {
        curKings.push(msg.member.user.tag);
        msg.reply("Du er nu kongen, brug !konge for at bruge dine evner");
        var tempUser = users.pop();
        users.unshift(tempUser);
        msg.reply("Det er nu " + users[users.length-1] + ' tur');
        cards.splice(cardnumber,1);
      }
      else {
        if ((cards[cardnumber][0] === "H" || cards[cardnumber][0] === "R") && (cards[cardnumber][1] > 1 && cards[cardnumber][1] < 6)) {
          msg.reply("Du må nu dele " + cards[cardnumber][1] + " slurke ud");
        }
        else if ((cards[cardnumber][0] === "K" || cards[cardnumber][0] === "S") && (cards[cardnumber][1] > 1 && cards[cardnumber][1] < 6)) {
          msg.reply("Du skal nu tage " + cards[cardnumber][1] + " slurke");
        }
        else if (cards[cardnumber][1] === 7) {
          msg.reply("Mærkeleg");
        }
        else if (cards[cardnumber][1] === 9) {
          msg.reply("Regelkort");
        }
        else if (cards[cardnumber][1] === 10) {
          msg.reply("Vandfald!");
        }
        else if (cards[cardnumber][1] === 11) {
          msg.reply("Herreskål!");
        }
        else if (cards[cardnumber][1] === 12) {
          msg.reply("Dameskål!");
        }
        cards.splice(cardnumber,1);

        waitingForPile = true;
        msg.reply("Smid kortet op på bunken (!bunke)");
        isBunke = true;

      }


    } else {
      msg.reply('Det ikke din tur endnu, 3 tåre');
    }

  }

  if (msg.content === '!bunke') {

    if (msg.member.user.tag === users[users.length-1]) {
      if (isBunke) {
        if (Math.floor(Math.random() * (cards.length)) < 3) {
          msg.reply("Du har væltet bunken, tag et shot");
        } else {
          msg.reply("Neeeej, du kan finde ud af at lægge et kort på bunken, dyyygtig");
        }
        var tempUser = users.pop();
        users.unshift(tempUser);
        msg.reply("Det er nu " + users[users.length-1] + ' tur');
        isBunke = false;
      } else {
        msg.reply("Du skal først trække et kort makker, 1 tår");
      }
    } else {
      msg.reply("Det ikke din tur, og nu har du også væltet bunken, 1 shot");
    }

  }

  if (msg.content === '!pis') {

    var index = curPis.indexOf(msg.member.user.tag);
    if (index > -1) {
      msg.reply("smut på lokum med dig, so");
      curPis.splice(index,1);
      var index = users.indexOf(msg.member.user.tag);
      if (index > -1) {
        users.splice(index,1);
      }
    } else {
      msg.reply("Du har ikke et piskort, tag 2 tåre");
    }
  }

  if (msg.content.startsWith("!snipe ")) {

    var index = curSnipers.indexOf(msg.member.user.tag);
    if (index > -1) {
      const snipedUser = msg.content.slice(7);
      if(users.contains(snipedUser)){
        msg.reply(`Du sniper nu ${snipedUser}. ${snipedUser} kan stoppe det ved at skrive !pegpå efterfulgt af ${msg.member.user.tag}`);
        curSniperGames.push({
          sniper = msg.member.user.tag,
          sniped = snipedUser,
          slurks = 0,
        });
        if(!sniperGameRunning) runSniperGame();
      }else{
        msg.reply("Ja de er så ikke med i spillet vel makker, tag lige en tår og prøv igen");
      }
      curSnipers.splice(index,1);
    } else {
      msg.reply("Du har ikke et sniperkort, tag 2 tåre");
    }
  }
  if (msg.content.startswith("!pegpå ")) {
    let beingSniped = false;
    for(const sniperGame of curSniperGames) if(sniperGame.sniped === msg.member.user.tag) beingSniped = true;
  }
  runSniperGame = () => {
    sniperGameRunning = true;
    if(curSniperGames.length === 0){
      sniperGameRunning = false;
      return;
    }
    for(let g = 0; g < curSniperGames.length; g++){
      sniperGame.slurks++;
      if(sniperGame.slurks > 9){
        msg.reply(`Du er godt langsom ${sniperGame.sniped}, tag 10 tåre!`);
        curSniperGames.splice(g, 1);
        g -= 1;
      }else{
        msg.reply(tællings[sniperGame.slurks]);
      }
    }
    setTimeout(runSniperGame(), 1420);
  }
  if (msg.content === '!finger') {
    var index = curFingers.indexOf(msg.member.user.tag);
    if (index > -1) {
      msg.reply("Du har nu lagt en finger på bordet, i andre skal lægge en finger på bordet med !jegfinger");
      curFingers.splice(index,1);
      fingerGame = [...users];
      fingerGame.splice(fingerGame.indexOf(msg.member.user.tag),1);
      fingerGameRunning = true;
    } else {
      msg.reply("Du har ikke et fingerkort, tag 2 tåre");
    }
  }
  if (msg.content === '!konge') {

    var index = curKings.indexOf(msg.member.user.tag);
    if (index > -1) {
      if(Math.random() > 0.8) {
        msg.reply("Du har mistet dit kongekort, og dit ønsker gik ikke i opfyldelse");
        curKings.splice(index,1);
      } else {
        msg.reply("Din bøn vil ske");
      }


    } else {
      msg.reply("Du er ikke konge, skam dig og tag 2 tåre");
    }
  }

  if (msg.content === '!jegfinger') {
    if (fingerGameRunning) {
      var index = fingerGame.indexOf(msg.member.user.tag);
      if (index > -1) {
        msg.reply("Du har nu en finger på bordet");
        fingerGame.splice(index,1);
        if (fingerGame.length < 2) {
          msg.reply(fingerGame[0] + " har tabt, tag 5 slurke");
        }
      }
    } else {
      msg.reply("Hvorfor fuck har du en finger på bordet? Tag 2 slurke.");
    }

  }

  if (msg.content === '!pistilbage') {
    users.push(msg.member.user.tag);
    msg.reply("Du er nu tilbage i spillet");
  }

  if (msg.content === '!jegersvag') {
    var index = users.indexOf(msg.member.user.tag);
    if (index > -1) {
      users.splice(index,1);
      msg.reply("du har brækket dig i busken, lålålå, hold kæft hvor er du stiv");

    }
  }

});
