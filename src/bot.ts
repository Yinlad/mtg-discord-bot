import { userInfo } from "os";
const Discord = require('discord.io');
import winston = require('winston');
const auth = require('../auth.json');
const fs = require('fs');
import mtgcard = require('./classes/card');

const todayDate = new Date().toDateString().replace(/\s+/g, '-');
//Configure logger
const logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console(),
      new winston.transports.File({ filename: `logs/error/error-${todayDate}.log`, level: 'error',}),
      new winston.transports.File({ filename: `logs/combined/combined-${todayDate}.log` })
    ]
  });

//mtg json db
let mtg: any;

fs.readFile('AllCards.json', 'utf8', (err, data) => {
    if(err){
        logger.error(err.message);
        return;
    }
    
    mtg = JSON.parse(data);
    //freezing db to become read only
    Object.freeze(mtg);
});

//Initialise discord bot
const bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', (evt) => {
    logger.info(`Connected as ${bot.username} - ( ${bot.id} )`);
});

bot.on('message', (user, userID, channelID, message: string, evt)=>{
    //listen for messages starting with '!'
    if(message.substring(0, 1) == '!'){
        let args = message.substring(1).split(' ');
        const cmd = args[0];
        
        args = args.splice(1);

        switch(cmd){
            case 'card':
                const card: mtgcard.MtgCard = mtg[args.join(' ')];
                bot.sendMessage({
                    to: channelID,
                    message: card ? mtgcard.CardHelper.cardToString(card) : 'not found'
                });
            break;
        }
    }
});