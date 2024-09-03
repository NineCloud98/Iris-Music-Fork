const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

module.exports = {
  name: "help",
  description: "Obten la informacion acerca del bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
      const botName = client.user.username; 

      const helpDescription = `
\`\`\`css
Welcome to ${botName}!

Your ultimate music companion on Discord. Here are the available commands:

[ /play    ] - Reproduce una cancion.
[ /pause   ] - Pausa una cancion.
[ /resume  ] - Resume la cancion actual.
[ /lyrics  ] - Despliega las letras de la cancion.
[ /skip    ] - Salta la cancion actual.
[ /stop    ] - Elimina la cola actual y apaga el reproductor.
[ /np      ] - Muestra el estado de la cancion actual.
[ /volume  ] - Fija el volumen del reproductor.
[ /ping    ] - Verifica la latencia del bot.
[ /support ] - Muestra el servidor de soporte (incompleto).
[ /help    ] - Despliega el menu de ayuda.
\`\`\`
      `;

      const embed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${botName} Help`)
        .setThumbnail(client.user.displayAvatarURL()) 
        .setDescription(helpDescription)
        .setFooter({ text: `Iris Music v1.2`, iconURL: client.user.displayAvatarURL() }) 
      

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};


