import { useState } from 'react'

const EXAMPLES = [
  'Convert 1 ETH to USDC',
  'Swap 0.5 ETH to DAI',
  'Exchange 100 USDC to ETH',
  'Convert 2 ETH to bitcoin',
  'Swap 50 DAI to USDT',
  'Get LINK with 1 ETH',
]

export default function SwapInput({ onSubmit, disabled }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text.trim())
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Type your swap intent, e.g. "Convert 1 ETH to USDC"'
          disabled={disabled}
          style={styles.input}
          autoFocus
        />
        <button type="submit" disabled={disabled || !text.trim()} style={styles.button}>
          Find Best Rate
        </button>
      </form>

      <div style={styles.examples}>
        {EXAMPLES.map(ex => (
          <button
            key={ex}
            onClick={() => setText(ex)}
            style={styles.chip}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { width: '100%' },
  form: { display: 'flex', gap: 10, width: '100%' },
  input: {
    flex: 1,
    padding: '14px 18px',
    borderRadius: 12,
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#f0f0f0',
    fontSize: 15,
    outline: 'none',
  },
  button: {
    padding: '14px 22px',
    borderRadius: 12,
    border: 'none',
    background: '#7c3aed',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  examples: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  chip: {
    padding: '6px 12px',
    borderRadius: 20,
    border: '1px solid #333',
    background: 'transparent',
    color: '#888',
    fontSize: 12,
    cursor: 'pointer',
  }
}