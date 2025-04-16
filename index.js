const { Client, GatewayIntentBits, Partials, Events, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
          GatewayIntentBits.MessageContent,
              GatewayIntentBits.DirectMessages
                ],
                  partials: [Partials.Channel]
                  

                  const token = 'MTMTMM0NTAzNzg3NjM1MzU2NDY3Mg.G55veB.K2Oypyiv9XdJBfKRKT51gvjoGKFFC-EGlH0EUcEUc';
                  const clientId = '1345037876353564672';
                  const guildId = '1343218294294843402'; // تقدر تحذفه لو بتسجل الكوماند عالمياً
                  const userLinks = new Map();

                  // تسجيل أمر السلاش
                  const commands = [
                    new SlashCommandBuilder()
                        .setName('send')
                            .setDescription('أرسل رسالة Embed لعضو عبر الخاص')
                                .addUserOption(option =>
                                      option.setName('user').setDescription('الشخص المستهدف').setRequired(true))
                                          .addStringOption(option =>
                                                option.setName('message').setDescription('محتوى الرسالة').setRequired(true))
                                                    .toJSON()
                                                    ];

                                                    const rest = new REST({ version: '10' }).setToken(token);

                                                    (async () => {
                                                      try {
                                                          console.log('جاري تسجيل أوامر السلاش...');
                                                              await rest.put(
                                                                    Routes.applicationGuildCommands(clientId, guildId), // استخدم Routes.applicationCommands(clientId) لو تبيها عامة
                                                                          { body: commands }
                                                                              );
                                                                                  console.log('تم تسجيل الأوامر!');
                                                                                    } catch (error) {
                                                                                        console.error(error);
                                                                                          }
                                                                                          })();

                                                                                          client.once(Events.ClientReady, () => {
                                                                                            console.log(`البوت جاهز: ${client.user.tag}`);
                                                                                            });

                                                                                            // تنفيذ الأمر
                                                                                            client.on(Events.InteractionCreate, async interaction => {
                                                                                              if (!interaction.isChatInputCommand()) return;

                                                                                                if (interaction.commandName === 'send') {
                                                                                                    const targetUser = interaction.options.getUser('user');
                                                                                                        const msgContent = interaction.options.getString('message');

                                                                                                            const embed = new EmbedBuilder()
                                                                                                                  .setTitle('رسالة من مشرف')
                                                                                                                        .setDescription(msgContent)
                                                                                                                              .setColor(0x3498db);

                                                                                                                                  try {
                                                                                                                                        await targetUser.send({ embeds: [embed] });
                                                                                                                                              userLinks.set(targetUser.id, interaction.user.id);
                                                                                                                                                    await interaction.reply({ content: `تم إرسال الرسالة إلى ${targetUser.tag}.`, ephemeral: true });
                                                                                                                                                        } catch (err) {
                                                                                                                                                              console.error(err);
                                                                                                                                                                    await interaction.reply({ content: 'ما قدرت أرسل له. يمكن الخاص مقفل.', ephemeral: true });
                                                                                                                                                                        }
                                                                                                                                                                          }
                                                                                                                                                                          });

                                                                                                                                                                          // الاستماع للردود في الخاص
                                                                                                                                                                          client.on(Events.MessageCreate, async message => {
                                                                                                                                                                            if (!message.guild && !message.author.bot) {
                                                                                                                                                                                const adminId = userLinks.get(message.author.id);
                                                                                                                                                                                    if (adminId) {
                                                                                                                                                                                          const admin = await client.users.fetch(adminId);
                                                                                                                                                                                                const embed = new EmbedBuilder()
                                                                                                                                                                                                        .setTitle(`رد من ${message.author.tag}`)
                                                                                                                                                                                                                .setDescription(message.content)
                                                                                                                                                                                                                        .setColor(0x2ecc71);

                                                                                                                                                                                                                              await admin.send({ embeds: [embed] });
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                    client.login(token);