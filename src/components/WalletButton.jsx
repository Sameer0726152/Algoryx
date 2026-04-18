import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13, color: '#aaa' }}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          style={styles.btn}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      style={{ ...styles.btn, background: '#7c3aed', color: '#fff', borderColor: '#7c3aed' }}
    >
      Connect Wallet
    </button>
  )
}

const styles = {
  btn: {
    padding: '8px 16px',
    borderRadius: 8,
    border: '1px solid #333',
    background: 'transparent',
    color: '#f0f0f0',
    fontSize: 13,
    cursor: 'pointer',
  }
}