const Autoloader = require('specla-autoloader');

class CommandLoader {

  constructor(cli){
    this.cli = cli;
    let commands = new Autoloader(['../commands'])
      .setRootDir(__dirname)
      .namespaced()['..'];

    let customCommands = new Autoloader(['/api/commands'])
      .setRootDir(process.cwd())
      .namespaced();

    commands.commands.custom = customCommands.api.commands;

    for(let command in commands){
      this.registerCommand(commands[command]);
    }
  }

  registerCommand(command){
    if(command.name === undefined){
      return this.loadSubCommand(command);
    }

    this.cli.on(command.name, command.handle.bind(command));
  }

  loadSubCommand(commands){
    for(let command in commands){
      this.registerCommand(commands[command]);
    }
  }
}

module.exports = CommandLoader;
