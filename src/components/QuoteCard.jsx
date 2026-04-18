export default function QuoteCard({ quotes, parsed }) {
  if (!quotes) return null

  const { best, all } = quotes

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.label}>Swapping</span>
        <span style={styles.route}>
          {parsed.amount} {parsed.fromToken} → {parsed.toToken}
        </span>
      </div>

      <div style={styles.winner}>
        <div style={styles.winnerBadge}>Best Rate</div>
        <div style={styles.winnerSource}>{best.source}</div>
        <div style={styles.winnerAmount}>
          {best.toAmountHuman} <span style={{ color: '#aaa', fontSize: 16 }}>{parsed.toToken}</span>
        </div>
        <div style={styles.winnerGas}>
          Est. gas: {Number(best.gas || 0).toLocaleString()} units
        </div>
      </div>

      <div style={styles.allQuotes}>
        <div style={styles.allLabel}>All quotes</div>
        {all.map((q, i) => (
          <div key={q.source} style={{
            ...styles.quoteRow,
            opacity: i === 0 ? 1 : 0.6,
          }}>
            <span style={styles.quoteSrc}>{q.source}</span>
            <span style={styles.quoteAmt}>{q.toAmountHuman} {parsed.toToken}</span>
            {i === 0 && <span style={styles.bestTag}>winner</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  header: { marginBottom: 20 },
  label: { fontSize: 12, color: '#666', display: 'block', marginBottom: 4 },
  route: { fontSize: 18, fontWeight: 600 },
  winner: {
    background: '#0f0f1a',
    border: '1px solid #4c1d95',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  winnerBadge: {
    position: 'absolute', top: -12, left: 16,
    background: '#7c3aed', color: '#fff',
    fontSize: 11, fontWeight: 600,
    padding: '3px 10px', borderRadius: 20,
  },
  winnerSource: { fontSize: 12, color: '#888', marginBottom: 4 },
  winnerAmount: { fontSize: 32, fontWeight: 700, marginBottom: 6 },
  winnerGas: { fontSize: 12, color: '#666' },
  allQuotes: {},
  allLabel: { fontSize: 12, color: '#555', marginBottom: 10 },
  quoteRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 0', borderBottom: '1px solid #222',
  },
  quoteSrc: { fontSize: 13, color: '#aaa', width: 100 },
  quoteAmt: { fontSize: 14, fontWeight: 500, flex: 1 },
  bestTag: {
    fontSize: 11, color: '#7c3aed',
    border: '1px solid #4c1d95',
    padding: '2px 8px', borderRadius: 10,
  }
}