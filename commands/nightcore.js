const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function nightcore(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player || !player.queue.current) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No active player or no song currently playing.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        await player.setFilter({
            timescale: { 
                speed: 1.2, 
                pitch: 1.2, 
                rate: 1.0 
            }
        });

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('✅ **Nightcore mode activated!**');

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
    permissions: "0x0000000000000800",
    options: [],
    run: nightcore
};


