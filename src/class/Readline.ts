import { Interface } from "readline"
import { stdin, stdout } from "process"

export default class Readline extends Interface {
    constructor() {
        super({
            input: stdin,
            output: stdout
        })
    }

    async Ask(Question: string = "", Require: Boolean = false): Promise<string> {
        let Answer: string|null = null
        while(
            !Answer ||
            (Require && Answer?.trim?.().length === 0)
        ) Answer = await new Promise(resolve => this.question(Question, resolve))

        return Answer
    }
}