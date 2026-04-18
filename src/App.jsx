import { useSwap } from './hooks/useSwap.js'
import WalletButton from './components/WalletButton.jsx'
import SwapInput from './components/SwapInput.jsx'
import QuoteCard from './components/QuoteCard.jsx'
import ActionButtons from './components/ActionButtons.jsx'

export default function App() {
  const {
    status,
    parsed,
    quotes,
    txHash,
    error,
    handleInput,
    simulateSwap,
    executeSwap,
    reset,
  } = useSwap()

  const isLoading = status === 'parsing' || status === 'fetching'
  const etherscanUrl = txHash ? 'https://etherscan.io/tx/' + txHash : '#'

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Token Swap Agent</h1>
            <p style={styles.subtitle}>Type what you want — we find the best rate</p>
          </div>
          <WalletButton />
        </div>

        <SwapInput onSubmit={handleInput} disabled={isLoading} />

        {status === 'parsing'  && <StatusMsg>Parsing your intent...</StatusMsg>}
        {status === 'fetching' && <StatusMsg>Fetching quotes from 1inch, 0x, and Paraswap...</StatusMsg>}

        {parsed && status !== 'idle' && (
          <div style={styles.parsedBox}>
            Understood: <strong>{parsed.amount} {parsed.fromToken} to {parsed.toToken}</strong>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <span>{error}</span>
            <button onClick={reset} style={styles.retryBtn}>Try again</button>
          </div>
        )}

        {quotes && (status === 'ready' || status === 'executing' || status === 'done') && (
          <QuoteCard quotes={quotes} parsed={parsed} />
        )}

        {(status === 'ready' || status === 'executing' || status === 'done') && (
          <ActionButtons
            status={status}
            onSimulate={simulateSwap}
            onExecute={executeSwap}
            onReset={reset}
          />
        )}

        {txHash && !txHash.startsWith('SIMULATED') && (
          <div style={styles.txBox}>
            <span>Tx submitted: </span>
            <a href={etherscanUrl} target="_blank" rel="noreferrer" style={styles.txLink}>
              View on Etherscan
            </a>
          </div>
        )}

        {txHash && txHash.startsWith('SIMULATED') && (
          <div style={styles.txBox}>
            Simulation successful — swap would go through with current liquidity.
          </div>
        )}

      </div>
    </div>
  )
}

function StatusMsg({ children }) {
  return <div style={{ fontSize: 13, color: '#888', padding: '8px 0' }}>{children}</div>
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '40px 16px',
  },
  card: {
    width: '100%',
    maxWidth: 640,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666' },
  parsedBox: {
    fontSize: 13,
    color: '#aaa',
    background: '#1a1a1a',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #2a2a2a',
  },
  errorBox: {
    fontSize: 13,
    color: '#f87171',
    background: '#1a0a0a',
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid #7f1d1d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  retryBtn: {
    fontSize: 12,
    padding: '4px 10px',
    border: '1px solid #7f1d1d',
    borderRadius: 6,
    background: 'transparent',
    color: '#f87171',
    cursor: 'pointer',
  },
  txBox: {
    fontSize: 13,
    color: '#aaa',
    background: '#0a1a0a',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #14532d',
  },
  txLink: {
    color: '#7c3aed',
    textDecoration: 'none',
  },
}