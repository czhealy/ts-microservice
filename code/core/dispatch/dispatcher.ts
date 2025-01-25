import {Command} from './commands'
import {Event} from './events'

export type IPublish = {
    publish(command: Event<unknown>): Promise<void>
}

export type ISend = {
    send(command: Command): Promise<void>
}

export abstract class Dispatcher implements IPublish, ISend {
    abstract send(command: Command): Promise<void>
    abstract publish(event: Event<unknown>): Promise<void>

    async dispatchAll(messages: (Command | Event<unknown>)[]): Promise<number> {
        const promises = messages.map((message) => {
            if (message instanceof Command) {
                return this.send(message)
            } else {
                return this.publish(message)
            }
        })
        const prms = await Promise.all(promises)
        return prms.length
    }
}
