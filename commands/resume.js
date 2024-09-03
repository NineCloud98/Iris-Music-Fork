const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function resume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No hay una cola de canciones activa.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.pause(false);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**▶️ Reproductor resumido**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error al procesar el comando de resume:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Ha ocurrido un errror al procesar tu comando, oh no!.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "resume",
    description: "Resume la cola de reproduccion actual",
    permissions: "0x0000000000000800",
    options: [],
    run: resume
};
