module.exports = {
	name: 'ping',
	description: 'Ping!.',
	example:"!ping",
	execute(message, args) {
		message.channel.send('Pong.');
	},
};