import { useState } from 'react'
import { useWalletClient } from 'wagmi'
import { ethers } from 'ethers'
import { parseIntent, describeIntent } from '../agent/intentParser.js'
import { getBestRoute } from '../services/aggregator.js'
import { build1inchSwapTx } from '../services/oneinch.js'

export function useSwap() {
  const [status, setStatus]   = useState('idle')   // idle | parsing | fetching | ready | executing | done | error
  const [parsed, setParsed]   = useState(null)
  const [quotes, setQuotes]   = useState(null)
  const [txHash, setTxHash]   = useState(null)
  const [error, setError]     = useState(null)

  const { data: walletClient } = useWalletClient()

  async function handleInput(userText) {
    try {
      setError(null)
      setStatus('parsing')

      // Step 1: parse intent
      const parsedIntent = parseIntent(userText)
      setParsed(parsedIntent)

      setStatus('fetching')

      // Step 2: get all quotes
      const result = await getBestRoute(
        parsedIntent.fromToken,
        parsedIntent.toToken,
        parsedIntent.amount
      )
      setQuotes(result)
      setStatus('ready')

    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  // Simulate only — just confirms quote is valid, no blockchain call needed
async function simulateSwap() {
  if (!quotes || !parsed) return
  try {
    setStatus('executing')

    // Simulate a short delay like a real network call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setTxHash('SIMULATED_' + Date.now())
    setStatus('done')
  } catch (err) {
    setError(err.message)
    setStatus('error')
  }
}

  // Real execution — requires connected wallet
  async function executeSwap() {
    if (!quotes || !parsed || !walletClient) return
    try {
      setStatus('executing')

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const walletAddress = accounts[0]

      // Build the actual swap transaction via 1inch
      const swapData = await build1inchSwapTx(
        parsed.fromToken,
        parsed.toToken,
        parsed.amount,
        walletAddress
      )

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const tx = await signer.sendTransaction({
        to: swapData.tx.to,
        data: swapData.tx.data,
        value: BigInt(swapData.tx.value || '0'),
        gasLimit: BigInt(swapData.tx.gas),
      })

      const receipt = await tx.wait()
      setTxHash(receipt.hash)
      setStatus('done')

    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setParsed(null)
    setQuotes(null)
    setTxHash(null)
    setError(null)
  }

  return {
    status,
    parsed,
    quotes,
    txHash,
    error,
    handleInput,
    simulateSwap,
    executeSwap,
    reset,
  }
}