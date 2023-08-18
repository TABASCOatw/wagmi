import type { Chain } from '../chains'
import type { ChainProviderFn } from '../types'

export type ChainstackProviderConfig = {
  /** Your Chainstack API key from the [Chainstack Console](https://console.chainstack.com/). */
  apiKey: string
}

export function chainstackProvider<TChain extends Chain = Chain>({
  apiKey,
}: ChainstackProviderConfig): ChainProviderFn<TChain> {
  return function (chain) {
    const baseHttpUrl = chain.rpcUrls.chainstack?.http[0]
    const baseWsUrl = chain.rpcUrls.chainstack?.webSocket?.[0]
    if (!baseHttpUrl) return null
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: { http: [`${baseHttpUrl}/${apiKey}`] },
        },
      } as TChain,
      rpcUrls: {
        http: [`${baseHttpUrl}/${apiKey}`],
        webSocket: [`${baseWsUrl}/${apiKey}`],
      },
    }
  }
}
