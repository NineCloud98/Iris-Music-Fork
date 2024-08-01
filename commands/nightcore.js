const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function nightcore(client, interaction) {
    try {
        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Voice Channel Required')
                .setDescription('❌ You need to be in a voice channel to use this command.');

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const player = client.riffy.players.get(interaction.guildId);

        if (!player || !player.queue.current) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('No song is currently playing')
                .setDescription('❌ There is no song currently playing.');

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        await player.setFilters({
            timescale: { 
                speed: 1.2, 
                pitch: 1.2, 
                rate: 1.0 
            }
        });

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('Nightcore Mode Activated')
            .setDescription('✅ Nightcore mode has been activated.');

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error processing nightcore command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ An error occurred while processing your request.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "nightcore",
    description: "Activate Nightcore mode",
    options: [],
    run: nightcore
};

