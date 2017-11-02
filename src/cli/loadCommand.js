import fs from 'fs'
import path from 'path'
import autoloader from '@specla/autoloader'
import Create from './commands/Create'
import CreateCommand from './commands/CreateCommand'
import Help from './commands/Help'
import Version from './commands/Version'

/**
 * Load Specla, library and application commands
 * @return {Object}
 */
export default function loadCommands (config) {
  let importedCommands = { Create, CreateCommand, Help, Version }

  if (
    config.get('specla.command.path') &&
    fs.existsSync(
      path.resolve(process.cwd(), config.get('specla.command.path'))
    )
  ) {
    const customCommands = autoloader(
      path.resolve(process.cwd(), config.get('specla.command.path'))
    )

    importedCommands = Object.assign({}, customCommands, importedCommands)
  }

  const commands = {}

  for (const command of Object.values(importedCommands)) {
    if (command.signature) {
      commands[command.signature] = command
      continue
    }

    commands[command.prototype.constructor.name.toLowerCase()] = command
  }

  return commands
}
