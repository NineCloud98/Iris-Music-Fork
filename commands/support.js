const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "support",
  description: "Obten el link del servidor de soporte",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const supportServerLink = "https://discord.gg/CryXaazREw";
        const embed = new EmbedBuilder()
            .setColor('#F1F120')
            .setAuthor({
              name: 'Servidor de soporte', 
              url: 'https://discord.gg/CryXaazREw'
          })
            .setDescription(`➡👀 **Entra al servidor macabro, aca bien void:**\n- Discord - ${supportServerLink}\n\n`)
            .setImage('https://preview.redd.it/g397xiqs65wc1.jpeg?width=600&format=pjpg&auto=webp&s=03f57a2985bd90180991c8e757a30c2781c33b10')
            .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};

