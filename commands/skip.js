const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function skip(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No hay una cola de reproduccion activa.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.stop();

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏭️ Siguiente cancion**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error al procesar el comando de skip:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Ha ocurrido un error al procesar tu comando, oh no!.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "skip",
    description: "Salta a la siguiente cancion",
    permissions: "0x0000000000000800",
    options: [],
    run: skip
};
