import type { AxiosResponse } from "axios"
import type { List, ProtoResponse } from "../type/Gif"
import { ProtoTypes } from "../type/Gif"
import { FrecencyUserSettings } from "discord-protos"
import axiosd, { Axios } from "axios"

const Uri = (proto_type: keyof typeof ProtoTypes) =>
    "https://discord.com/api/v9/users/@me/settings-proto/".concat(String(ProtoTypes[proto_type]))

export class GClient {
    req: Axios

    constructor(token: string) {
        this.req = new Axios({
            headers: {
                "Authorization": token,
                "accept": "*/*",
                "Content-Type": "application/json",
                "x-discord-locale": "en-US",
                "accept-language": "en-US;q=0.9",
                "Referer": "https://discord.com/channels/@me",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9034 Chrome/108.0.5359.215 Electron/22.3.26 Safari/537.36",
                "x-discord-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDM0Iiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDUiLCJvc19hcmNoIjoieDY0IiwiYXBwX2FyY2giOiJpYTMyIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV09XNjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIGRpc2NvcmQvMS4wLjkwMzQgQ2hyb21lLzEwOC4wLjUzNTkuMjE1IEVsZWN0cm9uLzIyLjMuMjYgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6IjIyLjMuMjYiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoyNzEyMTYsIm5hdGl2ZV9idWlsZF9udW1iZXIiOjQ0MTQyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ=="
            },
            transformResponse: axiosd.defaults.transformResponse,
            transformRequest: axiosd.defaults.transformRequest
        })
    }

    private Handle(res: AxiosResponse<ProtoResponse>) {
        if (res.status >= 400) {
            const { code, message } = res.data
            let Message = (code && message) ? `${code}: ${message}` : JSON.stringify(res.data)
            switch (res.status) {
                case 401: Message = "Invalid token"; break
            }
            throw new Error(Message)
        }
    }

    async Remove(): Promise<boolean> {
        const Empty: List = {}

        const Decoded: FrecencyUserSettings = {
            favoriteGifs: {
                hideTooltip: false,
                gifs: Empty
            }
        }

        const Encoded: string = FrecencyUserSettings.toBase64(Decoded)

        const Response = await this.req.patch(Uri("FRECENCY_AND_FAVORITES_SETTINGS"), { settings: Encoded })
        this.Handle(Response)

        return Response.status < 400
    }
}