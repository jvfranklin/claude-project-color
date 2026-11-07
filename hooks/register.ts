import type { Register } from 'claude-code'
import { colorFor, parseRules } from './colors.ts'

export const register: Register = (on, options) => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    const text = typeof options.colors === 'string' ? options.colors : ''
    if (text.trim() === '') return result
    const { rules, bad } = parseRules(text, await $.env.get('HOME'))
    if (bad.length > 0) {
      $.ui.toast(`project-color: skipped ${bad.join('; ')} (use folder=color)`)
    }
    const color = colorFor(result.cwd, rules)
    if (color !== undefined) {
      // A command can't run while startup waits on this hook, so hand it to
      // a timer; the engine queues it until the session is idle.
      $.clock.after(0, () => {
        void $.command.run({ command: 'color', args: color })
      })
    }
    return result
  })
}
