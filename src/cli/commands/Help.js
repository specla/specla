import Command from '../Command'

export default class Help extends Command {
  /**
   * Set the command signature
   * @type {String}
   */
  static signature = 'help'

  /**
   * Command descriptions
   * @type {String}
   */
  static description = 'List available commands'

  /**
   * Create a new instance of the help command
   * @param  {Object} commands is a object with all loaded commands
   * @return {Help}
   */
  constructor (commands) {
    super()
    this.commands = commands
    console.log(this.help())
  }

  /**
   * Create a sorted command list
   * @return {String}
   */
  commandList () {
    const commands = Object.values(this.commands)
    const padding = commands.reduce((max, { signature }) => {
      if (signature.length > max) {
        return signature.length + (signature.includes(':') ? 2 : 0)
      }

      return max
    }, 0)

    const sortCommands = (a, b) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    }

    const buildCommandString = command => {
      return '  ' + command.signature.padEnd(padding + 4) + command.description
    }

    return commands.sort(sortCommands).map(buildCommandString).join('\n')
  }

  /**
   * Generate the help text
   * @return {String}
   */
  help () {
    return `Usage
  specla <command>

commands:
${this.commandList()}
`
  }
}
