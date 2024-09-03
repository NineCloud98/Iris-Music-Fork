const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function volume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        const volume = interaction.options.getInteger('level');

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ No hay una cola de reproduccion activa.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        if (volume < 0 || volume > 100) {
            return interaction.reply({ content: 'Volumen de 0 a 100.', ephemeral: true });
        }

        player.setVolume(volume);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription(`🔊 El volumen ha sido fijado a: **${volume}%**`);

        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error al editar el volumen:', error);
        await interaction.reply({ content: 'Ha ocurrido un error al editar el volumen.', ephemeral: true });
    }
}

module.exports = {
    name: "volume",
    description: "Fija el volumen de una cancion",
    permissions: "0x0000000000000800",
    options: [{
        name: 'nivel',
        description: 'Nivel de volumen (0-100)',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: volume
};
