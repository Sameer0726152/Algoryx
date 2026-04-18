const TOKEN_MAP = {
  // ETH variations
  'eth': 'ETH', 'ethereum': 'ETH', 'ether': 'ETH',
  // USDC variations  
  'usdc': 'USDC', 'usd coin': 'USDC', 'usd-coin': 'USDC',
  // USDT variations
  'usdt': 'USDT', 'tether': 'USDT',
  // DAI variations
  'dai': 'DAI',
  // WBTC variations
  'wbtc': 'WBTC', 'bitcoin': 'WBTC', 'btc': 'WBTC', 'wrapped bitcoin': 'WBTC',
}

const SUPPORTED = Object.keys(TOKEN_MAP)

export function parseIntent(text) {
  const input = text.toLowerCase().trim()

  // Extract amount
  const amountMatch = input.match(/(\d+\.?\d*)/)
  const amount = amountMatch ? amountMatch[1] : '1'

  // Find all token mentions in order of appearance
  let foundTokens = []
  for (const word of SUPPORTED) {
    const idx = input.indexOf(word)
    if (idx !== -1) {
      foundTokens.push({ token: TOKEN_MAP[word], idx })
    }
  }

  // Sort by position in sentence
  foundTokens.sort((a, b) => a.idx - b.idx)

  // First token found = fromToken, last token found = toToken
  const fromToken = foundTokens[0]?.token || 'ETH'
  const toToken = foundTokens[foundTokens.length - 1]?.token || 'USDC'

  // Prevent same token swap
  const finalTo = fromToken === toToken
    ? (fromToken === 'ETH' ? 'USDC' : 'ETH')
    : toToken

  return { fromToken, toToken: finalTo, amount, raw: text }
}

export function describeIntent(parsed) {
  return `Swap ${parsed.amount} ${parsed.fromToken} → ${parsed.toToken}`
}