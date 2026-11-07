export const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'] as const

export type Rule = { dir: string; color: string }

export type Parsed = { rules: Rule[]; bad: string[] }

function trimSlash(p: string): string {
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p
}

/**
 * Parses "~/code/a=red, /srv/b=cyan" into rules. Entries may be separated by
 * commas or newlines. `~` expands to `home`. Bad entries are returned in `bad`.
 */
export function parseRules(text: string, home: string | undefined): Parsed {
  const rules: Rule[] = []
  const bad: string[] = []
  for (const raw of text.split(/[,\n]/)) {
    const entry = raw.trim()
    if (entry === '') continue
    const eq = entry.lastIndexOf('=')
    if (eq <= 0) { bad.push(entry); continue }
    let dir = entry.slice(0, eq).trim()
    const color = entry.slice(eq + 1).trim().toLowerCase()
    if (!(COLORS as readonly string[]).includes(color)) { bad.push(entry); continue }
    if (dir === '~' || dir.startsWith('~/')) {
      if (home === undefined) { bad.push(entry); continue }
      dir = home + dir.slice(1)
    }
    rules.push({ dir: trimSlash(dir), color })
  }
  return { rules, bad }
}

/** The color for `cwd`: the rule with the longest matching folder. */
export function colorFor(cwd: string, rules: Rule[]): string | undefined {
  let best: Rule | undefined
  for (const r of rules) {
    if (cwd === r.dir || cwd.startsWith(r.dir + '/')) {
      if (best === undefined || r.dir.length > best.dir.length) best = r
    }
  }
  return best?.color
}
