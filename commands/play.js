const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

const queueNames = [];
const requesters = new Map(); 

async function play(client, interaction) {
    try {
        const query = interaction.options.getString('name');

        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Canal de voz requerido')
                .setDescription('❌ Necesitas estar en un canal de voz, tonto.');

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const player = client.riffy.createConnection({
            guildId: interaction.guildId,
            voiceChannel: interaction.member.voice.channelId,
            textChannel: interaction.channelId,
            deaf: true
        });

        await interaction.deferReply();

        const resolve = await client.riffy.resolve({ query: query, requester: interaction.user.username });
        //console.log('Resolve response:', resolve);

        if (!resolve || typeof resolve !== 'object') {
            throw new TypeError('Resolve response is not an object');
        }

        const { loadType, tracks, playlistInfo } = resolve;

        if (!Array.isArray(tracks)) {
            console.error('Expected tracks to be an array:', tracks);
            throw new TypeError('Expected tracks to be an array');
        }

        if (loadType === 'PLAYLIST_LOADED') {
            for (const track of tracks) {
                track.info.requester = interaction.user.username; 
                player.queue.add(track);
                queueNames.push(`[${track.info.title} - ${track.info.author}](${track.info.uri})`);
                requesters.set(track.info.uri, interaction.user.username); 
            }

            if (!player.playing && !player.paused) player.play();

        } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
            const track = tracks.shift();
            track.info.requester = interaction.user.username; 

            player.queue.add(track);
            queueNames.push(`[${track.info.title} - ${track.info.author}](${track.info.uri})`);
            requesters.set(track.info.uri, interaction.user.username); 

            if (!player.playing && !player.paused) player.play();
        } else {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('Error')
                .setDescription('❌ No results found.');

            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        const embeds = [
            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'HAS AÑADIDO UNA CANCION...',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setDescription('**🦊 Tu cancion ha sido añadida a la cola.**\n**🎛️ Usa los botones para controlar la musica**')
                 .setFooter({ text: '🎶 Disfruta tu musica! / Ahorita no funciona el cambio de idioma en ingles o español, problemas tecnicos! unu PD: Ola soy homero chino'}),

            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'HAS AÑADIDO UNA CANCION...',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setDescription('**🦊 Tu cancion ha sido añadida a la cola.**\n**🎛️ Usa los botones para controlar la musica**')
                 .setFooter({ text: '🎶 Disfruta tu musica! / Ahorita no funciona el cambio de idioma en ingles o español, problemas tecnicos! unu PD: Ola soy homero chino'}),

            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'HAS AÑADIDO UNA CANCION...',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setDescription('**🦊 Tu cancion ha sido añadida a la cola.**\n**🎛️ Usa los botones para controlar la musica**')
                .setFooter({ text: '🎶 Disfruta tu musica! / Ahorita no funciona el cambio de idioma en ingles o español, problemas tecnicos! unu PD: Ola soy homero chino'})
        ];

        const randomIndex = Math.floor(Math.random() * embeds.length);
        await interaction.followUp({ embeds: [embeds[randomIndex]] });

    } catch (error) {
        console.error('Error processing play command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Un error durante la reproduccion ha ocurrido.');

        await interaction.editReply({ embeds: [errorEmbed] });
    }
}

module.exports = {
    name: "play",
    description: "Reproduce una cancion o playslist",
    permissions: "0x0000000000000800",
    options: [{
        name: 'name',
        description: 'Introduce una cancion / playlist',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: play,
    queueNames: queueNames,
    requesters: requesters 
};


