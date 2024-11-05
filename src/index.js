const { Client, GatewayIntentBits } = require("discord.js");

const { config } = require("dotenv");

const  kuromoji = require("kuromoji");

config();

const client = new Client({intents : [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessageReactions]});

client.login(process.env.token);

client.on("ready", ()=>{
    console.log(`Hi.${client.user.username} is ready.`)
})

client.on("messageReactionAdd", async (reaction, user)=>{
    if (reaction.emoji.name === "🏮"){
        result = await omatsurify(reaction.message.content)
        await reaction.message.channel.send(result)    
    }
})

async function omatsurify(text){
    return new Promise ((resolve, reject) => {
        kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" }).build(function (err, tokenizer) {
            const path = tokenizer.tokenize(text);
    
            var response_temp = ""
    
            for (var i = 0; i < path.length; i++){
                response_temp += `${path[i].surface_form} (${path[i].pos}) `
            }

            resolve(response_temp)
        });    
    })
}