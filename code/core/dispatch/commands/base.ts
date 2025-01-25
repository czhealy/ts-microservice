export type CommandAction = 'upsert' | 'delete'
export abstract class BaseCommand {
    readonly name: string
    readonly action: string
    constructor(commandName: string, action: string) {
        this.name = commandName
        this.action = action
    }

    get fullName(): string {
        return `command.${this.name}.${this.action}`
    }
    stringify(): string {
        return JSON.stringify(this)
    }
}
