import { expect, test } from 'claude-code/testing'
import { colorFor, parseRules } from './colors.ts'

test('parses pairs, expands ~, skips bad entries', async () => {
  const { rules, bad } = parseRules('~/code/app=red, /srv/site/=Cyan\n~/x=mauve, nope', '/home/u')
  expect(rules).toEqual([
    { dir: '/home/u/code/app', color: 'red' },
    { dir: '/srv/site', color: 'cyan' },
  ])
  expect(bad).toEqual(['~/x=mauve', 'nope'])
})

test('longest folder wins, and only whole folder names match', async () => {
  const { rules } = parseRules('/a=red, /a/b=cyan', undefined)
  expect(colorFor('/a', rules)).toBe('red')
  expect(colorFor('/a/b/c', rules)).toBe('cyan')
  expect(colorFor('/a/bc', rules)).toBe('red')
  expect(colorFor('/ab', rules)).toBe(undefined)
})
