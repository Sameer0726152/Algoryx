// No API key needed - CoinGecko free tier requires no auth
const BASE_URL = 'https://api.coingecko.com/api/v3'

const COINGECKO_IDS = {
  ETH:  'ethereum',
  USDC: 'usd-coin',
  USDT: 'tether',
  DAI:  'dai',
  WBTC: 'wrapped-bitcoin',
}

export async function getTokenPriceUSD(tokenSymbol) {
  const id = COINGECKO_IDS[tokenSymbol]
  if (!id) return null

  const url = `${BASE_URL}/simple/price?ids=${id}&vs_currencies=usd`
  const response = await fetch(url)
  const data = await response.json()

  return data[id]?.usd || null
}