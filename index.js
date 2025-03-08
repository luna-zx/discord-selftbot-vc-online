const { Client } = require("discord.js-selfbot-v13")
const { joinVoiceChannel } = require("@discordjs/voice")
const colors = require("colors/safe")

const config = require("./config.json")

const client = new Client()

client.on("ready", async () => {
    console.clear()
    console.log(colors.rainbow(`ONLINE : ${client.user.username}`))
    await joinVC()
})

if (config.VOICE_CHANNEL_ID) {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        if (newState.member.id !== client.user.id) return

        const oldCh = oldState.channel
        const newCh = newState.channel

        if (oldCh !== newCh) await joinVC()
    })
}

const joinVC = async () => {
    const guild = client.guilds.cache.get(config.GUILD_ID)
    if (!guild)  return console.log(colors.red(`
        ${client.user.tag} FAILED TO CONNECT : 
            GUILD ERROR : GUILD ${config.GUILD_ID} NOT FOUND! 
    `))

    let vcChannel2join

    if (config.VOICE_CHANNEL_ID) {
        // INCASE YOU HAVE VOICE CHANNEL THAT YOU WANNA CONNECT

        const vcCh = guild.channels.cache.get(config.VOICE_CHANNEL_ID)
        if (!vcCh)  return console.log(colors.red(`
            ${client.user.tag} FAILED TO CONNECT : 
                GUILD : ${guild.name} 
                VOICE CHANNEL ERROR : VOICE CHANNEL ${config.VOICE_CHANNEL_ID} NOT FOUND!
        `))

        if (vcCh.type !== "GUILD_VOICE")  return console.log(colors.red(`
            ${client.user.tag} FAILED TO CONNECT : 
                GUILD : ${guild.name} 
                VOICE CHANNEL ERROR : CHANNEL ${config.VOICE_CHANNEL_ID} WAS NOT VOICE CHANNEL!
        `))

        // IF THAT VOICE CHANNEL WAS FULL
        if (!vcCh.userLimit || vcCh.members.size > vcCh.userLimit)  return console.log(colors.red(`
            ${client.user.tag} FAILED TO CONNECT : 
                GUILD : ${guild.name} 
                VOICE CHANNEL ERROR : VOICE CHANNEL WAS FULL!
        `))

        // IF YOU DON'T HAVE PERMISSION TO CONNECT THAT VOICE CHANNEL
        if (
            !vcCh.permissionsFor(client.user).has("CONNECT")
        ) return console.log(colors.red(`
            ${client.user.tag} FAILED TO CONNECT : 
                GUILD : ${guild.name} 
                VOICE CHANNEL ERROR : YOU DO NOT HAVE PERMISSION TO CONNECT VOICE CHANNEL!
        `))

        vcChannel2join = vcCh
    } else {
        // INCASE YOU WANNA RANDOM VOIE CHANNEL TO CONNECT

        const vcChs = guild.channels.cache.filter(ch =>
            // FILTERING VOICE CHANNELS FOR CONNECT
            ch.type === "GUILD_VOICE" // VOICE CHANNELS ONLY
            && (ch.members.size < ch.userLimit) // NOT FULL VOICE CHANNEL
            && ch.permissionsFor(client.user).has("CONNECT") // YOU HAVE PERMISSION TO CONNECT
        )
        if (!vcChs.size) return console.log(colors.red(`
            ${client.user.tag} FAILED TO CONNECT : 
                GUILD : ${guild.name} 
                VOICE CHANNEL ERROR : NO AVAILABLE VOICE CHANNELS TO CONNECT!
        `))

        // RANDOM VOICE CHANNEL TO CONNECT
        const randomCh = [...vcChs.values()][Math.floor(Math.random() * vcChs.size)]
        vcChannel2join = randomCh
    }

    // CONNECT TO VOICE CHANNEL
    joinVoiceChannel({
        guildId: config.GUILD_ID,
        channelId: vcChannel2join.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: config.DEAF,
        selfMute: config.MUTE
    })

    console.log(colors.cyan(`
        ${client.user.tag} CONNECTED TO :  
            GUILD : ${guild.name} 
            VOICE CHANNEL : ${vcChannel2join.name} (${vcChannel2join.id}) ! 
            DEAF : ${config.DEAF} 
            MUTE : ${config.MUTE}
    `))
}

client.login(config.TOKEN)