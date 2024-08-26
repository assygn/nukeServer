const { Client } = require('discordjs-selfv11');
const Enmap = require('enmap');
const fs = require('fs');

const client = new Client();
const { token, prefix } = require('./config.json');

client.commands = new Enmap();

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});
process.on('uncaughtRejection', () => {});
process.warn = () => {};

client.on("error", () => {});
client.on("warn", () => {});

function nullReturn() {
    return;
}

(async function() {
    console.clear();
    process.title = ' Carregando...';
    console.log(`
    ██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
    ██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
    ██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
    ██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
    ███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
    `.yellow);

    client.on('ready', async () => {
        console.clear();
        process.title = `Selfbot fast [${client.user.tag}] - axly revamp`;
        console.log(`
        ██╗  ██╗██╗   ██╗██╗     ██╗███████╗    ██╗   ██╗ ██╗
        ██║ ██╔╝╚██╗ ██╔╝██║     ██║██╔════╝    ██║   ██║███║
        █████╔╝  ╚████╔╝ ██║     ██║█████╗      ██║   ██║╚██║
        ██╔═██╗   ╚██╔╝  ██║     ██║██╔══╝      ╚██╗ ██╔╝ ██║
        ██║  ██╗   ██║   ███████╗██║███████╗     ╚████╔╝  ██║
        ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝      ╚═══╝   ╚═╝
                                                             
  `.italic.yellow);
        console.log(`
        # |    DIE        Destroi o Servidor
        # |  BANALL       Bane Todos os membros
        # |    CHN        Crie vários Canais
        # | EVERYONE      Spam everyone
        # |   PURGE       Banir membros Inativos
        # |  FASTBAN      Ban Mais rápido
       
  Conectado em: ${client.user.tag}          
        `.italic.yellow);
    });

    fs.readdir("./cmds/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./cmds/${file}`);
            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });

    client.on('message', async (msg) => {
        if (msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);

        if (msg.author.id !== client.user.id) return;
        cmd ? cmd.run(client, msg, args) : nullReturn();
    });

    client.login(token).catch(() => {
        console.log(` 
         ██████████                                       
        ░░███░░░░░█                                       
         ░███  █ ░  ████████  ████████   ██████  ████████ 
         ░██████   ░░███░░███░░███░░███ ███░░███░░███░░███
         ░███░░█    ░███ ░░░  ░███ ░░░ ░███ ░███ ░███ ░░░ 
         ░███ ░   █ ░███      ░███     ░███ ░███ ░███     
         ██████████ █████     █████    ░░██████  █████    
        ░░░░░░░░░░ ░░░░░     ░░░░░      ░░░░░░  ░░░░░     
                                                          
               Verifique sua token no config.json                                     
        `.yellow.bold.italic);
    });
})();
