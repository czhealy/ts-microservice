import { BaseCommand, CommandAction } from "./base"

export class DeactivateThingCommand extends BaseCommand {
    thingId: string
    constructor(thingId: string, action: CommandAction = 'delete') {
        super('DeactivateThingCommand', action)
        this.thingId = thingId
    }
    static read(command: Record<string, unknown>): DeactivateThingCommand {
        if (!command.thingId) {
            throw new Error('Missing thingId')
        }
        if (command.name !== 'DeactivateThingCommand') {
            throw new Error('Command is not a DeactivateThingCommand')
        }
        return new DeactivateThingCommand(command.thingId as string, command.action as CommandAction)
    }
}