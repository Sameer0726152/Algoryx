import { useAccount } from 'wagmi'

export default function ActionButtons({ status, onSimulate, onExecute, onReset }) {
  const { isConnected } = useAccount()

  if (status === 'executing') {
    return (
      <div style={styles.row}>
        <div style={styles.spinner}>Finding best route and executing...</div>
      </div>
    )
  }

  if (status === 'done') {
    return (
      <div style={styles.row}>
        <div style={{ color: '#4ade80', fontSize: 14 }}>Swap complete (or simulated)</div>
        <button onClick={onReset} style={styles.secondaryBtn}>Start over</button>
      </div>
    )
  }

  return (
    <div style={styles.row}>
      <button onClick={onSimulate} style={styles.secondaryBtn}>
        Simulate (no wallet needed)
      </button>
      {isConnected ? (
        <button onClick={onExecute} style={styles.primaryBtn}>
          Execute Real Swap
        </button>
      ) : (
        <div style={{ fontSize: 12, color: '#666', alignSelf: 'center' }}>
          Connect wallet to execute a real swap
        </div>
      )}
    </div>
  )
}

const styles = {
  row: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '12px 24px', borderRadius: 10,
    background: '#7c3aed', color: '#fff',
    border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '12px 24px', borderRadius: 10,
    background: 'transparent', color: '#aaa',
    border: '1px solid #333', fontSize: 14, cursor: 'pointer',
  },
  spinner: { fontSize: 14, color: '#888' },
}