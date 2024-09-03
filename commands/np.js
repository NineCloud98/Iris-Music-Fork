const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require('../config.js');

function createProgressBar(current, total, length = 20) {
    const progress = Math.round((current / total) * length);
    const emptyProgress = length - progress;

    const progressText = '▓'.repeat(progress); // Filled part 
    const emptyProgressText = '░'.repeat(emptyProgress); // Empty part
    const time = new Date(current * 1000).toISOString().substr(11, 8);
    const endTime = new Date(total * 1000).toISOString().substr(11, 8);

    return `\`${time}\` ${progressText}${emptyProgressText} \`${endTime}\``;
}


async function nowPlaying(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No hay una cancion reproduciendose.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

       
        const progressBar = createProgressBar(player.position / 1000, player.current.info.length / 1000);

        const npEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setTitle('🎵 Ahora reproduciendo...')
            .setDescription(`[${player.current.info.title} - ${player.current.info.author}](${player.current.info.uri})\n\n${progressBar}`)
            .setThumbnail(player.current.info.thumbnail)

        await interaction.reply({ embeds: [npEmbed] });

    } catch (error) {
        console.error('Error al procesar el comando de now playing:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Ha ocurrido un error al usar el comando, oh no!.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "np",
    description: "Despliega el estado de la cancion que se esta reproduciendo",
    permissions: "0x0000000000000800",
    options: [],
    run: nowPlaying,
};
