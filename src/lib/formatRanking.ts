/**
 * Formats ranking for card badges.
 * Numeric → "#45"
 * Long descriptive text → as-is (no "# … Rank" wrapper)
 */
export function formatRankingLabel(ranking: unknown): string | null {
  if (ranking == null) return null

  let text = ''
  if (typeof ranking === 'object' && ranking !== null) {
    const r = ranking as { country_ranking?: string; world_ranking?: string }
    text = String(r.country_ranking || r.world_ranking || '').trim()
  } else {
    text = String(ranking).trim()
  }

  if (!text || text === 'N/A' || text === 'n/a') return null

  // Strip accidental "Rank" suffix / leading #
  text = text.replace(/^#\s*/, '').replace(/\s*Rank$/i, '').trim()
  if (!text) return null

  const isNumeric = /^\d+$/.test(text)
  return isNumeric ? `#${text}` : text
}
