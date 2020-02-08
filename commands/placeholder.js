const Discord = module.require('discord.js')

module.exports.run = async(bot, message, args) => {
	message.channel.send('This is a place holder command, please delete.')
}
module.exports.help = {
name: "placeholder",
description: "holds a place"
}