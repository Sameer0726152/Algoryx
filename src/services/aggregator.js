import { get0xQuote } from './zerox.js'
import { getParaswapQuote } from './paraswap.js'

export async function getBestRoute(fromToken, toToken, amount) {
  const results = await Promise.allSettled([
    get0xQuote(fromToken, toToken, amount),
    getParaswapQuote(fromToken, toToken, amount),
  ])

  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)

  if (successful.length === 0) {
    throw new Error('Both DEX quotes failed. Check your 0x API key.')
  }

  const sorted = successful.sort((a, b) => {
    return Number(BigInt(b.toAmount) - BigInt(a.toAmount))
  })

  return {
    best: sorted[0],
    all: sorted,
  }
}