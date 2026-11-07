# project-color

A Claude Code plugin that sets the session color from the folder you start in.
If you keep several projects open at once, each one gets its own color every
time, without typing `/color` by hand.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install project-color --marketplace jvfranklin/claude-project-color
```

Answer `y` to add the marketplace, then pick a scope (user scope is the usual
choice, so it works in every project).

From a shell:

```
claude plugin install project-color --marketplace jvfranklin/claude-project-color
```

In the desktop app: click + next to the prompt box, then Plugins, Add
marketplace with `jvfranklin/claude-project-color`, then Add plugin.

## Set your colors

The install asks for one setting, **Folder colors**. You can change it later in
`/config`. It is a comma-separated list of `folder=color` pairs:

```
~/code/my-app=red, ~/code/website=cyan, ~/work=green
```

- Colors: red, blue, green, yellow, purple, orange, pink, cyan.
- `~` means your home folder.
- A folder's subfolders get its color too. When two folders match, the longer
  (more specific) one wins.
- Folders not on the list are left alone.

The color is applied when a session starts. A change to the list takes effect
in the next session.

## License

MIT
