import { GClient } from "./class/Client";
import Interface from "./class/Readline";

;(async () => {
    const Token = await new Interface().Ask("Token: ", true)
    const Client = new GClient(Token)

    console.log("Removing all saved gifs..")
    const Action = await Client.Remove()

    console.log(
        Action
            ? "Successfully removed all saved gifs"
            : "Failed to remove gifs, endpoint might've changed"
    )
})()